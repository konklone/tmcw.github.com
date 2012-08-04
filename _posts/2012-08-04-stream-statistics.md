---
layout: post
date: 2012-08-04 10:00:00 UTC
title: Stream Statistics
hn:
categories:
- blog
- releases
---

<img src='/graphics/stream.gif' width='640' height='309' />

[stream-statistics](https://github.com/tmcw/stream-statistics/) is a Javascript library
that implements [online algorithms](http://en.wikipedia.org/wiki/Online_algorithm) for
descriptive statistics.

The idea came about while developing [simple-statistics](http://macwright.org/2012/06/26/simple-statistics.html),
a module I made to understand statistics better. That one takes full datasets,
in many cases, massive arrays of numbers, but there's another approach -
providing data number-by-number to online algorithms via an interface
like [nodejs's streams](http://maxogden.com/node-streams).

To be clear - `stream-statistics` doesn't _require_ nodejs and can run in
browsers (even old ones). When you use it as a module with [npm](https://npmjs.org/),
it tries to align to [nodejs's stream specification](http://nodejs.org/api/stream.html).

That said; 'stream specification' is kind of overstating what node has -
it has no prescriptive docs for how to implement streams, and my experience
with making this 'compliant' has been less than sunny.

Here's a thing you can do with `stream-statistics`

{% highlight js %}
var fs = require('fs'),
    StreamStatistics = require('stream-statistics'),
    byline = require('byline');

var ss = new StreamStatistics();
var stream = byline(fs.createReadStream(__dirname + '/samples.txt'));

// Pipe a stream of newline-separated numbers into stream-statistics
stream.pipe(ss);
stream.on('end', function() {
    assert.equal(ss.max(), 120);
});
{% endhighlight %}

Unlike `simple-statistics`, the algorithms in `stream-statistics`
don't look much like their definitions on Wikipedia - they're made to be quite fast
and usable.

Like `stream-statistics`, it's just one more implementation in a field of
many - [Boost.Accumulators](http://www.boost.org/doc/libs/1_50_0/doc/html/accumulators.html)
is a notably incredible implementation in C++ which I've tinkered with in
terms of [mapnik](http://mapnik.org/). The streaming quantile implementation will
be inspired by the C implementation of [Efficient Computation of Biased Quantiles over Data Streams](http://www.cs.rutgers.edu/~muthu/bquant.pdf)
in [statsite](https://github.com/armon/statsite/) by [Armon Dadgar](http://armondadgar.com/).

To announce this, I wanted to finish either a neat drawing or one of the uber-difficult
algorithms for a more complex statistic. The former won out; implementing
quantiles was stalled for a while. The different, inpenetrable writing
on Wikipedia, MathWorld, R, Mathematica, and elsewhere is a shame, and a ready
example of how math fails to try to be useful in the gap between theory
and pre-baked implementations.

Anyway, when I get more coffee or a pull request, `stream-statistics` will
do cool [quantiles](https://github.com/tmcw/stream-statistics/issues/1) and
[k-means](https://github.com/tmcw/stream-statistics/issues/2) analysis.

Install `stream-statistics` with [npm](http://npmjs.org/) or download
`stream_statistics.js` from GitHub to use it in the browser.

<div class='link-block'>
  <a href='http://github.com/tmcw/stream-statistics'>See stream-statistics on GitHub →</a>
</div>
