---
layout: post
title: A Literate Raytracer
categories:
  - blog
published: true
---

**Raytracing** is a relatively simple way to render images of 3D objects. The core is an elegant idea, that one can simulate the real-world behavior of photons of light bouncing off of surfaces and colors accumulating from their paths. It's not inherently fast, but the simplicity of the core lets it model interesting things like reflections and depth of field in ways that mirror natural processes.

## CS 301: Raytracing

This happens to be a popular subject for education: implementing a raytracer requires a student to understand vector math, fast code, and even recursion. The reward is a pretty image - more compelling than the blasé debug output that students get from most assignments.

But it's still hard to learn: explanations are written either in the language of mathematics or programming, and rarely connect all the dots. Raytracer implementations tend to extremes: one [fits on a business card](http://fabiensanglard.net/rayTracing_back_of_business_card/), another [supports nearly every potential feature](http://www.povray.org/), and most of the rest are [homework assignments](https://github.com/search?q=raytracer+cs&ref=cmdform), implemented just enough to run, never enough to have comments and documentation.

## Literate Raytracer

[Literate raytracer](https://github.com/tmcw/literate-raytracer) is a simple implementation of raytracing in Javascript. It's [made to be read as a narrative](http://macwright.org/literate-raytracer/), and intends to [explain vector operations](http://macwright.org/literate-raytracer/vector.html) as well.