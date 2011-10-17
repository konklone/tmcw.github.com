---
layout: post
date: 2011-08-23 10:00:00 UTC
title: Easey, DND, and Updates
categories: blog
---

<img src='http://farm7.static.flickr.com/6060/5901989395_ab86fb62e2_m.jpg' class='inset-right' />

## Easey

A blog post that was incubating here just hatched over on [Development Seed's blog](http://developmentseed.org/blog/2011/aug/23/easey-smooth-transitions-web-maps). It's about
[easey](http://mapbox.github.com/easey/), a library that adds easing transitions
to [Modest Maps](http://github.com/stamen/modestmaps-js). The cool part architecturally
is that this isn't in Modest Maps core - new version of Modest Maps with my
please-merge-it-soon [transforms-refactor branch](https://github.com/stamen/modestmaps-js/tree/transforms-refactor) use
CSS transitions, getAnimationFrame, and great quantities of hope to make this
kind of stuff super fast and smooth. That said, there's lots of work to be done.

## DND

I'm afraid to talk too much about [D&D](https://github.com/tmcw/dnd), a
drag and drop library that I've been working on, since that'll have people
using it and scary, scary bug reports will result. Regardless, the stunning
observation is that **drag and drop is not a solved problem.**

There's the so-called HTML5 [drag and drop api](http://dev.w3.org/html5/spec/dnd.html).
So-called in that it's one of the new Javascript APIs which was originated by
Internet Explorer and adopted by gullible good browsers, and then ushered into
the HTML5 trend by the W3C. Needless to say, [quirksmode hates on it](http://www.quirksmode.org/js/dragdrop.html).
And that would be fine by me, but it's unsupported on the iPad, and thus
no dice for the application I've been working on. And then there's
jQuery's drag and drop, which works well for desktop, but no good on mobile
anything, and then jQuery mobile, which doesn't provide drag and drop, and then
Sencha touch, which has a licensing scheme and marketing scheme that
manufactures its own FUD. Quick hint for open source projects:
providing a link to a `tar.gz` or a `zip` when you actually have a
[GitHub](http://github.com) repository where everything lives engenders
distrust and confusion amongst your would-be users.

So, [D&D](http://github.com/tmcw/dnd) is a still-buggy project that tries
valiantly to support everything from Internet Explorer 7 to 'good browsers'
to the iPad and eventually Android devices. In doing so it has extracted many,
many Tom-tears. Since the project I'm working on
mainly just needs sorting of lists and drag & drop between them, it has
gone towards stability in that direction - though it will be a generalized
drag and drop library too.
Big props to the [webkit_draggable project](http://www.gotproject.com/blog/post2.html)
on which it is based.

## Toastmasters

Though I'll mainly [just point to my friend Sarah Ruth over at Più vino](http://piuvino.blogspot.com/2011/08/toast-masters.html)
who has far better blogging skills, my trusty old camera's last jaunt was a peculiar
party in my friends gave toasts on their choice of subject matter.

<div class='shutter-300'>
<img src='http://farm7.static.flickr.com/6081/6063838497_48b31d7099_z.jpg'>
</div>

<div class='shutter-300'>
<img src='http://farm7.static.flickr.com/6070/6070400772_d52f2a87e3_z.jpg'>
</div>

<div class='shutter-300'>
<img src='http://farm7.static.flickr.com/6061/6063839631_34d0cc729a_z.jpg'>
</div>

[The full set's over at Flickr](http://www.flickr.com/photos/tmcw/sets/72157627356666197/with/6069868633/).

(sidenote: if anyone has Flickr alternatives they'd like to share, let me know!
Also, if you're interested in buying a gently-used, well-aged Canon Rebel XT.)
