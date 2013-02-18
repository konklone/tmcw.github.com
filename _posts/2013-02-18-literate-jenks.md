---
layout: post
title: Literate Jenks Natural Breaks and How The Idea Of Code is Lost
categories:
- blog
---

Consider Jenks Natural Breaks Optimization.

[![](http://farm9.staticflickr.com/8390/8483803012_1d8f5033c9_h.jpg)](http://bl.ocks.org/tmcw/4969184)

<span class='image-credit'><a href='http://bl.ocks.org/tmcw/4969184'>try an interactive version of this</a></span>

It's a way to cut up data values into discrete categories. For instance,
a choropleth map of poverty rates is cut into nine buckets which each
have a different [color](http://colorbrewer2.org/). Different scales are
useful for different kinds of data - you might use a linear scale, log scale,
quantile, or so on.

Jenks is an algorithm designed specifically for this
case that tries to maximize the similarity of numbers in groups while
maximizing the distance between the groups. It tends to look good and
be easily understood, so it's popular. It's in ArcGIS, QGIS, and lots of
other tools for maps and statistics. It's in university lectures and textbooks.

## Mystery Ports of Ports

There's a standard algorithm we use for Jenks, with existing ports in
[in Javascript](https://github.com/simogeo/geostats),
[Python](https://gist.github.com/drewda/1299198),
and [in Java and Fortran](https://stat.ethz.ch/pipermail/r-sig-geo/2006-March/000811.html).

Notice anything about these linked scripts?

Every implementation I could find of Jenks is **a port from Fortran IV**,
with the same terrible variable names, no comments, and absolutely no evidence that
the porting author knew absolutely anything about **what the code was doing**.

<img src='http://farm9.staticflickr.com/8520/8484141228_5d14487c78_b.jpg' class='white-on-white' />

Let's be clear: the algorithms we use for Jenks are directly ported from an algorithm
that accepted punch cards, documented in a paper composed and published
on a typewriter.

It's not clear who renamed the matrices (originally `OP` and `LC`) to `mat1` and `mat2`,
but that naming stuck and sucks.
The Javascript ports don't just taste like Fortran, but Python too - zeros
are initialized as `0.0` as if the language had an integer type, and have
about half comma-free style.

And this is not quibbling about style:
[the Wikipedia article about Jenks natural breaks](http://en.wikipedia.org/wiki/Jenks_natural_breaks_optimization)
describes an algorithm entirely unlike these ones. There's no mention
of dynamic-programming matrices, and there's no hint in the implementations
of something like the 'sum of deviations between classes.' Of course, there
are no comments in any of the ports, so it's hard to tell.

> The lack of interest, the disdain for history is what makes computing not-quite-a-field. - [Alan Kay](http://www.drdobbs.com/architecture-and-design/interview-with-alan-kay/240003442)

**But on the other hand, how could they know?**

![](http://farm9.staticflickr.com/8381/8482577349_809d767117_o.png)

<span class='image-credit'><a href='http://via.me/-9hyi8hu'>Bill Morris</a></span>

George F. Jenks proposed jenks natural breaks in his 1977 article entitled
'Optimal Data Classification for Choropleth Maps'.

This article isn't available online, or in print. As far as I can tell,
it has never been digitized. It's ostensibly still owned by the [University of Kansas Geography Department](http://www.geog.ku.edu/),
so the copy that [Bill Morris](http://www.geosprocket.com/) was kind enough
to scan and share I can't safely post. Even if the university doesn't assert
copyright, because Professor Jenks passed in 1996, it'll be copyrighted in his name until 2072.

Bother your senator today about copyright term limits.

And so we have history in the oddest terms. The idea is lost but the Fortran
code is resurrected in a new language every few years, along with a link
to the last link to the unreachable text.

## Jenks in simple-statistics

I spent a day reading the original text and decoding as much as possible
of the code's intention, so that I could write a 'literate' implementation.
My definition of literate is highly descriptive variable names, detailed and narrative
comments, and straightforward code with no hijinks.

So: yes, this isn't the first implementation of Jenks in Javascript. And it
took me several times longer to do things this way than to just get the code
working.

But the sad and foreboding state of this algorithm's existing implementations
said that to think critically about this code, its result, and possibilities
for improvement, we need at least one version that's clear about what
it's doing.

[simple-statistics](https://github.com/tmcw/simple-statistics), my [library for literate, beginner-friendly statistics](http://macwright.org/2012/06/26/simple-statistics.html),
now has a [literate implementation](http://macwright.org/simple-statistics/docs/simple_statistics.html#section-116) of
Jenks natural breaks. In the process of understanding the implementation,
I found that the matrix system is a sort of [dynamic programming](http://en.wikipedia.org/wiki/Dynamic_programming)
that cleverly solves all breaks from `1-k` when you request `k` breaks.
Thus my implementation breaks it into two parts - creating the matrices
and pulling a solution out of them.

It's in Javascript. A lot of smart geospatial code has been in Python
or C++, with only a recent trend toward JS. I don't see this as mattering
much, since it's a basic mathematical algorithm - not exactly a chance
to use language features. But Javascript is fast, as in, [the V8 engine](https://code.google.com/p/v8/) is fast.
In basic benchmarks, it's [12x faster than a Python implementation](https://gist.github.com/llimllib/4974446).
As [Bill Mill points out](https://twitter.com/llimllib/status/303337147321155584), [PyPy](http://pypy.org/)
is on par with Javascript and there are a [few other tweaks](https://twitter.com/llimllib/status/303316590190006273)
that improve performance, but it's interesting that CPython is so slow
at computationally-heavy, repetitive work.

## Conclusion

Try out Jenks in [simple-statistics](https://github.com/tmcw/simple-statistics).
If the assortment of [other algorithms included](https://github.com/tmcw/simple-statistics/blob/master/API.md)
make you feel like you should create a new 'micro library', you can
also [just use the jenks implementation as a standalone](https://gist.github.com/tmcw/4977508).
Please don't delete the comments: if you need compression, use [uglify-js](https://github.com/mishoo/UglifyJS)
as a separate step.

And so here's a literate implementation of Jenks natural breaks in Javascript.
If you can, please help to improve it by making the implementation more
explanatory.

If you're an academic, take this as a cautionary lesson to
promote the free distribution of your work - if not now, for the future.
If you're a coder, consider whether the abstraction of software can
be misused to mask ignorance of basic principles.
