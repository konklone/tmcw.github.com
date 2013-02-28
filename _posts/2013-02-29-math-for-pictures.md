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

<a name='1'>1.</a> [Sine and Cosine in other languages](https://gist.github.com/tmcw/5057199)
