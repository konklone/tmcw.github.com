---
layout: post
title: CSS For Maps
categories:
- blog
---

[The first commit](https://github.com/mapbox/carto/commit/dfb4ce97425b72d241c3da7c65f30bacd8bc1a33)
to what became [CartoCSS](http://mapbox.com/carto/api/2.1.0/) (but was temporarily named 'mess', 'carto.js', and then 'carto') was made on
December 1, 2010. Since then it's gotten a lot of developer love - most of
its speed is thanks to [Konstantin](https://kkaefer.com/)'s genius and recent
refinements are thanks to [Dane](http://dbsgeo.com/).

It's been a while, and, thanks to its inclusion in [TileMill](http://mapbox.com/tilemill/),
a lot of people have used CartoCSS. It's about time for some reflection.

## The Why of CartoCSS

TileMill was originally implemented in [Python](https://github.com/mapbox/tilemill/commit/5b870b04d8e2a75855f7523a1937f5bad0eb0ae8).
We were going to do it with [Tornado](http://www.tornadoweb.org/), because
[TileLive](https://github.com/mapbox/TileLive) used Tornado and [Mapnik](http://mapnik.org/)'s
Python bindings were strongest.

As time went on, we decided to make it multi-platform and saw that an
async-in-sync framework like Tornado would be unsustainable. And so we decided
on [node.js](http://nodejs.org/), still then a very early project, because
of its design & all-async approach.

But, as I said, originally TileMill was in [Python](http://www.python.org/),
and that made its use
of [Cascadenik](https://github.com/mapnik/Cascadenik) possible.
Cascadenik, by [Mike Migurski](http://mike.teczno.com/) and the [Stamen](http://stamen.com/)
team, is entirely the inspiration for Carto.

However, as time went on, we found a few things to be desired. I was chasing
after better error reporting - since TileMill would report errors in a
GUI and ideally give great feedback for getting novice users up to speed.
Cascadenik's performance on large stylesheets was also lacking at the time.
And, finally, of course, bridging the gap between a Python stylesheet processor
and a node.js application was awkward and problematic.

## More Or LESS CSS

The CartoCSS implementation is based off of [LESS CSS](http://lesscss.org/),
one of the strongest CSS pre-processors around. I have no regrets around this
decision - the LESS parser has been fast enough to never be a bottleneck,
and its general AST technique is fairly clean.

CartoCSS, like Cascadenik looks like CSS, which is a language friendly enough
to fit into with 'it isn't programming' mold of HTML: specifically, lots of
people use CSS.

However, it's important to note that CartoCSS **isn't CSS**. To be clear, I'm
happy when people come away with the impression that CartoCSS is CSS, and that
TileMill is using CSS to style things in-browser. If we can create that level
of magic, it's wonderful - and taking advantage of the CSS syntax familiarity
to reduce people's self-destructive "I can't do this" reaction is huge.

## Not Quite CSS

CartoCSS is not CSS in a few ways.

First, [Mapnik](http://mapnik.org/) does not implement cascading - Carto does.
Internally, CartoCSS implements [CSS specificity](http://www.w3.org/TR/CSS2/cascade.html),
collapses and coalesces rules, and essentially plays the role of a web browser.
This is where most of the performance gain is from Cascadenik (in doing this intelligently)
but also where most of the effort goes in maintaining it.

Second, Mapnik follows a painter's model, not a document model. What this means
is that in CSS, you can have code like:

{% highlight html %}
<style>
div { border: 1px solid #000; }
</style>
<div>foo</div>
{% endhighlight %}

You give the div _its border_: the div has one potential border, which can
be styled and turned on and off with `border: none`.

The painter's model is the reverse: there are potentially infinite borders,
fills, markers, and so on, and you assign them to elements. In mock-HTML,
it would be like:

{% highlight html %}
<style>
border[div] {
    width: 1px;
    style: solid;
    fill: #000;
}
</style>
<div>foo</div>
{% endhighlight %}

Also, the HTML 'order' is no longer. HTML stacks styles - borders are around
fills, paddings are within them. Maps can have borders behind or in front
of fills, and multiple borders in any order.

What does this mean for a CSS pre-processor for maps? You could simply
restrict this power from users of the pre-processor, but we decided not to -
after all, TileMill is used internally for the [MapBox Streets](http://mapbox.com/tour/design/)
product, so it needs to scale to extreme-pro use cases.

CartoCSS does this with attachments:

{% highlight css %}
#world {
    ::borderback { line-width: 5; }
    line-color: #f00;
    line-width: 2;
}
{% endhighlight %}

The attachment syntax (stolen from CSS pseudo-elements) lets you say that
'for this style I'm going to have multiples of a symbolizer'.

The idea of the painter's model not having a guaranteed order also affects
how ordering in the language works:

{% highlight css %}
#world {
    polygon-fill: #0f0;
    line-width: 2;
}
/* this has a different order in the rendering */
#world {
    line-width: 2;
    polygon-fill: #0f0;
}
{% endhighlight %}

## Evolution

A lot has changed with CartoCSS over its life. One of the biggest changes
was improving versioning with Mapnik: both CartoCSS and Mapnik have versions,
and the CartoCSS compiler can take a Mapnik version and compile (and verify)
to it.

A few scattered changes:

Carto acquired nicer ways of handling fields in datasources from Mapnik: what
used to be `text-name: "[FOO]"` can now be `text-name: [FOO]`, and using
expressions like `marker-width: [FOO]` can easily also support
`marker-width: [FOO] * 2`. This is actually kind of an insane change, because
it needs to push expressions back into Mapnik, and can't do this purely. You
can use variables, like `marker-width: [FOO] * @scale`, and CartoCSS does
the right thing.

'Instances' were added by Konstantin and allow you to do:

{% highlight css %}
#roads {
  casing/line-width: 6;
  casing/line-color: #333;
  line-width: 4;
  line-color: #666;
  }
{% endhighlight %}

Instead of classic casings, in which one layer of casings displays under all
centerlines, this will show a casing under each line, possibly overlapping
with another line underneath.

FontSets are a cool Mapnik features that we support like

{% highlight css %}
text-face-name: "Georgia Regular", "Arial Italic";
{% endhighlight %}

Behind the scenes this is intelligent; if a lot of rules use the same list
of fonts, CartoCSS does its best to condense all of the generated XML
fontsets into one reference.

## The Future

There are scattered attempts at supporting CartoCSS in-browser - the furthest
advanced being [Vizzuality's Vecnik project](https://github.com/Vizzuality/VECNIK).

While my heart immediately wanted to just go straight CSS and used [SVG](http://en.wikipedia.org/wiki/Scalable_Vector_Graphics)
for maps, this doesn't seem to be a viable option - given that SVG mainly
uses the same rendering model as HTML (with odd exclusions like no z-indexes),
it's very difficult to render complex scenes without lots of elements and hacks.

But, for simple maps SVG and CSS can cut it - as they do in
[the iD editor project I've been recently working on](https://github.com/systemed/iD).
