---
layout: post
date: 2012-06-26 10:00:00 UTC
title: "Simple Statistics"
hn:
categories:
- blog
- releases
---

[simple-statistics](https://github.com/tmcw/simple-statistics/) is a Javascript library
I wrote to understand statistics better. It's useful as a [node](http://nodejs.org/)
module as well as in the browser with visualization frameworks like
[d3](http://d3js.org/).

<img src='http://farm8.staticflickr.com/7108/7436872376_4e2fd4e5a2_z.jpg' title='Simple Statistics' height='225' width='640' />

Here are some of the kinds of things you can do:

{% highlight js %}
// Find the mean (average) of a set of numbers. This
// takes an array of numbers
var mean = ss.mean([1, 2, 3]);

// The variance of numbers is the sum of the squared
// differences between numbers and the mean of the list.
var variance = ss.variance([1, 2, 3]);

// Create a linear regression based on a dataset of
// two-dimensional arrays. This returns a new function
// that you can call for the value of the line at
// each X value.
var linear_regression_line = ss.linear_regression()
    .data([[0, 1], [2, 2], [3, 3]]).line();

linear_regression_line(5);

// The r-squared function can be given a dataset just
// like linear regressions, and it'll tell you roughly how
// close the linear regression comes to actually estimating
// the data.
var r_squared = ss.r_squared([[1, 2]], linear_regression_line);
{% endhighlight %}

As you can see, it does a bit of [descriptive statistics](http://en.wikipedia.org/wiki/Descriptive_statistics)
as well as [statistical inference](http://en.wikipedia.org/wiki/Statistical_inference),
and there's even some code for a bayesian classifier in there.

Libraries like [science.js](https://github.com/jasondavies/science.js/),
[R](http://www.r-project.org/), and
[descriptive-statistics](https://github.com/FGRibreau/descriptive_statistics)
are written by smarter people and are probably more performant and shiny.
The point of `simple-statistics` is that it's simple, accessible,
and aims to be as low on concept as possible.

Or, in other terms,
unlike `descriptive-statistics`, it doesn't change built-in prototypes,
unlike `science.js`, it has comments and multi-character variable names,
and unlike R, it's approachable.

Install `simple-statistics` with [npm](http://npmjs.org/) or download
`simple_statistics.js` from GitHub to use it in the browser.

<div class='link-block'>
  <a href='http://github.com/tmcw/simple-statistics'>See simple-statistics on GitHub →</a>
</div>
