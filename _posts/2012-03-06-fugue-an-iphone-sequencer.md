---
layout: post
date: 2012-03-06 10:00:00 UTC
title: Fugue
hn:
categories:
- blog
---

I wrote a sequencer for the iPhone, called Fugue. It's a simple grid-based
synth.

[libcinder](http://libcinder.org/) is the magic behind the scenes - it's a C++
library that makes the experience of writing an iPhone app incredibly similar
to the [Processing environment](http://processing.org/). So, there's a `draw()`
loop and lots of shared state, and it's really just a very pleasant way to
work.
