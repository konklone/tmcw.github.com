---
layout: post
title: Considering CSS
categories:
- blog
---

_these are just collected thoughts; always remember that I have
no idea what I'm doing_

**Nobody thinks about CSS**. It's one of the great fixtures of modern technology,
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

**CSS is static and anonymous**. Let's say, for instance, you have
a page like

{% highlight html %}
<style>
a.link { color: red; }
</style>
<a class='link' href='#'>Foo</a>
{% endhighlight %}

So, here we have two levels of control: your browser sets one level of styles -
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

Faux-bolted-on-poorly-concepted 'named styles'. Discuss amongst yourselves.

**If box layout were the only kind of layout, it would just be called layout**.
There are alternatives, like [relative layout](http://developer.android.com/guide/topics/ui/layout/relative.html),
[flow layout](http://docs.oracle.com/javase/tutorial/uiswing/layout/flow.html),
et cetera.

It's 2012 and it's still tricky to make columns on a web page. Or a vertically
centered flexible-height box. CSS [grid systems](http://twitter.github.com/bootstrap/scaffolding.html#gridSystem)
put a band-aid on the problem while still hacking together elements that are
only pixels away from falling down a level and ruining the illusion.

**CSS happens now and sometimes**. The original design of CSS took into
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

**What the heck are CSS selectors anyway?** The word 'selector' isn't really
used much elsewhere, and keeping it isolated in CSS-land limits our
ability to think about it relative to other concepts.

Selectors are match statements, like regular expressions or search terms. Their
closest cousin might be [XPath](http://en.wikipedia.org/wiki/XPath), a selector
system for all XML documents.

