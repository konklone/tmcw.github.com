---
layout: post
title: Transportation
categories:
- blog
---

![](http://farm4.staticflickr.com/3677/9332641770_1477b36aae_b.jpg)

Transportation data and logic is a fascinating little corner of the internet.

Recently I worked on a few [dashboards for MapBox](http://www.mapbox.com/blog/dashboards-for-data/),
one of which included [WMATA](http://www.wmata.com/) bus and train predictions
as a big 39" display in the office.

While the other displays, which included information from [PagerDuty](http://www.pagerduty.com/),
[Tender App](http://tenderapp.com/), [Dark Sky](http://darkskyapp.com/),
and a handful of other services we use to monitor [MapBox](http://www.mapbox.com/)'s
variable swarm of 10-30 [Amazon EC2](http://aws.amazon.com/ec2/)s, support queue,
and so on, one breaks every day: WMATA's bus predictions.

Most US cities have developer APIs for their mass-transit services.
WMATA deploys a Java app and uses [Mashery](http://www.mashery.com/) to
'manage' API access. In the past, they also contracted with [NextBus](http://www.nextbus.com/)
to augment bus predictions but then [turned out](http://washingtonexaminer.com/popular-metro-nextbus-app-dies-amid-tech-companies-spat/article/2517085#.UOQoieTWKWp)
pretty [poorly](http://greatergreaterwashington.org/post/17386/whats-up-with-nextbus-part-1-the-disappearing-app/) in
a pretty complicated disagreement and split-up.

![](http://farm4.staticflickr.com/3768/9332837950_bfc9a53381_b.jpg)
