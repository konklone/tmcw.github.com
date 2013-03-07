---
layout: post
title: Math for Pictures
categories:
- blog
---

![](http://farm1.staticflickr.com/16/21820420_3afd71f654_b.jpg)

Here's the small subset of math that I use for the vast majority of visualizations -
ideally it's a good introduction to those who want to make pretty things
with [d3js](http://d3js.org/), canvas, or other tools.

In essence, I'll try to explain four parts of Javascript's built-in `Math`
object:

* `Math.cos(a)`, which we use to get x positions from angles
* `Math.sin(a)`, which we use to get y positions from angles
* `Math.atan2(y, x)`, which turns x, y positions back into angles
* `Math.PI`, which we use to convert radians to degrees and back, and use
  for the angles in a circle

Of course, each of these parts is usable for much, much more - but let's start here.

## Radians

As a preface, let's get confortable with the _units_ that these functions
take: [radians](http://en.wikipedia.org/wiki/Radian). The degree angles in a circle
go from 0° to 360°. In the land of radians, that's
0 radians to 2π radians. So, halfway around is π and 90° is π/2.

Core Math functions use radians exclusively. For code that bridges the gap
and accepts degrees as input, you'll usually see a chunk like this,
that defines `D2R` and `R2D`, which convert radians `R` to degrees `D` and back again.

<iframe width='640' height='350' class='white-on-white' src='http://mistakes.io/#5069332'> </iframe>

## Math.sin & Math.cos

Before diving in to `Math.sin()` and `Math.cos()`, let's think quickly about
what they are.<sup>[2](#2)</sup>

<iframe width='640' height='170' class='white-on-white' src='http://mistakes.io/#5069307'> </iframe>

`Math.sin()` and `Math.cos()` are _functions_ that take one numeric argument
and return a numeric value. While you can give them any number and they'll
give a value, the values repeat every `2 * Math.PI`, because that's their
[wavelength](http://en.wikipedia.org/wiki/Wavelength).

## Sine, Cosine, and Unit Circles

![](http://farm9.staticflickr.com/8525/8530467688_46698099ae_b.jpg)

Many visualizations are composed of circles, circle fitting, or 'radial' layouts.
For instance, [this geometry daily redo](http://bl.ocks.org/tmcw/raw/4678085/),
as [well as this one](http://bl.ocks.org/tmcw/raw/4689139/), and
[this one](http://bl.ocks.org/tmcw/4949593), and [this one](http://bl.ocks.org/tmcw/4945177) -
all circle-based.

To just draw circles, SVG has a [circle element](http://www.w3.org/TR/SVG/shapes.html#CircleElement).
But it's more important to reason about them - to know that, at a certain
angle, where is a point on a circle.

This is where `Math.sin()` and `Math.cos()` jump in.<sup>[1](#1)</sup>

The fundamental circle you can draw with the functions is a **unit circle**:
a circle with a radius of 1. (and thus a diameter of 2) Once you make a unit
circle, it's easy to scale it up or down.

In terms of a unit circle, using `Math.sin()` and `Math.cos()` is simple:
the sine function generates `y` coordinates, and cosine generates `x`
coordinates.

<iframe width='640' height='300' class='white-on-white' src='http://mistakes.io/#5087852'> </iframe>

We call it a _unit circle_ because the distance from the center to
each point is 1.

Both functions take as an argument an angle in radians,
and return a number which you can interpret as a distance from the center
of the circle. The center of the circle, for a unit circle, is at
the coordinate `0, 0`, and so it radiates outwards to 1 and -1 in x and y
dimensions.

<iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/tmcw/mWhzt/embedded/" allowfullscreen="allowfullscreen" frameborder="0"> </iframe>

One of the classic tricks with sine, cosine, and so on is the pattern:

* sine: opposite / hypotenuse
* cosine: adjacent / hypotenuse
* tangent: adjacent / adjacent

These make a lot of sense in this context if you think of a triangle radiating
out of a unit circle, and since the hypotenuse is always equal to 1,
sine and cosine simply provide the values of opposite and adjacent sides.

<iframe width='640' height='320' src='http://bl.ocks.org/tmcw/raw/5090599/'> </iframe>

## Radial Shapes from Circles

![](http://farm9.staticflickr.com/8104/8530470952_6a02dcf5dc_b.jpg)

With this basic knowledge, you can draw other
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
mapping - the point x=0 could be at the the top of the sphere or at the bottom,
and arccos doesn't know.

In school, you would learn how to figure out what quadrant the point is in,
and use a different little equation for each. Luckily there's some
**new math**:

[atan2](http://en.wikipedia.org/wiki/Atan2) is awesome: it takes a coordinate
and gives you the angle to it, and handles the quadrant problem internally.
The only catch is that atan2 takes arguments in an atypical `y, x` order.

<iframe width='640' height='300' class='white-on-white' src='http://mistakes.io/#5087892'> </iframe>

Here's an example of looping this around - this uses `Math.atan2` to find the
angle from a point a picture to the mouse position, and then draws a line
at that angle using `Math.cos` and `Math.sin`:

<iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/tmcw/EaZPu/embedded/" allowfullscreen="allowfullscreen" frameborder="0"> </iframe>

atan2 is the goldmine that [made my running map](http://macwright.org/2011/07/28/mapping-runs.html) possible
and sparked this renewed fascination with math.

## Further Reading

[Nature of Code](http://natureofcode.com/) is a great exploration of
other realms of math. [Bret Victor's Kill Math](http://worrydream.com/#!/KillMath)
is essential. [Trig without Tears](http://oakroadsystems.com/twt/) is great.

The examples in this article are powered by [bl.ocks.org](http://bl.ocks.org/),
[jsfiddle](http://jsfiddle.net/), and my project [mistakes.io](http://mistakes.io/).
You might also find [tributary.io](http://tributary.io/) useful for prototyping.
The lead illustration was done in [Context Free](http://www.contextfreeart.org/).

<ul>
<li><a name='1'>1.</a> <a href='https://gist.github.com/tmcw/5057199'>Sine and Cosine in other languages</a>
<li><a name='2'>2.</a> <a href='https://gist.github.com/tmcw/5069385'>Want to know the really core implementation of sine and cosine? Here it is in V8</a>
</ul>
