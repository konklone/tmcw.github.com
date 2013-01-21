---
layout: post
title: Javascript Module Pattern, Memory, Closures
categories:
- blog
---

An update to [Module Pattern, A Little More Detail](http://macwright.org/2012/06/04/the-module-pattern.html),
an article in which I first explained the idea of using closure'd objects
as an alternative to Javascript's `new` and `prototype` system objects.

It's been a few months since my first article on the Javascript module
pattern and I've learned and read a lot, thanks to whizzes like
[mraleph](https://twitter.com/mraleph) and [John Firebaugh](http://mapbox.com/about/team/#john-firebaugh).
Here's an update.

## Closures Can Be Less Memory-Efficient than Classical Objects

![](http://farm9.staticflickr.com/8498/8403853692_b0256187cd_o.png)

`new`-based objects in red, `closure` based objects in green. Both have linear
impacts upon memory, but objects occupy significantly more space: at 524,288
instances, closure-based objects occupy 112MB, whereas classical objects occupy
27MB.

Here's the [code for that example](https://gist.github.com/4590296) -
as far as I know, it's kosher and pseudo-scientific but improvements are welcome.

The cause for this, grokking what's possible [Vyacheslav's article](http://mrale.ph/blog/2012/09/23/grokking-v8-closures-for-fun.html),
is that functions within a closure require the allocation of a V8 context
for every object created, whereas functions on classical objects don't require
new scopes - they're just automatically called with a `this` value.

## Closure Variable Access is Slightly Slower

[Vyacheslav Egorov eloquently explained this issue](http://mrale.ph/blog/2012/09/23/grokking-v8-closures-for-fun.html) that
was brought up by [Marijn Haverbeke](http://marijnhaverbeke.nl/blog/closure-vs-object-performance.html):
accessing a closure variable - a variable in the scope of a closed-over
function - is slower than accessing a member variable of a classical object
using `this`.

The difference between the two is _extremely minimal_: Marijn saw a 2 to 3%
speedup over a real-world codebase. Also, it's neat that he was also using
closure-objects in order to minimize size, which I [wrote about a little while ago](http://macwright.org/2011/10/06/javascript.html)
and didn't expect many people to be too concerned about.

## Closures are Slower to Initialize Than `new`

![](http://farm9.staticflickr.com/8097/8402905323_a735d71c4c_o.png)

[The code and data for this graph](https://gist.github.com/4590667), using
the same kind of object and same basic approach as before.

`new`-based objects in red, `closure` based objects in green. It takes
87ms to initialize 524,288 instances with `new`, and 347ms to initialize
with closures. I'm assuming that this is caused by the increased cost of context
objects as before with memory.

## Using This Knowledge

Personally a 2% to 3% difference in lookup performance isn't enough to
influence my code style: I'm making a resolution to never optimize
functions that take less than 10% of runtime, as a kind of guard on sanity
and focus. Similarly, the speed difference in initialization isn't that much
of a concern. In this test, it's between 0.00066ms and 0.00016ms: it's unlikely
that a performance penalty on that problem factors much into the overall picture.

The memory difference is much more important, and actionable, because Chrome's
[heap profiler](https://developers.google.com/chrome-developer-tools/docs/heap-profiling) has
become so mature and usable. For very heavily-allocated objects, it
makes more memory-sense to use classical objects than closures.

In the [iD project](https://github.com/systemed/iD), this meant that
large, asynchronous sections, like `iD.Map`, the map object, are classical,
while heavily-allocated data objects like `iD.Node`
(a holder for any [node](http://wiki.openstreetmap.org/wiki/Node) from OSM - we often handle thousands)
are implemented with classical objects.

If you look closely at the d3 project, it make some interesting moves
regarding how it declares functions: utility functions for heavily-allocated
objects lie outside the object scope. This is an interesting way to
go forward, and may lead to more easily optimized code on the V8 side.

As always, there's a balance between speed, complexity, and developer
happiness. Choose wisely.
