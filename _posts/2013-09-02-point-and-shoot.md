---
layout: post
title: Point and Shoot
categories:
  - blog
published: true
---

In order for the internet's major collaborative projects to gain momentum,
they need to reach non-expert users with simpler tools. Realizing this
is a challenge for reasons beyond technology.

In the last few months, I worked on the [iD editor](http://ideditor.com/) project
for [OpenStreetMap](http://www.openstreetmap.org/), a collaborative map.
Editing OpenStreetMap tends to look like this.

<img src='http://farm3.staticflickr.com/2850/9630393054_087048b37f_b.jpg' class='white-on-white' />

This interface could be better, it could be prettier, but this editing tool,
[JOSM](http://josm.openstreetmap.de/), is a perfectly effective option for
advanced users.

<img src='http://farm8.staticflickr.com/7443/9627187431_8992b8d781_b.jpg' class='white-on-white' />

iD is simpler, and in practice we've found that it requires less intensive education and
fewer explanatory [YouTube videos](http://www.youtube.com/watch?v=jRqn-S9maL0).

Launching iD has been an interesting experience<sup><small><a href='#john'>j</a></small></sup>:
in the threads that resulted <sup><small><a href='#threads'>t</a></small></sup>,
the objections centered around potential damage to the map, about the danger
of letting newbies tinker with the community's resource.

> As others posted, I think the trash can icon is far too prominent: three
clicks from the home page and an new contributor's first action with OSM
could be to accidentally delete something! [*](http://lists.openstreetmap.org/pipermail/talk/2013-August/067872.html)

The phenomenon was crystallized when I received a nice note from
[Steven Walling](http://bit.ly/15Trivv) that [pointed out the similarity between
our project and VisualEditor](https://twitter.com/StevenWalling/status/356875662964953088),
a project by the [WikiMedia Foundation](http://wikimediafoundation.org/wiki/Home)
to [simplify editing Wikipedia](http://www.mediawiki.org/wiki/VisualEditor).

And, within a few minutes, a now-deleted tweet from [Gregory Kohs](http://www.mywikibiz.com/Directory:Gregory_J._Kohs)
linking [his article in examiner.com](http://www.examiner.com/article/wikipedia-s-new-editing-software-gets-failing-grade)
about how the editor is - you guessed it, potentially damaging the community's
resource, managed by a sinister for-profit by a character-assassinated project
manager.

## Structural Complexity

It's very difficult to build a safe editor for OpenStreetMap,
just the same as it is to build a safe editor for Wikipedia. OSM
may be 'just roads' and Wikipedia is just text.

But in the struggle to reflect the world's idiosyncracies, the data models
of collaborative projects become twisted, fragile, and subtle in ways that
work counter to the idea of collaboration.

### Relations

In OpenStreetMap, the best example is the idea of a '[relation](http://wiki.openstreetmap.org/wiki/Relation)'. While what
you see on the map is made up of simple points and lines between them
([nodes](http://wiki.openstreetmap.org/wiki/Node) and [ways](http://wiki.openstreetmap.org/wiki/Ways) in the lingo),
relations form an invisible third layer - connecting boundaries, bus routes,
multipolygons, turn restrictions, [themselves, recursively](http://wiki.openstreetmap.org/wiki/Super-Relation),
[and much more](http://wiki.openstreetmap.org/wiki/Types_of_relation).

Relations are non-geometric, non-visual entities with implied meaning
that can be deleted carelessly by users who don't know their existence in the
first place, and to try to explain them to newcomers is, let's say, tough.

### Wiki markup & Templates

The axis of Wikipedia is [wiki markup](https://en.wikipedia.org/wiki/Help:Wiki_markup),
a non-standardized, expansive set of commands that connect pages and declare
styles.

Markup languages are, as a species, divided into dialects - HTML into XHTML and
HTML5, [Markdown](http://daringfireball.net/projects/markdown/) quickly
splintering into extended and GitHub-flavored versions. The difficulty
of representing information means that standards leak at the edges into trades
of compatibility for power.

This happened with Wikitext - a [standardized version called Creole](http://bit.ly/17By6wk)
failed to catch on to Wikipedia itself. And Wikipedia's version has expanded
into relation-like complexity - [interdependent templates](https://en.wikipedia.org/wiki/Help:Template)
form much of the structure of the encyclopedia, and those 'most active editors'
actually spend much of their time refining style and dealing with 'special syntax',
as discovered in [Aaron Swartz's incredible Who Writes Wikipedia?](http://www.aaronsw.com/weblog/whowriteswikipedia).

## Permission and Ability

One of the most interesting parts of explaining OpenStreetMap is answering the
inevitable 'permission' question: can a new user just delete data from the map?

Can _anyone_ really change the map? It's a reasonable expectation coming
from the GIS world obsessed with authenticity, permission, and authority,
to think that some parallel to these values will exist elsewhere, but the truth
is that, in this case, it doesn't. Or, rather, it doesn't directly.

<img src='http://farm6.staticflickr.com/5329/9627077599_7d794680b8_b.jpg' class='white-on-white' />

"You can edit 1 mile around roads you've driven". This is [Waze](http://www.waze.com/)'s
map editing interface.

<img src='http://farm4.staticflickr.com/3763/9627110615_e6c41e3807_b.jpg' class='white-on-white' />

"Your Edit Was Approved". This is [Google Map Maker](http://www.google.com/mapmaker),
with an unimportant change.

<ul>
<li id='john'>All credit to <a href='https://github.com/jfirebaugh'>John Firebaugh</a>
for persisting through waves of critique and the massive work required to make
this a reality.</li>
<li id='threads'><a href='http://lists.openstreetmap.org/pipermail/talk/2013-August/thread.html#67850'>1</a>
<a href='http://lists.openstreetmap.org/pipermail/talk/2013-May/thread.html#66959'>2</a>
</li>
</ul>
