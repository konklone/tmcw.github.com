---
layout: post
title: subscript
categories:
- blog
---

![](http://farm4.staticflickr.com/3813/9549897855_8017bdabf5_b.jpg)

At the [MapBox](http://www.mapbox.com/) office, we have a saying for certain
kinds of creations. When you veer too close reinventing a wheel, you say

> 'what the world really needs is a template language written by me'

or a test framework, programming language, MVC framework, and so on. For the most
part, we embrace this ideology: we think in terms of solutions,
not new gizmos. There's no [CoffeeScript](http://coffeescript.org/),
no [LeSS](http://lesscss.org/), no Jade, no obsession over [node.js flow control](http://callbackhell.com)
tricks, and so on.

I wrote a language, because what the world really needs is a language
written by me.

<iframe src='http://mistakes.io/#6271939' width='100%' height=600></iframe>

[subscript](https://github.com/tmcw/subscript) is a lisp-style language in
the pattern of [little lisp](https://github.com/maryrosecook/littlelisp).

{% highlight js %}
subscript(['+', 1, 2]) // => 3
{% endhighlight %}

**subscript has an interpreter**, like little lisp. It isn't compiled to JavaScript,
like [CoffeeScript](http://coffeescript.org/) or [TypeScript](http://www.typescriptlang.org/),
instead the code is interpreted and evaluated.

{% highlight js %}
subscript(JSON.parse(JSON.stringify(["+", 1, 2]))) // => 3
{% endhighlight %}

**subscript doesn't have a parser**. That's because it's [JSON](http://www.json.org/),
the standardized, lightweight data format with parsers and serializers available
pretty much anywhere.

{% highlight js %}
subscript(['let', [['x', 42]], 'x']); // => 42
{% endhighlight %}

**subscript can't do everything javascript can**. This is on purpose: it is
meant to be strict, controlled, and free of windows to evil, like eval and
[its brethren](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function).

**subscript is a lisp because that was easy**. This is my first
real language project and the idea of [lisp](http://bit.ly/bcHbv) is like the piano to C's guitar:
only one key per tone, but a little harder to play.

Why? A few things.

## What You Code When You Draw Algorithms

I can't stop thinking about visual programming and accessibility, about the
promise and mystery of [vvvv](http://vvvv.org/) and [learnable programming](http://worrydream.com/LearnableProgramming/)
and the semi-see-through code of [mistakes.io](http://mistakes.io/#4679533).

But being relentlessly focused on working code to a significant, somewhat crippling fault
makes me think about what you're really writing: when you design the algorithm
by drawing, when you teach a computer how to think, what is the artifact, if
not UTF8 text that tells V8 what to do?

In this case, subscript is a first shot at a [homoiconic](http://en.wikipedia.org/wiki/Homoiconicity)
language that should be straightforward to manipulate, as a working program,
from other working programs.

## What You Code When You Write Rules

Having worked on 'rule' or 'stylesheet' languages before in the context of
[CartoCSS](http://www.mapbox.com/tilemill/docs/manual/carto/), and having
some future of thinking about them again, along with the other rare beasts
of template languages, it makes you think about the nearly-software that
you're writing by proxy. See [Considering CSS](http://macwright.org/2012/10/03/considering-css.html) for
the last edition of this idea.

## Security through Simplicity

Javascript is an attack vector: it's littered with [tabnabbing](http://en.wikipedia.org/wiki/Tabnabbing),
[XSS](http://en.wikipedia.org/wiki/Cross-site_scripting), JSONP hacks,
stealing cookies and using client-side storage for nefarious ends.
[I've tried to contain it before and needed take a serious axe to some functionality](http://macwright.org/2012/01/10/iframes.html)
to ensure even a little bit of safety.

But on the other hand, _shared logic_ could be so useful in quite a few places:
what if maps could share their [projection](http://en.wikipedia.org/wiki/Map_projection)
code? If templates could export self-bootstrapping, safe functions? If online
games could support flexible scripting like desktop games do with [Lua](http://www.wowwiki.com/Lua)?

Whether it's bulletproof: I don't know. Try writing an exploit in pure subscript, assuming
that all implementations will do a `JSON.parse(JSON.stringify())` cycle to ensure
their input is pure.

## First

This is my first language. It's simple, little more than a riff on [Mary's cool project](http://maryrosecook.com/post/little-lisp-interpreter).
From here, meta-programming eureka perhaps.
