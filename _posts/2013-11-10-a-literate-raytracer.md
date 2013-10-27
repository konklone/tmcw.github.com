---
layout: post
title: A Literate Raytracer
categories:
  - blog
published: true
---

![](http://farm4.staticflickr.com/3781/10524236814_8fcbe98e4e_h.jpg)

[Literate ray tracer is a simple implementation of raytracing in JavaScript](http://macwright.org/literate-raytracer/)
in the [literate programming](http://en.wikipedia.org/wiki/Literate_programming)
style. It aims to fuse the mathematical explanation of the algorithm with
an actual implementation, shunning any undocumented or unexplained corners.

Ideally after reading it, you not only have some idea how it works, but also
have some creative thoughts about new things that could be built with the same
concepts.

[Ray tracing](http://en.wikipedia.org/wiki/Ray_tracing_(graphics) is a beautifully
simple way to draw 3D scenes from the ground up, using just math. Unlike
WebGL, you can write the whole thing in any simple language, like JavaScript or
Python.

Ray tracing isn't great for realtime graphics, but I think it's incredibly
effective for learning, and a great basis for creative rendering techniques.

![](http://farm3.staticflickr.com/2851/10524788334_b3b0d58e16_h.jpg)

Unfortunately it's not easy to learn ray tracing, and for mostly silly
reasons. There's a near-total lack of commented, explained,
simple ray tracers to learn from. Prior work skews either to barely-finished
homework assignments or intimidating industrial-strength
research projects.

It will need more work to be totally straightforward - writing code in this
fashion - so that it works in a linear explanation and there are no undocumented
mysteries - is a significant challenge and I've done it in parallel to actually
learning the concepts. If you can help clarify the implementation, or point
out potential stumbling blocks, [head over to the open source project.](https://github.com/tmcw/literate-raytracer),
