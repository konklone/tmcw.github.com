---
layout: post
title: How Callbacks Work
categories:
- blog
- javascript
---

![](http://farm3.staticflickr.com/2838/9216508333_e4235b4682_b.jpg)

Callbacks let your code work with the outside world, where you don't know
if or when things will happen.

Here is some normal code.

{% highlight js %}
var myNumber = 0;
var yourNumber = 10;
myNumber += yourNumber;
yourNumber++;
{% endhighlight %}

When you write code usually, it goes step by step. Each step takes a little
time, but a fixed amount, like how much it takes to add a number or call a function.
And it doesn't make much sense to do the steps out of order, because a lot of
the time you're relying on the steps before.

### Sometimes your code talks to the outside world.

<iframe src='http://bl.ocks.org/tmcw/raw/5961916/0203bc7fee60dd83bff43d094a98f304834a0fa8/' width='100%' height=100></iframe>

I don't know if you'll click 'add a number' - you might click it now,
or you might have already done it. You could do it once, or a couple of times.

This is why callbacks exist: because sometimes code goes into the real world -
whether it's a person clicking a button or asking an API for some bit of information -
and it's out of our control how long that takes, or even whether it happens.

### So what is a callback?

A callback is a function like any other: what makes it 'a callback' is
how you use it. Instead of it being _your_ function through and through, it's
one that you hand over and you expect something else to call.

You define the function, but someone else calls it - a button click runs it,
or the response from another server.

<iframe src='http://bl.ocks.org/tmcw/raw/5962009' width='100%' height=300></iframe>

A lot of the time, people use anonymous functions for callbacks. That's mostly
because they know they won't be using their callback functions anywhere else.
You don't _need_ to use anonymous functions for callbacks - you can use regular
old named functions too.

### Out of Order

So we know how callbacks work and how normal code works. It might surprise you
how they mix together.

When you use a callback, it says 'this code can wait until something happens' -
that the code that handles clicks won't run until there's a click. But all
_around_ that code that can wait is normal code that runs immediately, as
soon as your computer sees it.

<iframe src='http://bl.ocks.org/tmcw/raw/5962074/3fdefaff4cb424535590aab153b1fe206d74bb64' width='100%' height=200></iframe>

Why doesn't this say 'Hi, Tom'? Well, the code that adds ', Tom' is _below_
the code that adds 'Hi', which usually means that it runs _after_.

But this is a big exception: callbacks can run out of order. Your computer
sees the code to write `hello.message`, but doesn't _run_ it until it gets the
message from a server, and that takes a little bit. In the meantime, the code
below that has already run.

<iframe src='http://bl.ocks.org/tmcw/raw/5962091' width='100%' height=200></iframe>

We fix that by making all of our code wait so it all runs in order.

### What Matters About Callbacks

The names you give to the arguments of callback functions don't matter.

For instance, a lot of times you'll see a callback that takes an event
argument as naming that `event`.

{% highlight js %}
$('#button').click(function(event) { /* the event is called event! */ });
$('#button').click(function(hotdogs) { /* the event is called hotdogs! */ });
{% endhighlight %}

But you can name it whatever you want, because on the other side, your computer
is just calling the function with an argument, just like how a function
like `add(a, b)` is called like `add(1, 2)` - you don't need to know or acknowledge
that on the other side 1 and 2 will be called `a` and `b`.

The name of the function also doesn't matter.

{% highlight js %}
$('#button').click(function() { });
$('#button').click(function hello() { });
{% endhighlight %}

On the other side, the function you give as a callback will be renamed and managed
by the click event, so any name it had before doesn't really matter.

### Go For It

Using callbacks might be frustrating at first, but they're a very important
part of programming in JavaScript - they're what keep web pages from pausing
every time that they need to do something that takes a little while.

### See Also

* [Streams](http://maxogden.com/node-streams.html) by Max Ogden
* [Callback Hell](http://callbackhell.com/) by Max Ogden
* [Understanding Callback Functions in Javascript](http://recurial.com/programming/understanding-callback-functions-in-javascript/)
