---
layout: post
title: subscript
categories:
- blog
---

At the [MapBox](http://www.mapbox.com/) office, we have a saying for certain
kinds of creations. Whenever you veer too close reinventing a wheel, you say
'what the world really needs is a template language written by me' - or
a test framework, programming language, MVC framework, and so on. For the most
part, I embrace this ideology: we think in terms of what fixes the problem,
not what new gizmos we can try out. There's no [CoffeeScript](http://coffeescript.org/),
no [LeSS](http://lesscss.org/), no Jade, no obsession over [node.js flow control](http://callbackhell.com)
tricks, and so on.

Anyway, I wrote a language, because what the world really needs is a language
written by me.

[subscript](https://github.com/tmcw/subscript) is a lisp-style language in
the pattern of [little lisp](https://github.com/maryrosecook/littlelisp).

{% highlight js %}
subscript(['+', 1, 2]) // => 3
{% endhighlight %}

**subscript has an interpreter**, like little lisp. It isn't compiled to JavaScript,
like CoffeeScript or TypeScript, instead the code is interpreted and evaluated.

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
real language project and the idea of lisp is like the piano to C's guitar:
only one key per tone, but a little harder to play.

## But Why
