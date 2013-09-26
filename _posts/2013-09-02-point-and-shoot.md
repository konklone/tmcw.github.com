---
layout: post
title: Point and Shoot
categories:
  - blog
published: true
---

Accessibility is a subtle and complex attribute of technology.

On first glance, ease of use is simply positive. When email became easy to use,
it started to reach grandmothers and public servants, not just programmers
and scientists.

The expansion of a userbase, what some might call 'empowerment', isn't simple.

That is to say, technological hurdles can be intentional, acting as a filter
preserving social and demographic aspects of a community.

## OpenStreetMap & iD

In the last few months, a team at MapBox worked on a new editor for
[OpenStreetMap](http://www.openstreetmap.org/). OpenStreetMap is a Wikipedia-like
project that has constructed a map of the world with the help of volunteers.
And an 'editor' like iD is a tool that enables members of that community to
do things like draw roads and houses, or add detail to nearby stores.

OSM already has quite a few options for that kind of tool, but all lacked
a level of friendliness on par with modern software.

<img src='http://farm3.staticflickr.com/2850/9630393054_087048b37f_b.jpg' class='white-on-white' />

Here's [JOSM](http://josm.openstreetmap.de/), the preferred power-tool for editing
OSM. My configuration is rather pared down.

<img src='http://farm8.staticflickr.com/7443/9627187431_8992b8d781_b.jpg' class='white-on-white' />

iD is simpler, and in practice we've found that it requires less intensive education and
fewer explanatory [YouTube videos](http://www.youtube.com/watch?v=jRqn-S9maL0).

## The Launch

And so we built iD, and got it pretty much ready to launch - we posted notes
<sup><small><a href='#john'>j</a></small></sup>
<sup><small><a href='#threads'>t</a></small></sup>
to the OSM community and listened to what they had to say.

While conversations veered into tangents and filled inboxes,
two concerns emerged:

1. Will this software hurt the map?
2. What will 'newbies' do?

Both are interesting and surprisingly general.

## Software Meets Community Resource

Like Wikipedia in its early days, there are few restrictions on what a
newcomer can do to OSM's database. Someone can sign up and delete all the houses
in a city, or draw a heart in the ocean - and people do, but it's usually noticed
and undone by a more experienced, mature person.

But the potential for damaging the map is more complex than simple vandalism:
the fear is that software doesn't know the full extent of how OpenStreetMap
works, and will unknowingly corrupt data.

> As others posted, I think the trash can icon is far too prominent: three
clicks from the home page and an new contributor's first action with OSM
could be to accidentally delete something! [*](http://lists.openstreetmap.org/pipermail/talk/2013-August/067872.html)

## VisualEditor

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

## Expectations and Trust

<img src='http://farm6.staticflickr.com/5464/9666530668_26fbd1d4cc_b.jpg' class='white-on-white' />

[Real-life feedback](https://en.wikipedia.org/wiki/Wikipedia:VisualEditor/Feedback#Good_for_vandalism) on the VisualEditor project.

## Controls

<img src='http://farm6.staticflickr.com/5329/9627077599_7d794680b8_b.jpg' class='white-on-white' />

"You can edit 1 mile around roads you've driven". This is [Waze](http://www.waze.com/)'s
map editing interface.

<img src='http://farm4.staticflickr.com/3763/9627110615_e6c41e3807_b.jpg' class='white-on-white' />

"Your Edit Was Approved". This is [Google Map Maker](http://www.google.com/mapmaker),
with an unimportant change.

## Footnotes

<ul>
<li id='john'>All credit to <a href='https://github.com/jfirebaugh'>John Firebaugh</a>
for persisting through waves of critique and the massive work required to make
this a reality.</li>
<li id='threads'><a href='http://lists.openstreetmap.org/pipermail/talk/2013-August/thread.html#67850'>1</a>
<a href='http://lists.openstreetmap.org/pipermail/talk/2013-May/thread.html#66959'>2</a>
</li>
</ul>
