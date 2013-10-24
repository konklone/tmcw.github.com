---
layout: post
title: A Literate Raytracer
categories:
  - blog
published: true
---

Ray tracing is a relatively simple way to render images of 3D objects. The core
is an elegant idea, that one can simulate the real-world behavior of photons
of light bouncing off of surfaces and colors accumulating from their paths.
It's not inherently fast, but the simplicity of the core lets it model interesting
things like reflections and depth of field in ways that mirror natural processes.

This happens to be a popular subject for education: implementing it requires
a student to understand vector math, fast code, and even recursion. The carrot
on the stick - a pretty image - also creates some natural motivation, since
everyone loves to to make pretty things.


