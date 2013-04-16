---
layout: post
title: A Sunday & An Open DC Code
categories:
- blog
---

<p class='addendum'>
<em>prefix</em>: This is a follow-up to <a href='http://macwright.org/2013/04/04/the-open-code.html'>The Open Code</a>,
which came after a series of posts including <a href='http://macwright.org/2013/02/22/access-ownership.html'>access vs ownership</a>,
<a href='http://macwright.org/2013/02/20/you-cannot-have-the-code.html'>you cannot have the code</a>,
<a href='http://macwright.org/2013/02/14/the-law-is-public-domain.html'>public domain</a>, and more.
<a href='http://sunlightfoundation.com/blog/2013/04/15/what-happens-when-you-open-the-dc-code/'>Eric Mill also wrote
about this hackathon over at the Sunlight Foundation</a>.
</p>

[![DC Code Hackathon](http://farm9.staticflickr.com/8115/8650784032_9fa1294e84_b.jpg)](http://www.flickr.com/photos/tmcw/8650784032/)

This weekend I hosted a meeting at the MapBox offices to hack on the
[newly released, open and downloadable version](http://macwright.org/2013/02/14/the-law-is-public-domain.html) of
the DC Code. The DC Code is all of the [codified laws in DC](http://localhost:4000/2013/02/11/the-code-written.html), and this is the
first time that so-called 'tech types' had the opportunity to actually
grab it, look inside, and see what we can do.

In the past, I've been opposed to hackathons, not only because the
term summons Red Bull, pizza, and premature optimization, but that they
lay bare the problems of the so-called '[do-ocracy](http://www.communitywiki.org/DoOcracy)' -
that contributing is always an equation of ability, communication, and access,
and one that doesn't always work.

We ran [/openlawdc](https://github.com/openlawdc) as an open organization on [GitHub](https://github.com/).
[I hand out access](https://github.com/openlawdc/openlawdc.github.com/issues/1) to anyone
who asks, and everyone is an owner.
This means anyone can contribute to anything in that
space, and people can create new repositories for any reason.
We started with [a big codepad that everyone had access to](http://piratepad.net/ep/pad/view/ro.PxBhfsFjx-S/latest)
and was pre-populated with tasks, questions, and links. Tasks for non-technical
users are incredibly important. [Carl Malamud](http://en.wikipedia.org/wiki/Carl_Malamud),
who was instrumental in [raising public awareness](http://boingboing.net/2013/03/27/municipal-codes-of-dc-free-fo.html)
of this issue and is a leader in understanding how to make closed open,
donated bagels, lox, and more, which was delivered by [Alex Howard](http://radar.oreilly.com/alexh),
who also provided important publicity. Also a massive thanks to
[Ari Greenwood, who wrote about this event](http://www.huffingtonpost.com/2013/04/09/dc-code-hackathon_n_3039271.html)
in Huff Post DC Around Town.

The Council handled this incredibly well: [V. David Zvenyach](https://twitter.com/vdavez)
of the [Office of the General Counsel](http://www.dccouncil.washington.dc.us/offices/office-of-the-general-counsel)
attended, introduced the council's input, and was absolutely key in explaining
both [technical, narrow issues](https://github.com/openlawdc/browser/issues/45)
and much larger ones - he even
[created a new repository to explain one of the largest challenges facing the council](https://github.com/openlawdc/statutes-at-large).

![](http://farm9.staticflickr.com/8245/8649685723_ccd8f7005e_b.jpg)

As a result, **we got a lot done**: [tens of commits](https://github.com/openlawdc/browser/commits/gh-pages) and
[four new contributors](https://github.com/openlawdc/browser/contributors) to the
[browser](https://github.com/openlawdc/browser) project,
a new [home-rule-act](https://github.com/openlawdc/home-rule-act) project
with [three contributors](https://github.com/openlawdc/home-rule-act/graphs/contributors) including
[Josh Tauberer](http://occams.info/) and [Harlan Yu](http://www.cs.princeton.edu/~harlanyu/),
a [legal-dictionary](https://github.com/statedecoded/legal-dictionary) spinoff
of State Decoded by [Waldo Jaquith](http://waldo.jaquith.org/), and
a [DC Code importer branch of State Decoded](https://github.com/krues8dr/statedecoded/tree/dccode)
by [Bill Hunt](http://krues8dr.com/).

Basically, as the saying goes: [rough consensus and running code](http://en.wikipedia.org/wiki/Rough_consensus)

<a href='http://dccode.org/browser/'>
<img src='http://farm9.staticflickr.com/8123/8656300064_812d9d9dca_b.jpg' class='white-on-white' />
</a>

The [code browser project](https://github.com/openlawdc/browser) that I started
to test my parser grew a lot, and shows real potential as an option. But
I'm mainly excited for the code getting into [The State Decoded](http://www.statedecoded.com/) and
about the growth of small, targeted code like Eric Mill's [citation](https://github.com/unitedstates/citation)
project, which detects and links legal citations like `§ 1101-1103`.

### Up Next

Besides 'lots of code' I think there's some more interesting stuff to note here
and to think of as the future.

I've really wanted to push past the kneejerk reactions
of the computer-native to the law and instead make a focus on understanding the
system, eccentricities and all. I think that's happening, and in a really good
way: the things we started working on on Sunday are pragmatic, usable tools
that make specific progress in the law possible. For instance, referencing
older laws isn't just a problem for lawyers, it's a timesuck for lawmakers.
And simple functionalities like printing out longer sections of the Code
are impossible on [LexisNexis's new portal](http://www.lexisnexis.com/hottopics/dccode/)
but eminently doable on [browser](http://dccode.org/browser/).

And even with these tools as a simple alternative to commerical portals, we're
making it abundantly clear: open data lets people make the change they want.
