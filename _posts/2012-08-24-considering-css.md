---
layout: post
title: Considering CSS
categories:
- blog
---

_these are just collected thoughts; always remember that I have
no idea what I'm doing_

> style sheets constitute a wormhole into unspeakable universes

<span class='image-credit'><a href='https://listserv.heanet.ie/cgi-bin/wa?A3=ind9411&L=HTML-WG&E=0&P=291154&B=--&T=text%2Fplain'>Dr. James D. Mason</a></span>

I remember explaining to friends in 2002<sup>[*](#css-1)</sup> that
monitors are just the displays of computers, that the humming box below
it is the bit that thinks. And that learning [HTML](http://en.wikipedia.org/wiki/HTML)
is great and fun, but it's not a programming language, it's a
markup language, because it doesn't do things, it just describes them -
[PHP](http://www.php.net/), on the other hand, was a real programming language.
CSS, on the other hand, I said was a styling language.

Since then, the popularity of PHP has morphed into Ruby, Python, and now
Javascript, and HTML has made friends in
[Markdown](http://daringfireball.net/projects/markdown/), Textile,
and older comrades like [LaTeX](http://www.latex-project.org/).

**CSS is still the only established stylesheet language.**

Now the internet runs on [worse is better](http://www.jwz.org/doc/worse-is-better.html)
thinking. We turned down the XML-correctness
of [XHTML](http://en.wikipedia.org/wiki/XHTML_2.0#XHTML_2.0)
for [tolerant HTML5 parsing](http://my.opera.com/hallvors/blog/2008/11/19/html5-and-invalid-documents-the-great-misunderstanding);
the [warts of Javascript](http://matt.might.net/articles/javascript-warts/)
are tolerated, and even [HTTP Cookies](http://en.wikipedia.org/wiki/HTTP_cookie)
are a glorified, inefficient hack.

And CSS is fairly good: the problems most people face in it are related to
variation of browsers<sup><a href='#css-2'>*</a></sup>, not lack of expressiveness.

And for the people who want CSS with the kitchen sink, we've been aggressively
developing it. There's [LESS](http://lesscss.org/)
lets you nest selectors, `spin()` colors, and
use variables. [Stylus](http://learnboost.github.com/stylus/)
allows omission of nearly everything, plus everything noted above.

But these are [syntax sugar](http://en.wikipedia.org/wiki/Syntactic_sugar)s, not alternatives.

## Weak Critique

I don't like leading with critique, especially in this case when it would likely
be for the purpose of convincing people that they shouldn't like what they
do like.

But there are things at the corners of CSS that are a bit concerning and probably
appear to others as concern.

CSS is easiest to reason about when thought of as stateless, timeless,
and [orthogonal](http://en.wikipedia.org/wiki/Separation_of_concerns) to
non-style concerns. But CSS breaks these sometimes:

1. The [`pointer-events`](https://developer.mozilla.org/en-US/docs/CSS/pointer-events)
property crosses into Javascript's events system, prior to [event bubbling](http://www.quirksmode.org/js/events_order.html)
and in a way that amusingly clashes with [IE7's event handling that changes based on background image and color](http://nuhk.blogspot.com/2010/10/click-event-not-fired-if-background-is.html).
2. [CSS Transitions](https://developer.mozilla.org/en-US/docs/CSS/Using_CSS_transitions?redirectlocale=en-US&redirectslug=CSS%2FCSS_transitions)
make CSS a temporal entity, allowing Javascript to [listen to the end](https://developer.apple.com/library/safari/#documentation/InternetWeb/Conceptual/SafariVisualEffectsProgGuide/AnimatingCSSTransitions/AnimatingCSSTransitions.html#//apple_ref/doc/uid/TP40008032-CH13-SW8),
but not control or hear the start, of a transition that could take
several seconds.
3. [Media queries](http://www.w3.org/TR/css3-mediaqueries/) introduce logic to CSS,
as well as the potential for a page's rulesets to change due to factors like
resizing the browser window.

## A Limited Ability To Wonder

Critiquing sucks, though.

The scariest thing is not the flaw in a system but the idea that
a system can be a forever-plateau. Abstraction is the godsend of computer science,
but it can be the wall to learning: it glorifies what's been made and in
containing its complexity also exaggerates it.



<ul>
  <li id='css-1'><a href='http://www.youtube.com/watch?v=nSWTkI_aVSo'>I done got old</a></li>
  <li id='css-2'>Internet Explorer, and now probably mobile browsers, since
  they'll get harder to test on single systems.</li>
</ul>
