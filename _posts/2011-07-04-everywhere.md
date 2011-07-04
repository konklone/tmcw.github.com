---
layout: post
date: 2011-07-04 10:00:00 UTC
title: everythin.gs/here

---

Today I'm for-real launching something that I've been tinkering with for a little while - an application called [everywhere](http://github.com/tmcw/everywhere), that's deployed at [everythin.gs](http://everythin.gs/here/notes) for now. It's a map space, where multiple people can see, play with, and eventually annotate the same places in the world. If you just go to the site, you'll be on the same map as other people who follow the link in this blog post - so, if it seems like a ghost is moving the map, it's actually someone else (or me).

That's all there is so far - in a few nights, I made a version of this application with some really cool bells and whistles that poked at different things that you could use it for, and it actually worked pretty well - but in the past few days, my GitHub commits have consisted of removing those things. Deploying things is difficult, you see, and if the core concept of something fails, then it will rarely succeed with other concepts bolted onto it. Thus, it's pretty bare-bones right now, which means that there's a lot of space to push up some cool new features and talk about the philosophy of those in the future.

## Technology

In comparison to some of the [other projects](http://tilemill.com/) that I've been working on, everywhere is a tiny hack, with little to show for itself. But, it's a cool little hack that'll be bringing in some cool parts of the internet and using them in new ways. It uses:

* [nodejs](http://nodejs.com) to communicate between users
* [socket.io](http://socket.io) to communicate between users
* [express](http://expressjs.com) to serve up some simple web pages
* [Modest Maps](http://github.com/stamen/modestmaps-js) to draw pretty maps
* [Wax](http://github.com/mapbox/wax) to glue MapBox and cool stuff to its maps
* [MapBox](http://mapbox.com) maps (so far)
* [forever](http://github.com/indexzero/forever) to keep things online (as best it can)

But it's pretty naïve in many ways - it's not using crazy optimizations because things are pretty performant with just nodejs and websockets and the like.

## Concepts

There are a few big concepts behind everywhere.

The first is the idea that maps are unique combiners. In a world of highly complex data and people scared to make any statement implying an opinion, we have 'things' attached to 'points' or 'space.' One can have election fraud points, and voting points, draw pretty circles around them, and ask the viewer to make a decision. Their decision is likely to be fraught with all the problems of perception, like a complete inability to estimate areas of circles, but that's a personal problem - the data is technically accurate and plausibly neutral. In this way, treating maps as the holy grail of visualization is both an amazing move towards the wisdom of the individual and a monumental whiffing of any decision-making on the part of the mapmaker.

The second is this weird idea of things on the internet that are only relevant in person: everywhere doesn't have chat functionality, and it's not a high priority. It works best if you're talking to a large bunch of people in a room, create an everywhere room for them, and continue to talk while showing them where and what you're talking about. The app isn't very useful for idly browsing the internet, and huge numbers of people in a room don't really make it much more fun or much better. This is meant to be a part of real life, not an end in itself.

There's a lot more to come, especially in the area of demonstrating what you're talking about and starting to think of maps as canvases for our ideas, rather than ESRI-licensed slide rules.
