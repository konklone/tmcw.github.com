---
layout: post
date: 2011-11-06 10:00:00 UTC
title: Writing Javascript for Size
hn: http://news.ycombinator.com/item?id=3081646
---

Non-programmer readers, might want to skip this one, it's pretty technical
and relatively obscure.

<div class='shutter-300'>
  <img src='http://farm5.static.flickr.com/4136/4757336489_1b748b7fe9_z.jpg' />
</div>

<span class='image-credit'>
<a href='http://www.flickr.com/photos/tmcw/4757336489/'>my dinosaur</a>,
back when I had my [Yashica](http://www.kenrockwell.com/yashica/electro-35.htm)<span>

Anyway, back to the thing at hand. A while ago I read
[Will it Optimize?](http://ridiculousfish.com/blog/posts/will-it-optimize.html)
by the excellent [ridiculous fish](http://ridiculousfish.com/blog/posts.html).
It's a fun adventure into what code [GCC](http://en.wikipedia.org/wiki/GNU_Compiler_Collection)
recognizes and optimizes, and what it doesn't, or can't.

This is a much simpler version of that, for Javascript, for size. I've been
maintaining [Wax](http://mapbox.com/wax), a mapping library that's meant to
be tiny, and slowly learning the tricks of the trade for writing tiny Javascript -
not [140bytes](http://140byt.es/)-type evil tricks, but practical optimizations.
Like how you get a library down to tiny sizes without making it a headache
to maintain or making errors in the non-minified source untraceable.

Most of this comes down to understanding the magic of [uglifyjs](https://github.com/mishoo/UglifyJS),
the most interesting Javascript project of recent times.

I'll cut to the chase, using `uglifyjs -b` for example minification.

## Visibility

This is a car that can turn left or right,
and has a more general function `turn`, that can turn any number
of degrees.

{% highlight js %}
function driver() {
    var d = {};
    d.direction = 0;
    d.turn = function(degrees) {
        d.direction += degrees;
    };
    d.right = function() { d.turn(90); };
    d.left = function() { d.turn(-90); };
    return d;
}
{% endhighlight %}

uglifyjs does its best: 147 chars, from 228: 64%

{% highlight js %}
function driver() {
    var a = {};
    return a.direction = 0, a.turn = function(b) {
        a.direction += b;
    }, a.right = function() {
        a.turn(90);
    }, a.left = function() {
        a.turn(-90);
    }, a;
}
{% endhighlight %}

But see how this is calling `a.turn()` internally? Often seeing
non-mangled names means that there's a tweak you can make. For instance,
if you eliminate public access to `d.turn`, by removing its assignment
to `d`:

{% highlight js %}
function driver() {
    var d = {};
    d.direction = 0;
    function turn(degrees) {
        d.direction += degrees;
    }
    d.right = function() { turn(90); };
    d.left = function() { turn(-90); };
    return d;
}
{% endhighlight %}

Becomes

{% highlight js %}
function driver() {
    function b(b) {
        a.direction += b;
    }
    var a = {};
    return a.direction = 0, a.right = function() {
        b(90);
    }, a.left = function() {
        b(-90);
    }, a;
}
{% endhighlight %}

`d.turn(degrees)` can now be mangled into just `b`,
so the compression becomes 131 chars from 220: 59% of
its original size, by optimizing internal calls. It's minor,
in this instance, but add a lot of repetitive code and this difference
can add up.

## Aliasing

I was always mystified by how impressive libraries like
[underscore.js](https://github.com/documentcloud/underscore/blob/master/underscore.js#L23)
and [reqwest](https://github.com/ded/reqwest/blob/master/src/reqwest.js#L13)
would shortcut access to variables. After all, isn't it just saving
minor bytes to refer to `doc_body` instead of `document.body`?

It eventually dawned on me: minifiers aren't always able to
alias object properties. For instance,

<table class='equitable'><tr><td>
{% highlight js %}
function logStyles() {
    var doc_style = document.body.style;
    console.log(doc_style.border,
        doc_style.margin,
        doc_style.padding);
}
{% endhighlight %}
</td><td>
{% highlight js %}
// after uglify -b, line-broken
function logStyles() {
    var a = document.body.style;
    console.log(a.border,
        a.margin,
        a.padding);
}
{% endhighlight %}
</td></tr></table>

However, if uglifyjs were to make the policy that it should alias all
property-accessed objects in Javascript, then it would immediately fall into
traps like:

<table class='equitable'><tr><td>
{% highlight js %}
// unminified
var mine = document.getElementById('mine');
var his = document.getElementById('his');
var hers = document.getElementById('hers');
{% endhighlight %}
</td><td>
{% highlight js %}
// theoretical naïve minification
var a = document.getElementById;
var mine = a('mine'),
    his = a('mine'),
    hers = a('mine');
{% endhighlight %}
</td></tr></table>

Which gives you a big, fat 'Illegal invocation', since `this` isn't the
`document` when `a` is run.

Now, to be clear, you could optimize to

{% highlight js %}
var a = function() {
    return document.getElementById.apply(document, arguments);
};
{% endhighlight %}

But that isn't fun at all, and strictly proxies `getElementById` - if the
function has properties of its own, as they are plenty allowed to do in
Javascript - then this optimization will kill them. So, it's unsafe and
big.

Moral of the story: minifiers don't optimize object properties because it
would be weird and hard for them to do it. When you use an object property
a lot, make a variable for it yourself, and you can give that variable
a descriptive name, like `aliasToDocumentPropertyX` - so you can have both
readability and good minification ratios.

## The Little Things

Don't care that much about ternary form versus `if` / `else`. Local variables
are reliably shortened, so don't use single-char names unless you have
very good reason, or they're `i`, `x` or `y`.

The old wisdom about [**always using var for local variables**](http://ds.io/oMR7sC)
is here too: if you forget, your variable name is in the global scope, so

<table class='equitable'><tr><td>
{% highlight js %}
// unminified
function forgetVar() {
    myLongVariableName = 2;
}

function dontForgetVar() {
    var myVeryVeryLongVariableName = 2;
}
{% endhighlight %}
</td><td>
{% highlight js %}
// after uglify -b
function forgetVar() {
    myLongVariableName = 2;
}

function dontForgetVar() {
    var a = 2;
}
{% endhighlight %}
</td></tr></table>

## And so on

Don't get caught up in minimization thinking it's the golden ticket: it's fun
and useful, but ideally your javascript is cached - sometimes in compiled form -
the first time it's loaded.

But, if you're writing code that aims to be invisible and uber-light for
bad connections or to be thrown along with every page, it's useful to grow
an understanding of what your minifier can and can't do.

I'm no minifier expert: if you've got any knowledge to share, please add it
to comments or link it up. Have fun!
