---
layout: post
title: Transportation
categories:
- blog
---

A few things about buses and trains.

![](http://farm4.staticflickr.com/3768/9332837950_bfc9a53381_b.jpg)

I live in Washington, DC and travel by bicycle, walking, and mass-transit.
DC's transportation system is great for the limited use I make of it.

DC's mass-transit is run by WMATA, though parts of it connects to
Maryland's MARC and the East-coast Amtrak system.

In recent times, an increasing number of transit agencies have started to
[provide open, realtime data](http://sf.streetsblog.org/2010/01/05/how-google-and-portlands-trimet-set-the-standard-for-open-transit-data/)
on transportation.

WMATA deploys a Java server application and uses [Mashery](http://www.mashery.com/) to
manage API access. In the past, they also contracted with [NextBus](http://www.nextbus.com/)
to augment bus predictions but then [turned out](http://washingtonexaminer.com/popular-metro-nextbus-app-dies-amid-tech-companies-spat/article/2517085#.UOQoieTWKWp)
pretty [poorly](http://greatergreaterwashington.org/post/17386/whats-up-with-nextbus-part-1-the-disappearing-app/) in
a pretty complicated disagreement and split-up.

> Transit agencies are used to being beat up in the press. Public transit has been the underdog since the 1950s and I think it's made the agencies pretty conservative

<span class='image-credit'><a href='https://plus.google.com/109607974528717690308/posts'>Joe Hughes</a></span>

The problem with Mashery is that they have an incentive to keep API limits
low, so that people use their service more and the API less, and so that
they can say they're doing a service by limiting what-would-be too much
traffic to an API, regardless of whether it would be.

Anyway.

## Bus Stops

Washington, DC has a startling number of bus stops - in the view of the
WMATA API, we have 11,316.

<iframe width='640' height='300' frameBorder='0' src='http://a.tiles.mapbox.com/v3/tmcw.all_stops.html#10/38.9081/-77.0087'></iframe>

I started to hack away at the problem by building [wmataapiapi](https://github.com/tmcw/wmataapiapi):
a simple layer that tries to do a v2 API on top of what exists now:
it's faster, supports [CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing),
has no user limits, and transmutes some XML-encoded responses into [JSON](http://www.json.org/)
for simple client-side parsing.

The only thing that it does that's 'interesting' in a way other than improvement
is history, and it doesn't do it perfectly. The testing instance runs
on [Heroku](https://www.heroku.com/), which means it's free and simple to
deploy, but is also liable to shut down when it doesn't get enough requests
to justify it on their infrastructure.

This is a bit of a diversion for me, an excuse to crack open another
encapsulated complexity in life. [Brandon Martin-Anderson](http://bmander.com/),
[Eric Fischer](http://www.flickr.com/people/walkingsf/), and
[David Alpert](http://greatergreaterwashington.org/alpert/) know more and
think more about this kind of thing.

## Bus Supply

[![Daily Bus Supply](http://farm6.staticflickr.com/5464/9507634971_22a17fa8e0_o.png)](http://www.flickr.com/photos/tmcw/9507634971/sizes/o/in/photostream/)

<a href='http://imgur.com/ESPtf1p'><img src='http://i.imgur.com/ESPtf1p.gif' width=640 height=640 /></a>

<span class='image-credit'>buses traveling through the system</span>

There are often almost 400 buses on the roads at one time, but the number is
anything but consistent. Gaps are due to the wmataapiapi instance starting to sleep,
but the falloff at midnight I think is WMATA shutting off tracking.

![](http://farm4.staticflickr.com/3677/9332641770_1477b36aae_b.jpg)

## Arrival Times

<iframe src='http://bl.ocks.org/tmcw/raw/6101423/' width=640 height=200 frameborder='no'></iframe>

Predicted arrival times for buses tend strongly towards on-time, with gradual
falloff in both directions. In both directions there's also a lot of errant
data, with predictions of buses to come in days and weeks, or buses similarly
ahead of time.
