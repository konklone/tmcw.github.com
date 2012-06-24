---
layout: post
date: 2012-06-25 10:00:00 UTC
title: Simple Statistics
categories:
- blog
---

[simple-statistics](https://github.com/tmcw/simple-statistics/) is a Javascript library
I wrote to understand statistics better. It's useful as a [node](http://nodejs.org/)
module as well as in the browser, in combination with visualization frameworks like
[d3js](http://d3js.org/).

Here are some of the kinds of things you can do:

{% beginhighlight %}
var mean = ss.mean([1, 2, 3]);
var variance = ss.variance([1, 2, 3]);

var linear_regression_line = ss.linear_regression().data([[0, 1], [2, 2], [3, 3]]).line();
linear_regression_line(5);

var r_squared = ss.r_squared([[1, 2]], linear_regression_line);
{% endhighlight %}

I have more to say about the role of statistics in work and the current
state of statistics, but this is just about this little chunk of code.

This isn't the only game in town: code like [science.js](https://github.com/jasondavies/science.js/),
[R](http://www.r-project.org/), and [descriptive-statistics](https://github.com/FGRibreau/descriptive_statistics)
are written by smarter people and probably more performant. The point of simple-statistics
is that it is simple and wants to be accessible, if you want to compare it to other things,
heed the words of _why:

> caller asks, should i use hpricot or nokogiri if youre NOT me use nokogiri. and if youre me well cut it out, stop being me.
