---
layout: post
title: Point and Shoot
categories:
  - blog
published: true
---

This is about the function of difficulty in collaborative communities.

![](http://farm4.staticflickr.com/3830/10290614074_4263d6cbde_b.jpg)

A little while ago I worked on a project called [iD](http://ideditor.com/),
a bit of software that tries to make a big open data project called
[OpenStreetMap](http://www.openstreetmap.org/) easier to contribute to.

<img src='http://farm3.staticflickr.com/2850/9630393054_087048b37f_b.jpg' class='white-on-white' />

Existing tools were intimidating and built for the computer literate - new users
exposed to raw data models and complex traditions were often lost at the start.

<img src='http://farm8.staticflickr.com/7443/9627187431_8992b8d781_b.jpg' class='white-on-white' />

What we built is arguably friendlier and simpler, despite some quirks and bugs
at the outset.

## Newbies

What we encountered in the process of 'launching iD' - making it the default
editor for when people click 'edit' on the website - was interesting, because
much of the feedback was not technical, but reflected a certain fear of open
doors.

![](http://farm6.staticflickr.com/5442/10279093184_e49ca59e1b_b.jpg)

> As others posted, I think the trash can icon is far too prominent: three
clicks from the home page and an new contributor's first action with OSM
could be to accidentally delete something! [*](http://lists.openstreetmap.org/pipermail/talk/2013-August/067872.html)

-

> As long as the delete function is that prominent it is not an editor for
newcomers. Please, do make it easier to use existing objects and do not
lead the user to delete and then create a new object. [*](https://lists.openstreetmap.org/pipermail/talk/2013-August/067854.html)

## VisualEditor

<img src='http://farm3.staticflickr.com/2858/10279271506_5d4e4e2a2c_c.jpg' class='white-on-white' />

> [@stevenwalling](https://twitter.com/StevenWalling): [@tmcw](https://twitter.com/tmcw)
  I see a ton of parallels btwn what you're doing and what we're doing [@Wikimedia](https://twitter.com/Wikimedia) with VisualEditor and educating new Wikipedians.

A little while later, I received a note from
[Steven Walling](http://bit.ly/15Trivv) that [pointed out the similarity between
our project and VisualEditor](https://twitter.com/StevenWalling/status/356875662964953088),
a project by the [WikiMedia Foundation](http://wikimediafoundation.org/wiki/Home)
to [simplify editing Wikipedia](http://www.mediawiki.org/wiki/VisualEditor).

<img src='http://farm6.staticflickr.com/5464/9666530668_26fbd1d4cc_b.jpg' class='white-on-white' />

[Real-life feedback](https://en.wikipedia.org/wiki/Wikipedia:VisualEditor/Feedback#Good_for_vandalism) on the VisualEditor project.

And, within a few minutes, a now-deleted tweet from [Gregory Kohs](http://www.mywikibiz.com/Directory:Gregory_J._Kohs)
linked up [his article in examiner.com](http://www.examiner.com/article/wikipedia-s-new-editing-software-gets-failing-grade)
about how the editor is potentially damaging the community's
resource, because it makes it too easy for new users to make changes.

## Structural Complexity

It's very difficult to build a safe editor for OpenStreetMap,
just the same as it is to build a safe editor for Wikipedia. OSM
may be 'just roads' and Wikipedia is just text.

But in the struggle to reflect the world's idiosyncracies, the data models
of collaborative projects become twisted, fragile, and subtle in ways that
work counter to the idea of collaboration.

Without eliminating these fault lines or having systems around them to prevent
collapse, the community becomes paranoid about the damage that some unindoctrinated
newcomer might bring on their first day of playing.

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

## Community Good vs Community

The implication is that, as open data communities grow, the 'product' becomes
larger and more complex - Wikipedia covers most topics you can think of and
OpenStreetMap has billions of objects and thousands of high-profile users.

And the fragility of the project and the openness of the project mix: OSM
has almost no permissions model, while Wikipedia has a few levels - nothing
in comparison to the finely-tuned hierarchies of commercial sites, like
Foursquare's [Superuser](https://en.wikipedia.org/wiki/Foursquare#Superuser_status) statuses.

On the other side:

<img src='http://farm6.staticflickr.com/5329/9627077599_7d794680b8_b.jpg' class='white-on-white' />

"You can edit 1 mile around roads you've driven". This is [Waze](http://www.waze.com/)'s
map editing interface.

<img src='http://farm4.staticflickr.com/3763/9627110615_e6c41e3807_b.jpg' class='white-on-white' />

"Your Edit Was Approved". This is [Google Map Maker](http://www.google.com/mapmaker),
with an unimportant change.

These 'access controls' look corporate and un-free from the other side, but
in a way they are an explicit way to make sure that users have only as much
power as they have knowledge and experience. It's an explicit implementation
of the implicit partitioning that Wikipedia & OSM have with technical learning
curves.

## Which Is To Say

The annoying entry restrictions to open data projects and communities in general
are not just technical, but community constructions. Changing them changes
the community in a way that affects culture and content on every level.

For existing projects, this is going to be a struggle - the diversity of opinion,
education, and intention that already causes mile-long flamewars is
just a fraction of a true worldwide sample.

And going forward, it's important to consider how every technical choice
will have a cultural effect, whether good or bad. Just like
[Linus chooses C to keep people out](http://harmful.cat-v.org/software/c++/linus),
what can we choose to bring people in?
