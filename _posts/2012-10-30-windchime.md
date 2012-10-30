---
layout: post
title: windchime
hn:
categories:
- blog
- releases
---

[windchime](https://github.com/tmcw/windchime) is
a [generative music](http://en.wikipedia.org/wiki/Generative_music)
system that adds another dimension to the act of composing written text,
whether it be software or English.

<iframe src="http://player.vimeo.com/video/52421539?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;color=ffffff" width="640" height="360" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>

_To be honest, I intended to post this four months ago, and delayed because
I never got the time to make a high level of fit and finish for things. I've
recently pushed it to the level where it's compilable and has a minimal
feature-set but this is still a proof of concept._

It's just a first try at something simple.

Writing code is making guesses and
trying to please a picky machine. What we think of as coding aids,
like testing, debugging tools, and such, pale in comparison to the things
we've tuned out, like being able to see the code being written, and the magic
of [syntax coloring](http://en.wikipedia.org/wiki/Syntax_highlighting).

![](http://farm9.staticflickr.com/8333/8136501700_1736a45e46_c.jpg)

This work was inspired by [color forth](http://www.colorforth.com/), a
computer language in which color has meaning. It was created
because [Chuck Moore](http://en.wikipedia.org/wiki/Charles_H._Moore) was losing
his youthful eyesight, but the implications go much farther - that there can be
meaning in the margins of what we consider to be data.

> Color Forth is putting information in the white space of your source listing - Chuck Moore

An [unmatched parenthesis](http://xkcd.com/859/) is tension unresolved,
and [semicolons](http://inimino.org/~inimino/blog/javascript_semicolons)
in C-like languages and periods in Latin languages are signals of
phrasing.

![](http://farm9.staticflickr.com/8333/8136525699_bdef2bad25_h.jpg)

It's like [word painting](http://en.wikipedia.org/wiki/Word_painting),
a style of music in which the content dictates the presentation
to inform at the edges. The words 'lower, lower, lower'
would be sung, in successively lower notes, essentially using multiple
channels of communication, like we use with facial expressions and speaking
tone normally.

It also comes from the kind of [feelings that Bret Victor has written about](http://worrydream.com/ABriefRantOnTheFutureOfInteractionDesign/)
and what I heard from [Brandon Martin-Anderson](http://bmander.com/)
about whether his bike ever broken on his cross-country ride. He said
yes, it did, but you could always tell what would go wrong far in advance.
He'd hear a tire going flat or feel his chain getting old, buy one at a town,
and fix it when it broke.

In comparison, computers feel like guessing, and making risky decisions with
large consequences almost blindly.

This tries to be [assistive technology](http://en.wikipedia.org/wiki/Assistive_technology)
in the mainstream. Windchime aims to only
represent structure and feeling, to signal when things are right
or wrong or stylistically different. And it's non-lexical -
audio is something that most people already work to, and which
doesn't interrupt trains of thought.

## Technical Details and Audio

I give no thanks to the legions of Objective-C developers out there who don't
share noncritical parts of their code as open source. They're just perpetuating
an [O'Reilly book](http://search.oreilly.com/?q=objective-c&x=0&y=0)-driven slow
progress system based on closed-source hoarding.

The only project that contained a full, working implementation of an OSX app
sending midi to an external source was [the accordion project](http://code.google.com/p/accordion/),
which came up in a random Google search. Without that code example, this project
probably wouldn't have happened.

## Composition

> I really think it is possible that our grandchildren will look at us in wonder
  and say: "You mean you used to listen to exactly the same thing over and
  over again? - [Brian Eno](http://en.wikipedia.org/wiki/Brian_Eno)

A direct mapping of keys to notes would result in a [chromatic instrument](http://en.wikipedia.org/wiki/Chromatic_scale)
that would probably be less than appetizing. Instead, it makes sense to
follow the pattern of other modern instruments like
propellerheads [Figure](http://www.propellerheads.se/products/figure/)
and [Brian Eno](http://en.wikipedia.org/wiki/Brian_Eno)'s
[Bloom](http://ds.io/Ku43Nm) - assigning music to specific,
safe subsets like the [pentatonic scale](http://en.wikipedia.org/wiki/Pentatonic).

[![](http://farm9.staticflickr.com/8336/8138784565_ba354075de_o.png)](http://www.flickr.com/photos/tmcw/8138784565/)

Recently I've added many more options - 16 scales from this [excellently useful post](http://www.lawriecape.co.uk/theblog/index.php/archives/881).
It's interesting to hear which ones work well. As a hack musician myself,
I expected the simpler options like a blues pentatonic scale to fare well,
since a simple instrument like [an appalachian dulcimer](http://en.wikipedia.org/wiki/Appalachian_dulcimer)
tends to use a subset. But in practice, more complex, harmonic and minor
scales seem to sound more natural or correct.

The sound is sometimes quite helpful and pleasing and sometimes frankly
annoying. Since it goes through speakers, there's the problem of volume -
ideally I would want it to be as loud as an old IBM keyboard clicking and
no louder.

## For Now

There's [an open repository](https://github.com/tmcw/windchime) for the code
as it stands - contributions are welcome. I've [posted an early build in binary form](https://github.com/tmcw/windchime/downloads) -
it should work on OSX 10.7+. Let me know what you think [on twitter](https://twitter.com/tmcw)
or [in the GitHub issue tracker](https://github.com/tmcw/windchime/issues).
