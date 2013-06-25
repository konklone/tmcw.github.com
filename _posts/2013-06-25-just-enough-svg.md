---
layout: post
title: Just Enough SVG
categories:
- blog
---

![](http://farm4.staticflickr.com/3799/9127833805_cf858cda3e_b.jpg)

Now that [d3](http://d3js.org/) is in a stable state and [has achieved near-ubiquity](https://github.com/mbostock/d3)
amongst data visualization people, gears shift to document: [how selections work](http://bost.ocks.org/mike/selection/),
[via reimplementation](http://macwright.org/mistakes/#5010465), [presentations](http://macwright.org/presentations/dcjq/),
and so on.

Most of this focuses on the 'hard part' of d3, which is the concept of
the selection and data join. This is about what you might call an easier
part, or an even-lower-level one: [SVG](http://en.wikipedia.org/wiki/Scalable_Vector_Graphics).

You can use d3 without SVG - you can use it with [Canvas](http://bl.ocks.org/mbostock/3783604)
or [just with HTML](http://dccode.org/browser/#/3/3-107). But SVG's the most
popular output, since it works well with d3's idea of selections and
can express most kinds of graphics.

**SVG**, short for Scalable Vector Graphics, is a standard for vector drawing that
integrates with HTML and is implemented by most browsers. Unlike [Canvas](http://diveintohtml5.info/canvas.html),
it's not raster-based but rather preserves the structure of your drawing
and is much like HTML in terms of events, updates, and being-a-tree.
Unlike Canvas, it's [old](http://en.wikipedia.org/wiki/Scalable_Vector_Graphics#Development_history),
big, and complex.

Just like [math](http://macwright.org/2013/03/05/math-for-pictures.html), we tend
to use a subset of SVG for most drawings: here's that.

## Basic Shapes

There are a few basic shapes available in SVG:

`<circle>` is a circle: you'll always want to set its attribute `r` for radius.
Circles are positioned with `cx` and `cy`, or with transforms.

<iframe width="100%" height="300" src="http://dabblet.com/gist/5708900" frameborder="0"></iframe>

`<rect>` is a rectangle: it requires a `width` and `height` attribute to show up,
and is positioned with `x` and `y` attributes, or transforms.

<iframe width="100%" height="300" src="http://dabblet.com/gist/5708913" frameborder="0"></iframe>

`<path>` is the most versatile kind of shape: filled, it can look like a polygon, unfilled
it can look like a line. You can shape it into a circle or a rectangle, or use
it as the path for text to shape around. Even though SVG also has a
`<polygon>` and `<polyline>` element, most of the [maps](http://bl.ocks.org/mbostock/2206590)
and drawings you see in d3 are made of paths, since paths can express all
of the same shapes.

<iframe width="100%" height="400" src="http://dabblet.com/gist/5708954" frameborder="0"></iframe>

## The `d` Attribute

The [path data attribute](http://www.w3.org/TR/SVG/paths.html#PathData) is a source of much confusion for new users of
d3, since it's confusing. That is, for the purposes of efficiency, it's very
concise and has optional syntax: sometimes coordinates are separated with `,`
but they don't have to be, and saying `L10 10 L10 10` is equivalent to saying
`L10 10 10 10`.

The basic parts of path data are _commands_, like `L`, which say 'draw
a line from here to there' or 'start a new line' or 'draw a squiggly line'
or 'close this line by adding a segment back to the first point'.

Then there are _coordinates_, like `10 10`, which are X and Y positions
of places to go. Path data is just coordinates and commands, strung together
to tell lines where to start, go, and end.

![](http://farm4.staticflickr.com/3830/8955549268_6d6450191c_b.jpg)

This [railroad diagram](http://en.wikipedia.org/wiki/Syntax_diagram) may or
may not bring you some sense of higher enlightenment about path data.

{% comment %}
Diagram(
    NonTerminal('M'),
    NonTerminal('X'),
    NonTerminal('Y'),
    OneOrMore(
        Choice(
            0,
            Sequence(
                Choice(
                    0,
                    NonTerminal('M'),
                    NonTerminal('L'),
                    NonTerminal('T')
                ),
            NonTerminal('X'),
            NonTerminal('Y')),
            Sequence(
                NonTerminal('C'),
                NonTerminal('x1'),
                NonTerminal('y1'),
                NonTerminal('x2'),
                NonTerminal('y2'),
                NonTerminal('x'),
                NonTerminal('y')
            ),
            Sequence(
                NonTerminal('S'),
                NonTerminal('x2'),
                NonTerminal('y2'),
                NonTerminal('x'),
                NonTerminal('y')
            ),
            Sequence(
                NonTerminal('Q'),
                NonTerminal('x1'),
                NonTerminal('y1'),
                NonTerminal('x'),
                NonTerminal('y')
            ),
            Sequence(
                NonTerminal('H'),
                NonTerminal('y')
            ),
            Sequence(
                NonTerminal('V'),
                NonTerminal('x')
            ),
            NonTerminal('Z')
    ),
  ',')
)
{% endcomment %}

## Positioning

You may be familar with [CSS Transforms](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Using_CSS_transforms) -
they're an efficient way to move around HTML elements without causing
[browser reflows](https://developers.google.com/speed/articles/reflow), and with
more flexibility than usual old CSS positioning.

SVG has its own transforms, with a very similar syntax, which you can use to
position any element. And unlike HTML, there are no 'float' or 'inline' ideas
in SVG - the position of each element doesn't affect the position of elements
outside of its subtree.

On the downside, SVG transforms are sometimes not 3D accelerated when HTML
transforms are - so they aren't necessarily fast.

There are also has positioning attributes -
you can set the position of a `<rect>` with `x` and `y` attributes, and of a circle
with `cx` and `cy`. Sometimes these are useful - especially with text,
when you can set position relative to the baseline with positioning attributes
and then positioning in the page with a `transform`.

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

SVG also doesn't use **nesting** as much as HTML, so `<g>` is used
to group items that are really just stacked on top of each other, like
if you need a multi-circle stack for a bullseye.

The `<g>` element is often used in a very similar fashion to [Canvas's idea of transformations](http://devhammer.net/blog/exploring-html5-canvas-part-4---transformations) -
by using a `<g>`, you can shift the contents of a graph so that there's a margin
around its boundary, or scale groups of shapes all at once.

Finally, `<g>` is really useful for d3 because it provides a _DOM way of
expressing subselections_ - you can use a `<g>` element for each series of a
multiple series chart or for each chapter of a book, and easily bind the group
of data to the `<g>` and the subsets to its contents.

## CSS + SVG

<iframe width="100%" height="200" src="http://jsfiddle.net/tmcw/hT9WY/embedded/html,css,result/" allowfullscreen="allowfullscreen" frameborder="0"> </iframe>

SVG can be styled with CSS, but uses different properties to do roughly equivalent
styling. It's basically more unified - to set the fill of a circle, you set
its `fill`, and the same thing to set the fill of text or a path.

{% highlight css %}
/* css for HTML */
#foo {
    background: #eee;
    border: 1px solid #000;
}

/* css for SVG */
#foo {
    fill: #eee;
    stroke: #000;
    stroke-width: 1;
}
{% endhighlight %}

## Using SVG without d3

d3 protects us from the oddity of interacting with SVG elements through some
built-in magic. If you used d3 in the olden days, you would see code like

{% highlight js %}
<!-- why do we have to write svg: -->
svg.append("svg:text")

<!-- instead of just -->
svg.append("text")
{% endhighlight %}

Herein lies a little detail: HTML and SVG use [XML Namespaces](http://en.wikipedia.org/wiki/XML_namespace)
so that both SVG and HTML can have tags named `text` without a conflict.
SVG uses the namespace `http://www.w3.org/2000/svg`, so instead of simply
calling [`document.createElement`](https://developer.mozilla.org/en-US/docs/Web/API/document.createElement), you'll need to use its cousin
[`document.createElementNS`](https://developer.mozilla.org/en-US/docs/Web/API/document.createElementNS).

To create an SVG element with a circle of radius 5, you would write:

<iframe width="100%" height="300" src="http://jsfiddle.net/tmcw/e2pyx/3/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

A little dirty, right? Anyway, d3 simplifies this [since 2.6](https://github.com/mbostock/d3/issues/272)
by automatically using the namespace `http://www.w3.org/2000/svg` to create
the `<svg>` element, and then [selections](http://bost.ocks.org/mike/selection/)
automatically use that namespace for each new insertion.
