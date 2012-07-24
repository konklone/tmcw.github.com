---
layout: post
date: 2012-07-24 10:00:00 UTC
title: "Stream Statistics"
hn:
categories:
- blog
- releases
---

[stream-statistics](https://github.com/tmcw/stream-statistics/) is a Javascript library
that implements [online algorithms](http://en.wikipedia.org/wiki/Online_algorithm) for
descriptive statistics.

The idea came about while developing [simple-statistics](http://macwright.org/2012/06/26/simple-statistics.html),
a module I made to understand statistics better. Though it takes full datasets -
in many cases, massive arrays of numbers - I realized that many of the things
it does could be done done on streams, like [nodejs's stream specification](http://nodejs.org/api/stream.html).

Unlike `simple-statistics`, the datastructures & algorithms in `stream-statistics`
don't look much like their definitions on Wikipedia - they're made to be quite fast
and usable. Like `stream-statistics`, it's just one more implementation in a field of
many - [Boost.Accumulators](http://www.boost.org/doc/libs/1_50_0/doc/html/accumulators.html)
is a notably incredible implementation in C++ which I've tinkered with in
terms of [mapnik](http://mapnik.org/).

Install `stream-statistics` with [npm](http://npmjs.org/) or download
`stream_statistics.js` from GitHub to use it in the browser.

<div class='link-block'>
  <a href='http://github.com/tmcw/stream-statistics'>See stream-statistics on GitHub →</a>
</div>
