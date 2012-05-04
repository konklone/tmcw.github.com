---
layout: post
date: 2011-10-18 10:00:00 UTC
title: Client-Side Javascript Testing & happen
thumbnail: http://farm5.static.flickr.com/4139/4757334447_5fe1fe25bd_q.jpg
hn: http://news.ycombinator.com/item?id=3125006
categories:
- blog
- release
---

**TL;DR - I wrote a library called [Happen](https://github.com/tmcw/happen)
that makes it easier to use the [createEvent](https://developer.mozilla.org/en/DOM/document.createEvent)
API to do browser tests that actually use events.**

<div class='shutter-300'>
<img src='http://farm5.static.flickr.com/4139/4757334447_5fe1fe25bd_z.jpg' />
</div>

A quick interlude of the land of testing.

For my projects recently, I've been
using [Jasmine](http://pivotal.github.com/jasmine/) for testing [Wax](http://mapbox.com/wax) and
[Modest Maps](http://github.com/stamen/modestmaps-js). <sup>[1](#node)</sup>

But the bugs that started hitting me weren't the bugs I was testing against.
Picky browser bugs as silly as
Internet Explorer's handling of `window.setInterval(function(){}, 0)` weren't
being tested for because all I was testing was the API, not the functioning of the thing.
What I needed was browser events, and I found that there weren't any options
for getting them, so I wrote a very tiny one: Happen.

[Happen](https://github.com/tmcw/happen) lets Wax and Modest Maps do
tests with user events.
That means full-integration tests - not just testing that Modest Maps can figure
out the URLs for tile images. With Happen, I can test that
the browser can successfully move a map,
reposition tiles, and fire events at the proper time when a user mouses down, drags, and mouseups -
and the rest of the things a map should do in response to user input.
And not by rewriting the API or wrapping these things any more - by actually
providing the code with events that work just like normal events, because
they are normal events.

This test is mapping bliss:

{% highlight js %}
it('does not zoom in on single click', function() {
    expect(map.getZoom()).toEqual(0);
    happen.click(map.parent);
    expect(map.getZoom()).toEqual(0);
});

it('zooms in on double click', function() {
    expect(map.getZoom()).toEqual(0);
    happen.dblclick(map.parent);
    expect(map.getZoom()).toEqual(1);
});
{% endhighlight %}

## The How and Why

The magic under the surface is [document.createEvent](https://developer.mozilla.org/en/DOM/document.createEvent)
and the [initEvent](https://developer.mozilla.org/en/DOM/event.initMouseEvent) APIs.
They're rather obtuse: here's part of Happen's abstraction code:

{% highlight js %}
evt.initMouseEvent(o.type,
    true, // canBubble
    true, // cancelable
    window, // 'AbstractView'
    o.clicks || 0, // click count
    o.screenX || 0, // screenX
    o.screenY || 0, // screenY
    o.clientX || 0, // clientX
    o.clientY || 0, // clientY
    o.ctrl || 0, // ctrl
    o.alt || false, // alt
    o.shift || false, // shift
    o.meta || false, // meta
    o.button || false, // mouse button
    null // relatedTarget
);
{% endhighlight %}

## Other Options

[jQuery](http://jquery.com) does have part
of this API: you can call `$('#thing').click()`, but it operates
on a different level, by attempting to find event listeners and then
triggering them: the freeform jQuery event system is super-useful,
but not something that's actually in the DOM - it's very well-orchestrated
magic. What we're creating here are real events with normal bubbling
and normal default behavior.

So far this combo is what works: [Selenium](http://seleniumhq.org/)
is the only alternative I've found that does real-life events, and I
think that it solves the wrong problems: is it really that hard to
initially write tests and run them in browers? That's not a problem for
smaller test suites - the problem is
maintenance and being able to run your tests everywhere, that matters.

So, now I can open up the testing `index.html` in Modest Maps or
Wax and it just works - no need to install tests on a Windows-running
netbook or an iPad. So far it's testing bliss. If you've got client-side
libraries and loove testing, [happen might help you out](https://github.com/tmcw/happen).

* <a name='ie'>[1]</a>: Yes, yes, I know, Internet Explorer.
* <a name='node'>[2]</a>: Other [MapBox](http://mapbox.com) projects like [TileMill](http://mapbox.com/tilemill)
and [Hosting](http://mapbox.com/hosting) use [expresso](https://github.com/visionmedia/expresso)
for testing nodejs code, and it has been great, especially with
[Konstantin's](http://kkaefer.com/) patches.
