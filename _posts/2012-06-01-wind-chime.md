---
layout: post
date: 2012-06-01 10:00:00 UTC
title: Wind Chime
hn:
categories:
- blog
- releases
---

Wind Chime is a [generative music](http://en.wikipedia.org/wiki/Generative_music)
system that adds another dimension to the act of composing written text,
whether it be software or English.

It's just a first try at something simple. Writing code is making guesses and
trying to please a picky machine. What we think of as coding aids,
like testing, debugging tools, and such, pale in comparison to the things
we've tuned out, like being able to see the code being written, and the magic
of [syntax coloring](http://en.wikipedia.org/wiki/Syntax_highlighting).

This work was inspired by [color forth](http://www.colorforth.com/), a truly
different language in which color has syntactical meaning. It was created mainly
because [Chuck Moore](http://en.wikipedia.org/wiki/Charles_H._Moore) was losing
his youthful eyesight, but the implications go much farther - that there can be
meaning in the margins of what we consider to be 'data'.

> Color Forth is putting information in the white space of your source listing - Chuck Moore

An [unmatched parenthesis](http://xkcd.com/859/) is tension unresolved,
while [semicolons](http://inimino.org/~inimino/blog/javascript_semicolons)
in C-like languages and periods in Latin languages are signs of
pacing or phrasing.

This is somewhat inspired by [word painting](http://en.wikipedia.org/wiki/Word_painting):
a style of music in which the content dictates the presentation
to an often hilarious level. The words 'lower, lower, lower'
would be sung, as you'd expect, in successively lower notes.

But it has potential. The age-old problem of [assistive technology](http://en.wikipedia.org/wiki/Assistive_technology)
in the mainstream, including for people without disability,
is that it has followed the traditional path of presenting text -
the only option is to read the text aloud. Wind chime aims to only
represent structure and feeling, to signal when things are right
or wrong or stylistically different. And it's non-lexical -
audio is something that most people already work to, and which
doesn't interrupt trains of thought.

## Audio Output

I give no thanks to the legions of Objective-C developers out there who don't
share noncritical parts of their code as open source. They're just perpetuating
an [O'Reilly book](http://search.oreilly.com/?q=objective-c&x=0&y=0)-driven slow
progress system based on closed-source hoarding.

The only project that contained a full, working implementation of an OSX app
sending midi to an external source was [the accordion project](http://code.google.com/p/accordion/),
which came up in a random Google search. Without that code example, this project
probably wouldn't have happened.

I wish I could have looked inside of the workings of [impromptu](http://impromptu.moso.com.au/),
but that part of the code was closed, and not accessible in the open-source
[extempore project](https://github.com/digego/extempore).

## Composition

> I really think it is possible that our grandchildren will look at us in wonder and say: "You mean you used to listen to exactly the same thing over and over again? - [Brian Eno](http://en.wikipedia.org/wiki/Brian_Eno)

A direct mapping of keys to notes would result in a [chromatic instrument](http://en.wikipedia.org/wiki/Chromatic_scale)
that would probably be less than appetizing. Instead, it makes sense to
follow the pattern of other modern instruments like
propellerheads [Figure](http://www.propellerheads.se/products/figure/)
and [Brian Eno](http://en.wikipedia.org/wiki/Brian_Eno)'s
[Bloom](http://ds.io/Ku43Nm) - assigning music to specific,
safe subsets like the [pentatonic scale](http://en.wikipedia.org/wiki/Pentatonic).
