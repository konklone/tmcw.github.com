---
layout: post
title: Open Source Projects, A Year On
categories:
- blog
---

<img src='http://farm8.staticflickr.com/7013/6428635179_7f261c4993_b.jpg' width='640' height='412' />

This is about the projects that
I've made outside of work, that live in my [tmcw account](http://github.com/tmcw).
Work projects live in the [mapbox](http://github.com/mapbox)
account and have more contributors and more followers in general.

I expect the majority of my projects to fail, and they do.
As a rule, off-time projects are entirely open-source, and
[ship early and often](http://ma.tt/2010/11/one-point-oh/). There
are certainly [those who disagree](https://plus.google.com/111465598045192916635/posts/CkmmbjmvebM),
with this sentiment, but it's a sort of personal preference at the end
of the day.

## Big

[Big](https://github.com/tmcw/big) was announced [2011/10/28](http://macwright.org/2011/10/28/big.html),
348 days ago. Since release, [Brian Campbell](https://github.com/lambda)
contributed better history management, [mdznr](https://github.com/mdznr/big)
created a fork that uses Markdown, golden ratios and some other stuff.
[Jed Schmidt made weenote](https://github.com/jed/weenote), which looks great
and is arguably even more [code-golfy](http://codegolf.com/).

## Statistics

[simple-statistics](https://github.com/tmcw/simple-statistics) was introduced
[2012/06/26](http://macwright.org/2012/06/26/simple-statistics.html), 105
days ago. [jthomm](https://github.com/jthomm) and [Matt Sacks](https://github.com/mattsa)
contributed bugfixes and features, including support for the
[student's t-test](http://en.wikipedia.org/wiki/Student's_t-test).
It now has 69 stars on GitHub but no [dependents on npm](https://npmjs.org/package/simple-statistics).

[stream-statistics](http://github.com/tmcw/stream-statistics) was introduced
[2012/08/04](http://macwright.org/2012/08/04/stream-statistics.html), 44 days ago,
and doesn't currently have any contributors or dependents on npm.

## Happen

[Happen](http://macwright.org/2011/10/18/adventures-in-testing.html) was
announced [2011/10/18](2011/10/18](http://macwright.org/2011/10/18/adventures-in-testing.html),
358 days ago, and has gained keyboard event support thanks to
[Matt Tortolani](https://github.com/doodlemoonch). I've also added tests
and bugfixes for new corner cases. 20 people follow the project and it's
used by [Modest Maps](http://modestmaps.com/) for testing.

## Minute & Heard

I put these two in the same bin since they're OSX apps. [minute-agent](https://github.com/tmcw/minute-agent)
and [heard](https://github.com/tmcw/heard) have 10-20 GitHub watchers
and (as far as I can determine from word of mouth) a few users.

So far they haven't had any contributors. Which is fine with me; I find these
to be really important projects because of nothing more than the scarcity
of open-source Objective-C. Just having the source for minute around
when I was writing heard cut development time in half, and I honestly
think they might do the same for another developer.

## Abandoned

[Heckle](http://macwright.org/2011/08/19/heckle.html) didn't catch on, and
so didn't [DND](http://macwright.org/2011/08/23/easey-dnd-party.html) (phew,
I would hate maintaining a drag and drop library for IE). [node-fresh](http://macwright.org/2012/04/17/node-fresh.html)
also quickly deadpooled.

## Lessons Learned

Having a great `README.md` is key to making concepts concrete: it should
explain the project in full, with no website or blog post to necessarily back it up.
It's also vital to have `LICENSE` from day one, and I've found no reason
not to go [BSD](http://en.wikipedia.org/wiki/BSD_licenses) for everything.

In a lot of senses, it's easier not to innovate; it's easier to talk about
Big, which is a competitor to [deck.js](http://imakewebthings.com/deck.js/),
than it is to talk about [happen](https://github.com/tmcw/happen), which
does a rare thing and has no known predators.

The impact of testing on usage isn't super-clear. The [Travis-CI](https://travis-ci.org/#!/tmcw/simple-statistics)
badge looks great and provides some sort of stamp of approval, but
its false negatives are irritating and untested projects like Big seem to
succeed in their own right.

[GitHub](https://github.com/) is [Rome](http://www.holovaty.com/writing/django-github/)
for software, but not for communications; you need to run communications from
Twitter and ideally a website in order to make things accessible and clear.
This is a part of software development has been one of the most unusual;
you can't really be silent. People do not spontaneously find out about things:
big MapBox projects have been open on GitHub for weeks with no attention until they become big
news with a blog post.

## Why?

Because writing software takes time and effort. As a rule, all software
I write outside of work is free & open source, but it isn't free to generate -
it's time that could be spent doing other things. And on the other side,
it's import that it has value, which is basically the aggregate of its usage
and all of the things that means.

For now, there are about 30 ideas in my 'secret plans'
[Notational Velocity](http://notational.net/) note waiting to happen.
