---
layout: post
date: 2012-06-04 10:00:00 UTC
title: The Module Pattern, A Little More Detail
hn:
categories:
- blog
---

This is an article on the _module pattern_ for Javascript, and some of
its neat properties when used for instances.
I've been using it recently for projects like
[mapbox.js](http://mapbox.com/mapbox.js/api/), and think
it's a neat way to structure code and avoid some of the less likable parts
of the language.

<div class='shutter-300'>
<img src='http://farm8.staticflickr.com/7078/7174033128_698c1abccb_z.jpg' />
</div>

For those already doing Javascript: here's why you should care.

1. You can mostly avoid the problem of tracking the meaning of Javascript's
  pesky [`this`](http://www.quirksmode.org/js/this.html) keyword, and the associated
  problem of [rebinding functions](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/bind)
  to another `this` value.
2. You can keep truly internal 'states' of your code private while
  exposing minimal APIs that you know will stay stable.
3. Often this yields code that's more friendly to Javascript compression,
  like I wrote about in [Writing Javascript For Size](http://macwright.org/2011/10/06/javascript.html)
4. You can avoid the sneaky problems of users forgetting the `new`
  keyword, and the [workarounds people use to dodge them](http://ejohn.org/blog/simple-class-instantiation/)

For those starting to learn Javascript.

1. Once you understand scopes, you understand this pattern.
2. Impress your friends.

## Let's Begin

To be clear, I adopted the style of the module pattern
used by [Mike Bostock](http://bost.ocks.org/), who presumably got it
from earlier figures, and so on. Usually the variable-containing
and scope-control bits of this pattern get the most attention -
this sheds some light on other benefits that touch _browser_
and _async_ code as well.

#### Javascript with Classical Objects

{% highlight js %}
function Car() {
    this.direction = 0;
}
Car.prototype.turn = function(angle) { this.direction += angle; };

var c = new Car();
{% endhighlight %}

In which you're using [Javascript's prototypes](http://yehudakatz.com/2011/08/12/understanding-prototypes-in-javascript/)
to create a Javascript class, and using `this` to refer
to 'this instantiated object'.

#### Javascript with Module Pattern

{% highlight js %}
function Car() {
    var car = {},
        direction = 0;

    car.turn = function(angle) { direction += angle; };

    return car;
}

var c = Car();
{% endhighlight %}

Here, you're creating a new Javascript object literal
every time that you call `Car()`. Notice that, unlike the `prototype`
method, there's no `new` operator.

## A Quick Summary

What are the essential bits?

{% highlight js %}
// a plain function. I prefer downcase because only true
// Javascript classes should be uppercase (like Date or Math)
// and this isn't a class, it's a factory
function thing() {
    // The first thing in the function is a bunch of scoped
    // variables. One of these scoped variables is always an empty
    // object to which you'll assign properties and methods
    // before it goes out the door as the value this function
    // returns.

    // This is that object. It could also be named 'thing'
    // but that would be shadowing the function 'thing'
    // and that's not a good thing to do.
    var t = {},
        // Now any variables that represent the state and data
        // of this object, thing. These are not attached to
        // the t object, they're attached to the scope it can
        // access - the scope of this thing() function.
        count = 0;

    // You can also create functions here that are scoped
    // and use them as callbacks, and they'll have access to
    // this t object's scoped variables.
    //
    // Functions that aren't attached to t are just like
    // the scoped variables above - they aren't accessible to
    // the API user. This is kind of like the private keyword
    // elsewhere
    function handler() {
        count++;
    }

    // Now you make the decision of the set of methods on t.
    // These have access to all of the scoped variables as well.
    t.talk = function(x) {
        alert(x);
    };

    // Finally, when you're done with t, return it.
    return t;

    // In terms of the idea of a 'closure', this is how you
    // 'close over' the scope of the object. Someone who calls
    // thing() gets a copy of t to play around with, but that
    // t will always refer to the scoped variables we just
    // defined.
}
{% endhighlight %}

## 1. No More This

The most common annoyance with `this` is in event handlers, because they
[turn this into the element that's the source of the event](http://www.sitepoint.com/javascript-this-event-handlers/).

So let's say that you're creating a simple counter, that attaches
to a [DOM](http://en.wikipedia.org/wiki/Document_Object_Model)
element being clicked. The classical version might look like

{% highlight js %}
function Counter() { this.count = 0; }

Counter.prototype.increment = function() { this.count++; };

Counter.prototype.countClicks = function(element) {
    element.onclick = this.increment;
};

var c = new Counter();

c.countClicks(document.getElementById('increment'));

document.getElementById('tell').onclick = function() {
    alert(c.count);
};
{% endhighlight %}

This looks valid, but isn't. Clicking on `increment` repeatedly and then on
'tell' will tell you that Counter's value is still 0. Why? Because
`Counter.prototype.increment` runs, but the value of `this` in that
context is the DOM element of the `increment` button, not counter.

A typical fix to this is to change the line to include `bind`, a function
that changes the value of `this` in a function for any time that it runs
in the future. Since this isn't IE-safe, it's more popular to use
[`_.bind`](http://underscorejs.org/#bind) from underscore.js or
[`jQuery.proxy()`](http://api.jquery.com/jQuery.proxy/) in the place
of the standard Javascript function.

{% highlight js %}
Counter.prototype.countClicks = function(element) {
    element.onclick = this.increment.bind(this);
};
{% endhighlight %}

This is fine, and more serious Javascript environments like
[Backbone](http://documentcloud.github.com/backbone/) provide
convenience methods like `bindAll` that let you rebind a whole
bunch of functions at one time, so you can totally forget about
the `this` problem. But it's still there, and when your code leaves
that land, it's a valid annoyance.

Here's the other way to do this functionality:

{% highlight js %}
function Counter() {
    var count = 0,
        c = {};

    function increment() { count++; }

    c.countClicks = function(element) {
        element.onclick = increment;
    };

    c.clicks = function() { return count; }

    return c;
}

var c = Counter();

c.countClicks(document.getElementById('increment'));

document.getElementById('tell').onclick = function() {
    alert(c.clicks());
};
{% endhighlight %}


## 2. Internal And External States

This is a mixed bag, but there are some good examples of why
it's awesome. Let's say you have a library that [manages a
set of markers on a map](https://github.com/mapbox/markers.js).

Of course, this will require the functionality of adding a marker
to the map. With a classical object, in most cases an uninformed
or adventurous user could see that `.markers` is exposed and just
`.markers.push(newmarker)` it into the object.

The literal pattern lets you be much more paranoid, with a setup like

{% highlight js %}
function mmg() {
    var m = {},
        markers = [];
    m.add_marker = function(x) {
        // do various things to x, adjust its style,
        // validate it,
        // add event handlers, and then...
        markers.push(x);
    }
    m.markers = function() {
        // And then give the user read-only access
        // to the internal markers array.
        return markers.splice();
    }
    return m;
}
{% endhighlight %}


## 3. Compression

On this note, mostly just read [Writing Javascript For Size](http://macwright.org/2011/10/06/javascript.html).
The public/private split allows compression to 'mangle' more names
that they know will not be accessible to the global scope.

For instance, the code

{% highlight js %}
function thing() {
    var t = {};
    function internalFunction() { console.log('foo'); }
    function internalFunctionTwo() { console.log('foo'); }
    t.do = function() {
        internalFunctionTwo();
        internalFunction();
    }
};
{% endhighlight %}

Allows a Javascript compressor like [UglifyJS](https://github.com/mishoo/UglifyJS)
to shorten the names of `internalFunction` and `internalFunctionTwo` to
single-letter names - there's no way that you'll be able to access them, so
the names can change. By contrast, after minifying the code:

{% highlight js %}
function thing() { }
thing.prototype.internalFunction() { console.log('foo'); };
thing.prototype.internalFunctionTwo() { console.log('foo'); };
thing.prototype.do = function() {
    internalFunctionTwo();
    internalFunction();
};
{% endhighlight %}

The long function names `internalFunction` and `internalFunctionTwo` will
remain in their entirety.

## Disadvantages

1. <strike>This method is slower for certain cases</strike>
2. The power to have private methods and variables can be abused
3. Extending objects is unclear
4. Object identities is unclear - `instanceof` doesn't work.
5. <strike>This may have higher memory usage, because creating new
   objects can create new copies of their members.</strike>

As far as **speed**. Creating object literals is faster than instantiating
objects with constructors in most browsers, as [this jsperf test from Mike Bostock](http://jsperf.com/prototype-vs-literal)
shows. <strike>But dispatching method calls on those objects is slower.</strike>

But unless you're doing some very serious, millions-of-iterations
computation, Javascript engine level optimizations probably aren't
the biggest worry. <strike>In V8, small, prototype-based objects tend to out-perform
literal objects created with the module pattern - good insights can
be found in [this bit of Lars Bak's talk on the subject](http://youtu.be/hWhMKalEicY?t=48s)</strike>
and the aha moment for objects versus arrays came from reading
[this bit of pre3d.js](https://github.com/deanm/pre3d/blob/master/pre3d.js#L32).

*Update:* [V8](http://code.google.com/p/v8/)'s
[hidden classes](https://developers.google.com/v8/design)
don't actually correspond to 'classes', and don't provide a performance
boost to prototype-oriented code.

As far as the **abusable power to do private members**. There can be
the feeling that you start off with an object like

{% highlight js %}
function beautifulworld() {
    var bw,
        a, b, c;
    bw.setthings = function(x) {
        a = x * 10;
        b = x * 20;
        c = x * 30;
    };
    return bw;
}
{% endhighlight %}

And end up exposing a, b, and c, after realizing that private things
couldn't be private. So, if nothing else, this method requires
an extra thought process to consider the level of encapsulation
needed.

### Extending Classes

I rarely encounter the problem of really **extending classes**.
Ben Cherry's linked article has one possibility, and you can also just use an object
that uses another object internally - like how [Wax's](http://mapbox.com/wax/)
[interaction lib](https://github.com/mapbox/wax/blob/master/control/lib/interaction.js) is
used in [specialized API-specific controls](https://github.com/mapbox/wax/blob/master/control/mm/interaction.js)
which 'customize' the object internally. This is the idea of using
[composition over inheritance](http://en.wikipedia.org/wiki/Composition_over_inheritance).

### instanceof

As far as the `instanceof` problem - with classical objects, when you
call `var x = new baseballbat()`, then `x instanceof baseballbat` returns
`true`, and `x instanceof foo` returns `false`. Every once in a blue
moon this is handy, but it often runs into the same problems as strongly-typed
languages, in which direct class-equivalence isn't all that importance
and it's more likely you want to ask whether the object has methods or
properties you need in your code, not its origin.

For instance, in a large-scale project like [Carto](http://mapbox.com/carto/),
which required object identities, a chain of inheritance meant that the
only sensible way to do identity was to add a `.is` member with a flag
telling what the value should be interpreted as. Except in the most extreme
cases, I don't see much `instanceof` use in the wild.

### Memory

As far as the last possible disadvantage, higher memory usage -
memory in Javascript has been a bit of an uncertain, given limited
developer tools and the variability between Javascript engines.

For objects that you'll want thousands of, it might be a better option
to either go with _literal objects_ - for instance, the data types
in [Modest Maps](http://modestmaps.com/) would probably become
simple arrays and their methods could easily become part of a singleton
object.

## See Also

* [JavaScript Module Pattern: In-Depth](http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth) by Ben Cherry
* [Towards Reusable Charts](http://bost.ocks.org/mike/chart/) by Mike Bostock
* [Vish Uma switched to the module pattern](http://viswaug.wordpress.com/2008/11/19/writing-better-javascript-part-5/) and
  [from it back to classical objects](http://viswaug.wordpress.com/2011/03/02/moving-away-from-the-javascript-module-pattern/). His
  writing reminded me of the possible memory issue, so that section was added.
* [Learning JavaScript Design Patterns](http://addyosmani.com/resources/essentialjsdesignpatterns/book/)
  by [Addy Osmani](http://addyosmani.com/blog/) covers this and many other patterns.

Have more ideas on this subject? Let me know over email or by tweeting at
`@tmcw`.
