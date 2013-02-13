---
layout: post
title: How the Law is Compiled in Washington DC
categories:
- blog
---

Part two: read [How the Law is Written and Passed in Washington DC](http://macwright.org/2013/02/11/the-code-written.html).

A 'bill' is a document that adds, removes, and changes laws.

The 'law', like the DC Code, is a compiled document constantly being changed
by bills.

A bill, for instance, could contain the provision

> Sec. 2. Section 107 of the Inclusionary Zoning
> Implementation Amendment Act of 2006, effective
> March 14, 2007 (D.C. Law 16-275; D.C.
> Official Code § 6-1041.07), is
> amended by adding a new subsection c to read as follows:


> c(1) No later than February 6, 2009, the Mayor,
> pursuant to Title I of the District of
> Columbia Administrative Procedure Act...

In programming terms, a bill is a [changeset](http://bit.ly/dGc5LL). Or
it's like track changes in Microsoft Word.
That is, bills _aren't new versions of the law_, but rather _instructions you can follow to create new versions_.

## A Bill

Here's how the process works for Washington, DC.

The DC Council discusses and edits bills in Microsoft Word or WordPerfect format.
They're emailed around, collected and edited just like any other document.

When bills are passed, staffers add them to the
[Law Information Management System](http://dcclims1.dccouncil.us/lims/),
a .NET web application that stores and serves metadata and PDF downloads
of resolutions, bills, and more. Here's an [example of a ceremonial resolution](http://bit.ly/14O6B1W) proposed in 2013.

<a href='http://dcclims1.dccouncil.us/lims/'><img src='http://farm9.staticflickr.com/8379/8465131479_fc0c05b550_b.jpg' class='white-on-white' /></a>

This Law Information Management System, or LIMS, is hosted by the Council's
own server, [owned, operated, and even hosted in DC](http://toolbar.netcraft.com/site_report?url=http://dccouncil.us/).
It's a Windows server running IIS which handles about 0.5 requests/sec before timing out.
But it's entirely their property, and thus
the contents of the LIMS are very clearly the property of the DC Government.

## Becomes Law

![](http://farm9.staticflickr.com/8235/8468877526_859acf2d72_o.png)

Each bill is then downloaded by an employee of the company that wins
the contract for maintaining the bill. This person must hold a law degree
from an ABA accredited law school, and they cannot be a subcontractor.

Every two weeks, these employees download the bills from the public server
and apply their changes to the code. The contractor stores the full code
in a proprietary database with a content management system.

The contractor then provides services around the compiled law, and contractually
is the only provider of the 'official version.' They are the only business
or government entity to possess a full digital copy of the code.
