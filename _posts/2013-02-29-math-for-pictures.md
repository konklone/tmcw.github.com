---
layout: post
title: Math for Pictures
categories:
- blog
---

Recently I [talked about d3 at a jQuery meetup](http://macwright.org/presentations/dcjq/)
in DC. After the talk, a few people asked how to learn the necessary math
for this kind of visualization work, and I responded that I actually
knew just a tiny corner of math and try to make that work.

On further investigation, my corner is unbelievably tiny and so rudimentary that
calling it 'math' is exaggerating. But, here's what it is.

## Radians

Programming math uses radians for angles. Unlike
the [TI-83](http://www.prenhall.com/esm/app/graphing/ti83/Home_Screen/Menu_Keys/mode/mode.html),
there's no 'degrees mode' or 'radian mode', so we're stuck with them.

For code that bridges the gap and accepts degrees as input, you'll usually
see a chunk like

{% highlight js %}
// degrees to radians
// (90 * D2R) = 1.57; // Math.PI / 2
var D2R = Math.PI / 180;

// radians to degrees
// (1.57 * R2D) = 90;
var R2D = 180 / Math.PI;
{% endhighlight %}

The angles in a circle go from 0° to 360°. In the land of radians, that's
0 radians to 2π radians. So, halfway around is π and 90° is π/2.

## Sine, Cosine, and Unit Circles

Many visualizations come down to circles, circle fitting, or 'radial' layouts.
For instance, [this geometry daily redo](http://bl.ocks.org/tmcw/raw/4678085/),
as [well as this one](http://bl.ocks.org/tmcw/raw/4689139/), and
[this one](http://bl.ocks.org/tmcw/4949593), and [this one](http://bl.ocks.org/tmcw/4945177) -
all circle-based.

To just draw circles, SVG has a [circle element](http://www.w3.org/TR/SVG/shapes.html#CircleElement).
But it's more important to reason about them - to know that, at a certain
angle, where is a point on a circle.

This is where `Math.sin` and `Math.cos` jump in.<sup>[1](#1)</sup>

The most basic kind of circle to draw is a **unit circle**: simply,
a circle with a radius of 1. And so a diameter of 2. Once you make a unit
circle, it's easy to scale it up or down.

In terms of a unit circle, using `Math.sin` and `Math.cos` is simple:
the sine function generates `y` coordinates, and cosine generates `x`
coordinates.

Both functions take as an argument an angle in radians,
and return a number which you can interpret as a distance from the center
of the circle. The center of the circle, for a unit circle, is at
the coordinate 0, 0, and so it radiates outwards to 1 and -1 in x and y
dimensions.

<iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/tmcw/mWhzt/embedded/" allowfullscreen="allowfullscreen" frameborder="0"> </iframe>

## Radial Shapes from Circles

What's even better is that, with this basic knowledge, you can draw other
kinds of shapes as well.

Here's an equilateral triangle, drawn by choosing three angles - 0°, 120°, and 240°,
from a unit circle. Besides just being an easy way to compute this, you
also know that this triangle will be inscribed in a circle made from
the same formula.

<iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/tmcw/eNapM/1/embedded/" allowfullscreen="allowfullscreen" frameborder="0"> </iframe>

Here's a square, made the exact same way, which you can also guarantee is
inscribed in a circle of radius 90.

<iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/tmcw/rRetG/embedded/" allowfullscreen="allowfullscreen" frameborder="0"> </iframe>

So: in this narrow usage of trigonometry, sine and cosine are used to go
from angles into coordinates. How do you go back?

## atan2 and Angles

Let's do the opposite: going from coordinates to angles. Doing this is useful
for a number of reasons - like if you have a 'dial' control in which the
user can drag a circular UI element, and you want to know what angle they're
currently dragging it to. Or if you have existing data and you want to do
something that requires working with the angles from a → b → c, like
[my running map](http://macwright.org/2011/07/28/mapping-runs.html).

Sine, cosine, and tangent have inverse versions: [arcsine, arctan, and arccos](http://en.wikipedia.org/wiki/Inverse_trigonometric_functions) -
but they're not that convenient. Why? Because, while an angle going into
sine and cosine will give you a point in x & y, giving arcsine a y coordinate
and arccos an x coordinate is not enough, because there's no one-to-one
mapping - the point x=0 could be a the the top of the sphere or at the bottom,
and arccos doesn't know.

In school, you would learn how to figure out what quadrant the point is in,
and use a different little equation for each. Luckily there's some
**new math**:

[atan2](http://en.wikipedia.org/wiki/Atan2) is awesome: it takes a coordinate
and gives you the angle to it, and handles the quadrant problem internally.
The only catch is that atan2 takes arguments in a confusing `y, x` order.

Here's an example of looping this around - this uses `Math.atan2` to find the
angle from a point a picture to the mouse position, and then draws a line
at that angle using `Math.cos` and `Math.sin`:

<iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/tmcw/EaZPu/embedded/" allowfullscreen="allowfullscreen" frameborder="0"> </iframe>

## There and back again

Here's [a demo of turning an angle into a point on a unit circle and then back into an angle](http://macwright.org/mistakes/#5059825).
You'll notice that the final number is slightly off - that's because of
[floating point numbers](http://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html),
which lose accuracy over operations.

<a name='1'>1.</a> [Sine and Cosine in other languages](https://gist.github.com/tmcw/5057199)
