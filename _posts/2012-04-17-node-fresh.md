---
layout: post
date: 2012-04-17 10:00:00 UTC
title: node-fresh
hn:
thumbnail: http://farm8.staticflickr.com/7228/6996488660_84f6ca7c85_q.jpg
categories:
- blog
---

![](/graphics/node_fresh.png)

[node-fresh](https://github.com/tmcw/node-fresh) is a tiny, simple solution
to the age-old problem of laboriously refreshing a browser page every time
you tweak a simple static site.

{% highlight sh %}
~/Sites/tmcw.github.com⇾ fresh .
add to your page:

	<script src="http://127.0.0.1:1337/"></script>

watching for changes in 1 directories...
{% endhighlight %}

It was spurred on by a recent [Project it Yourself](http://macwright.org/projectityourself/)
redesign - I noticed that [LiveReload](http://livereload.com/)
had acquired features and was now distributed on the mac store,
and felt like the parts that I wanted were easy to build.

Install it with:

{% highlight sh %}
npm install -g node-fresh
{% endhighlight %}

And it was simple: `node-fresh` is dependency-free, and around 30 sloc. It provides
a single binary, `fresh`, that you give a list of directories to as arguments.
