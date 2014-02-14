---
layout: post
title: Simple Open Data
categories:
- blog
---

<a href='http://simpleopendata.com/'><img src='http://farm3.staticflickr.com/2855/12510583234_2d46d5ec00_h.jpg' class='white-on-white' /></a>

[simpleopendata.com](http://simpleopendata.com/) is a one-page website that gives advice on how to format, publish, and license open data. It's meant to be concrete and straightforward.

Simple Open Data fills a void: concrete, straightforward information. Each element of open data is deep enough to fall into - all of the licenses you can choose, the formats to avoid or adopt, API design, and even linked data and semantic web concerns. Some resources discuss everything in depth, making it seem like even your little department needs to embrace 20 different buzzwords right off the bat. This saps enthusiasm and causes [analysis paralysis](http://en.wikipedia.org/wiki/Analysis_paralysis). Having so many priorities leads to inaction, wasteful planning processes, and often a resort to expensive service contracts.

![](http://farm6.staticflickr.com/5546/12523131583_3b67ccfd81_b.jpg)

So simpleopendata.com is simple. Which means it has a few opinions.

[API](http://en.wikipedia.org/wiki/Application_programming_interface)s are optional. For large datasets that lend themselves to APIs and for organizations that have the resources, they can be beneficial. Elsewhere, hard rules like "APIs for everything" are dangers: they devalue vital incremental steps, like simple downloads. The mistake of 'checking all the boxes' leads too many local governments to buy a license to [Socrata](http://www.socrata.com/) or spend a few weeks setting up [CKAN](http://ckan.org/) when an FTP server would have done just fine, and would actually be superior for bulk downloading data.

The [ODbL](http://opendatacommons.org/licenses/odbl/) license and others with [share-alike](https://en.wikipedia.org/wiki/Share-alike) clauses are not recommended. I've seen firsthand the detrimental effect of untested and broad legal language on potential users.

![](http://farm4.staticflickr.com/3666/12522914103_02371dddb3_b.jpg)

[Linked data](http://linkeddata.org/) and the [semantic web](http://en.wikipedia.org/wiki/Semantic_Web) aren't mentioned. Both are great visions for the future, but the lack of actual implementations, documentation, and tools mean that recommending that datasets are 'linked data' is meaningless in terms of real actions. [JSON-LD](http://manu.sporny.org/2014/json-ld-origins-2/) might change this once adopted - time will tell.

The site embraces the [worse is better](http://www.jwz.org/doc/worse-is-better.html) principle by favoring simple, common formats over shiny new things. [It's an open source, CC0 licensed project](https://github.com/tmcw/simpleopendata), so as open data practices and technologies change, it will too.