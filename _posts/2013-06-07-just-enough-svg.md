---
layout: post
title: Just Enough SVG
categories:
- blog
---

Now that [d3](http://d3js.org/) is in a stable state and [has achieved near-ubiquity](https://github.com/mbostock/d3)
amongst data visualization people, gears shift to document: [how selections work](http://bost.ocks.org/mike/selection/),
[via reimplementation](http://macwright.org/mistakes/#5010465), [presentations](http://macwright.org/presentations/dcjq/),
and so on.

Most of this focuses on the 'hard part' of d3, which is the concept of
the selection and data join. This is about what you might call an easier
part, or an even-lower-level one: [SVG](http://en.wikipedia.org/wiki/Scalable_Vector_Graphics).

**SVG**, short for Scalable Vector Graphics, is a standard for vector drawing that
integrates with HTML and is implemented by most browsers. Unlike [Canvas](http://diveintohtml5.info/canvas.html),
it's not raster-based but rather preserves the structure of your drawing
and is much like HTML in terms of events, updates, and being-a-tree.

Just like [math](macwright.org/2013/03/05/math-for-pictures.html), we tend
to use a subset of SVG for most drawings: here's that.

## Basic Shapes

There are a few basic shapes available in SVG:

`<circle>` is a circle: you'll always want to set its attribute `r` for radius.
Circles are positioned with `cx` and `cy`, or with transforms.

<iframe width="100%" height="300" src="http://dabblet.com/gist/5708900" frameborder="0"></iframe>

`<rect>` is a rectangle: it requires a `width` and `height` attribute to show up,
and is positioned with `x` and `y` attributes, or transforms.

<iframe width="100%" height="300" src="http://dabblet.com/gist/5708913" frameborder="0"></iframe>

However, it's important to remember that _all shapes in SVG can be represented
as paths_: `path` is the magic element.

`<path>` is any path in space: filled, it can look like a polygon, unfilled
it can look like a line. You can shape it into a circle or a rectangle, or use
it as the path for text to shape around.

<iframe width="100%" height="400" src="http://dabblet.com/gist/5708954" frameborder="0"></iframe>

## Positioning

Unlike in HTML, where often elements are often flowed around each other, like
with `float` or `position: inline-block`, SVG tends to treat positioning
as absolute: all elements support a `transform` property, which [supports a variety of linear transformations](https://developer.mozilla.org/en-US/docs/SVG/Attribute/transform)
but is often just a `translate(x, y)` to move an element around the page.

These transforms are often nested, like with a `<g>` element: you'll use
a group to shift your drawing by a few pixels to provide a margin, and then
place elements in that group without having to worry about the offset.

## The `<g>` element

A bit odd from the perspective of HTML is the `<g>` element, but it's incredibly
useful, for a variety of reasons.

The `g` element is a group: meaning, you can put elements into `g` and those
elements are transformed when `g` is transformed, they're removed when it's
removed, and so on.

SVG currently **doesn't support z-indexes** order of elements on a page is their
order in rendering. Thus, it makes sense to have logical groups of elements
in the page - for instance, the [iD editor](http://ideditor.com/) uses
several `<g>` elements to stack roads, buildings, and rivers on top of
each other in the right order.

SVG also doesn't do **nesting** the same way as HTML, so SVG is used
to group items that are really just stacked on top of each other, like
if you need a multi-circle stack for a bullseye.

## CSS + SVG

SVG can be styled with CSS, but uses different properties to do roughly equivalent
styling.

Where in CSS for HTML you might do

{% highlight css %}
#foo {
    background: #eee;
    border: 1px solid #000;
}
{% endhighlight %}

The SVG equivalent is

{% highlight css %}
#foo {
    fill: #eee;
    stroke: #000;
    stroke-width: 1;
}
{% endhighlight %}
