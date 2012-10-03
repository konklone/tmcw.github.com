---
layout: post
title: Considering CSS
categories:
- blog
---

_these are just collected thoughts; always remember that I have
no idea what I'm doing_

<a href='http://www.flickr.com/photos/tmcw/8051698668'>
<img src='http://farm9.staticflickr.com/8034/8051698668_735e1469e6_h.jpg' width='640' height='258' />
</a>

CSS is one of the great fixtures of modern technology,
the reason why the internet has style, and the original raison d'être of
[jQuery](http://jquery.com/), the most popular Javascript framework. Learning
how to write CSS is part of the hallowed tradition of entering the 'web design'
profession.

You'll also learn something like HTML, and probably Javascript or PHP. You'll
find that SVG and JSON are kind of like HTML - they hold data - and Javascript,
PHP, Java, C++, and the rest of a big family of programming languages are all
pretty similar.

But you'll never learn anything quite similar to CSS. It's like the [lonesome
george](http://en.wikipedia.org/wiki/Pinta_Island_tortoise) of stylesheet languages, the only of its kind. When you think about
designing a web page, CSS is the only option.

## It's Not That CSS Is Bad

This is not a critique of CSS; rather it is just trying to point out things
about CSS that are 'unusual'. Since it is the only one of its species, we rarely
think about the CSS that could have been, or the CSS alternative that could be -
'advanced CSS' is always about designing with CSS rather than designing CSS itself.
So, the compromises that CSS makes seem too much like natural laws.

> style sheets constitute a wormhole into unspeakable universes -<a href='https://listserv.heanet.ie/cgi-bin/wa?A3=ind9411&L=HTML-WG&E=0&P=291154&B=--&T=text%2Fplain'>Dr. James D. Mason</a>

Here's the point where the critic shouts that there are alternatives -
what about [SASS](http://sass-lang.com/), [less.js](http://lesscss.org/),
or [stylus](http://learnboost.github.com/stylus/)?

No; these are languages that add features to CSS, or allow for terse syntax.
**Accretion is not innovation**, and all of the CSS-like languages carry
the essential thesis of CSS unmodified.

**CSS, for a number of reasons, is intriguing, annoying, and scary.**

Scary not because of a lack in its design or implementation, which both
have been fine-tuned over many years of dedication. Scary because _the
customs of CSS have been so strongly ingrained that we can't think about
other worlds._

A long and excellent read on the topic is [Håkon Wium Lie's Phd thesis](http://people.opera.com/howcome/2006/phd/):
it summarizes the evolution of CSS alongside many other standards
that were considered for its place.

<center>(Here is a list of ideas that I have had and cannot make a coherent narrative out of)</center>

**CSS is about selectors**. It didn't have to be this way. [DSSSL](http://www.jclark.com/dsssl/), for instance,
supported something like

    (element NOTE
       (if (not (node-list-empty? (attribute "WARNING")))
         ...
         ...))

In which the syntax includes what we might call 'actual programming' rather
than selectors. The CSS, of course would be something like

{% highlight css %}
NOTE[WARNING] { }
{% endhighlight %}

Is this good? In one sense, yes - it allows for compact rules, and selectors
can be highly optimized by browsers, so that if you have lots of elements
shuffling on and off-screen, they can be styled quickly.

But, in another sense selector-heavy syntax is kind of unusual - it introduces
a lot of new grammars, like media queries, combinators, attribute selectors,
pseudoelements, pseudoselectors, even pseudo-logic like [`-moz-any()`](https://developer.mozilla.org/en-US/docs/CSS/:any?redirectlocale=en-US&redirectslug=CSS%2F%3A-moz-any)
These selectors are doing logic - they're asking the 'selector engine' to
do logic - but staying one large hop away from 'actual programming'.

This means that the responsibility and possibility for optimization is
almost completely in the hands of the person implementing the selector engine,
and only minimally in the hands of those using selectors. Even in a language
like [SQL](http://en.wikipedia.org/wiki/SQL), in which you are primarily
using queries that are [optimized by a query engine](http://www.sqlite.org/vdbe.html),
your choices clearly influence how the engine works. In CSS, much less.

## CSS is static and anonymous

CSS is static and anonymous. Let's say, for instance, you have
a page like

{% highlight html %}
<style>
a.link { color: red; }
</style>
<a class='link' href='#'>Foo</a>
{% endhighlight %}

So, here we have two levels of control: the browser sets one level of styles -
that beautiful Times New Roman font, blue link color, and nice big underlines
to make links look clickable. Then, you override that blue color and
turn the links on the page red, overriding the link color but letting
the rest of the browser's choices cascade.

Now, when people click the link, you want all links to change to green. In
jQuery, that'd roughly look like:

{% highlight js %}
$('a.link').click(function() {
    $('a.link').css('color', 'green');
    return false;
});
{% endhighlight %}

Now we have three levels of control. You see, jQuery doesn't change the style
in the page - on the top of the page, the style `color: red` is still in
effect. New links added to the page with Javascript will still be red.

What jQuery does is it selects all of the elements that match the `a.link`
selector, and sets an [inline style](http://www.w3.org/TR/html4/present/styles.html#h-14.2.2)
on each element.

There is a [CSS object model](http://www.w3.org/TR/DOM-Level-2-Style/css.html)
that nobody uses and everyone is very afraid of. Part of that reason is that
specificity and the 'inner workings' of CSS are opaque to the client, by
design.

What's the point? Part of it is that 'inline styles' are, like `<font>` tags
well-known 'bad practices', but _absolutely everyone uses them indirectly
all the time with Javascript_.

Part of it is that the selector-heavy model
of CSS and related convoluted system of accessing 'styles as objects or things'
means that, despite the proliferation of the so-called dynamic web, basically
nobody dynamically changes CSS after initial pageload.

Imagine, for instance, something like

{% highlight html %}
<style>
%linkstyle a.link { color: red; }
</style>
<a class='link' href='#'>Foo</a>
<script>
$('a.link').click(function() {
    styles.linkstyle.color = 'blue';
});
</script>
{% endhighlight %}

Faux-bolted-on-poorly-concepted 'named styles'. Discuss.

## If Box Layout Were the Only Kind of Layout, It Would Be Called Just Layout

There are alternatives, like [relative layout](http://developer.android.com/guide/topics/ui/layout/relative.html),
[flow layout](http://docs.oracle.com/javase/tutorial/uiswing/layout/flow.html),
et cetera.

It's 2012 and it's still tricky to make columns on a web page. Or a vertically
centered flexible-height box. CSS [grid systems](http://twitter.github.com/bootstrap/scaffolding.html#gridSystem)
put a band-aid on the problem while still hacking together elements that are
only pixels away from falling down a level and ruining the illusion.

## CSS Happens Now And Sometimes

The original design of CSS took into
consideration slow internet connections, which meant that content slowly
streamed into web pages. Which I am old enough to remember, embarrassingly.
But this isn't all.

{% highlight css %}
/* happens as content enters the page */
a { color: blue; }
/* happens on a user action */
a:hover { color: red; }
/* and now that happens at the end of a transition */
a { transition-property: color; transition-duration: 5s; }
{% endhighlight %}

What's the point? Well, part of it is that these 'dynamic' parts of CSS
overlap with Javascript. For instance, the `:hover` pseudo-class is equivalent
to

{% highlight js %}
$('a').hover(
function() {
    $(this).css('color', 'red');
},
function() {
    $(this).css('color', 'blue');
});
{% endhighlight %}

## What the heck are CSS selectors anyway?

The word 'selector' isn't really
used much elsewhere, and keeping it isolated in CSS-land limits our
ability to think about it relative to other concepts.

Selectors are match statements, like regular expressions or search terms. Their
closest cousin might be [XPath](http://en.wikipedia.org/wiki/XPath), a selector
system for all XML documents.

Could CSS selectors be mixed with regexes, so one could have a style like `h[1-3] { }`
instead of specifying each manually?

## Relativity and Why CSS Doesn't Have It

CSS doesn't have relative elements because it's designed to be constantly-applied
to web pages that load slowly on early-90s internet connections.

One of the interesting bits about the alternatives to CSS that
didn't make the cut is that they supported something like

{% highlight css %}
#foo {
    text-size: 10px;
}
#foo .bar {
    text-size: enclosing - 2px;
}
{% endhighlight %}

([this example is adapted from P94, a previous stylesheet language](http://people.opera.com/howcome/2006/phd/#h-125))

What's interesting about this? Well, that less, sass, and all of the CSS
pre-processors in the world can't replicate it; they all compile to CSS
which purposefully doesn't have this sense of context for selectors.

Why? Because CSS is designed to be constantly consistent - if you can reference,
for instance, the fact that a rule contains an element, like

{% highlight css %}
#foo has-child(div) {
    text-size: 9px;
}
{% endhighlight %}

Then the rendering of the page changes as the page loads - if `<div id='foo'>` contains
plenty of text, and then finally a `<div>`, it has to be re-layed out
with the rest of the page.

## CSS as a Grammatical Island

One of the criticism of CSS from the XML camp is that it isn't XML. It'd be possible
to express CSS in XML or [JSON](http://www.json.org/): in fact,
one of [Jeffrey Warren's](http://unterbahn.com/) projects,
[Cartagen](http://cartagen.org/), implemented a language called GSS which
is similar to MapBox's [Carto](https://github.com/mapbox/carto) but is
valid JSON.

A few other [half-finished efforts exist](http://code.google.com/p/json-css/).

The question about this is really about how you imagine stylesheet languages.
They are, in my eyes, **data**, and thus could benefit from being mungable.
And yet they're far from that - CSS parsers in browsers aren't accessible
programmatically and [those outside of browsers](https://github.com/visionmedia/node-css)
come up with their own internal data representation.

The divorce of CSS from more general data languages is possibly a big loss;
you can't use schemas like [JSON schema](http://json-schema.org/)
to validate it; you can't easily perform 'data analysis' on it.

## CSS is Implementable in Javascript

The interfaces for it are a little sketchy, but it's very possible:

<iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/tmcw/gQN6X/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

In particular, [Mutation events](https://developer.mozilla.org/en-US/docs/DOM/Mutation_events) have
been proposed, accepted, deprecated, and now on the path to replacement
with [DOM4 Mutation Observers](http://www.w3.org/TR/dom/#mutation-observers).
It's all very sketchy and possibly it's just
better to have a manual-repaint system.

But, the fact of the matter is that it's technically possible to implement
cascading in user-land and thus do some things with it that CSS specifically
prohibits, like custom properties, relative measures, that can't be implemented
with simple pre-processors.

## CSS is not implementable in CSS

The [CSS Object Model](http://www.w3.org/TR/1998/REC-CSS2-19980512/syndata.html)
is perhaps the epicenter of one certain kind of CSS loathing. It's pretty
unhelpful - provides no way to parse CSS without applying it to page contents,
and is implemented [differently in each browser](http://nimbupani.com/css-object-model.html).

But the most annoying bit of the object model is how it handles unknown values.
It creates a sort of data structure for styles:

{% highlight js %}
document.styleSheets = [
    { rules: [{ cssText: '#foo { color: red; }',
        style: {
          0: 'color', color: 'red'
        }
    }]}
]
{% endhighlight %}

Now in Javascript-land we have the concept of [polyfills](http://remysharp.com/2010/10/08/what-is-a-polyfill/) -
bits of 'user-land' Javascript that implement technologies not implemented
by certain browsers. For instance, you can include a [`indexOf` polyfill](https://gist.github.com/1034425),
and get the method in the backwards Internet Explorer browser. This is
because Javascript prototypes are modifiable and very few of its
other constructs are not modifiable (for instance, [operators](http://blog.thejit.org/2009/01/27/why-not-operator-overloading-in-javascript/)).

But CSS is miles away from this. Let's say you're in IE and you specify:

{% highlight css %}
#foo {
    text-shadow:1px 1px 1px #000;
}
{% endhighlight %}

This disappears. In [W3C](http://www.w3.org/) terminology, unknown properties are **ignored**, so
it's absolutely impossible to build a polyfill for new properties in older
browsers. And, even more silly than that, unknown values are not ignored,
but are represented as a `CSS_UNKNOWN` value, [completely inaccessible except
through the unparsed cssText value](http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-fundamental-h2).

This means that tremendously cool code like [Lea Verou's -prefix-free](https://github.com/LeaVerou/prefixfree)
has to rely on regular expression replacement of text chunks rather than the
CSS parser built into every browser.

## Go and Experiment

It's unclear what the path forward here is - it would certainly be interesting
if the W3C revises the CSSOM into something more useful for experimentation.
And I think that a Javascript stylesheet implementation is roughly possible
and could be extremely interesting in certain cases.
