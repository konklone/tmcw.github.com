---
layout: post
title: "On How We Lose The Reasons Why Code Works"
categories:
- blog
---

Consider Jenks Natural Breaks.

It's a way to cut up data values into discrete categories. For instance,
a choropleth map of poverty rates will have breaks at different levels,
and the Jenks algorithm finds bins that break up the data so that the map
looks nice and the gradation of poverty is clear.

Jenks is popular. It's in ArcGIS, QGIS, and lots of other tools for maps
and statistics. It's in university lectures and textbooks.

When you use Jenks natural breaks, you use an implementation. Here's
[one in Javascript](https://github.com/simogeo/geostats),
[one in Python](https://gist.github.com/drewda/1299198),
and [in Java and Fortran](https://stat.ethz.ch/pipermail/r-sig-geo/2006-March/000811.html).

Notice something? They're all ports of each other. In each programming
language, the variables are named the same thing, the loops and structure
are the same. They refer to each other in source comments.

They also generally refer to the 1977 paper by George F. Jenks entitled
'Optimal Data Classification for Choropleth Maps'.

As far as I can tell, few people who has written an implementation recently
have read this paper. It's not available
online and probably isn't even digitized. It's not on Amazon
or any other book portal - it's out of print, and had only been printed
in a short run.

Distributing copies isn't legal: Professor Jenks sadly
passed in 1996 and the default copyright term will expire in 2072.

We have history in the oddest terms. The idea is lost but the Fortran
code is resurrected in a new language every few years, along with a link
to the last link to the unreachable text.

For users of Jenks, it's business as usual: it works.

But we should start thinking harder and looking deeper, and making sure that
we write and preserve knowledge, not only functionality.

## And So

Kudos to [David Drake's PHP implementation, which is somewhat
literate and documented](https://github.com/randomdrake/jenks).

### See Also

* [On Grouping for Maximum Homogenity](http://www.csiss.org/SPACE/workshops/2004/SAC/files/fisher.pdf)
