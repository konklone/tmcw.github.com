---
layout: post
title: Indexing and Searching Big Static Data
categories:
- blog
---

![](http://farm9.staticflickr.com/8337/8185308150_60b3c7cd4e_b.jpg)

Static websites have kind of taken over in the last year or two. [GitHub](https://github.com/)
set the trend, with [jekyll](http://jekyllrb.com/). I [switched](http://macwright.org/2011/07/04/hello-internet.html)
and so did [MapBox](http://mapbox.com/) and [Development Seed](http://developmentseed.org/),
and a lot of their client sites - eliminating the 'smart server' of a website
makes it much simpler to deploy and forget about.

_tl;dr: I made a [static open data portal](http://dcmr-1.s3-website-us-east-1.amazonaws.com/)
with search & autocomplete by using an [inverted index](http://en.wikipedia.org/wiki/Inverted_index),
[trie](http://en.wikipedia.org/wiki/Trie), and sharding.
You can [try the code](https://github.com/tmcw/dcmr) on other data, too._

Over the last year or two, the idea has been refined. I posted
[about fast hacky queries with UTFGrid](http://macwright.org/2011/08/10/fast-hacky-queries-with-utfgrid.html),
and a very-rethought version of that became the MapBox geocoder. The same
basic rasterization-of-data-structures was expanded in [Your Superfund](http://macwright.org/2011/09/30/voronoi-polygons.html),
which used [voronoi tesselations](http://en.wikipedia.org/wiki/Voronoi_diagram) to
do nearest-neighbor searches.

But there's kind of a limit to what static sites can do. We assume that you can't
do things like search and advanced filtering with static data, especially with
datasets that are too large to load in-browser.

## Doing That Stuff Anyway

_Set the scene._ You're working on [your bike law project](http://macwright.org/2012/09/10/bikelaws.html).
You want to link to the laws that govern your life. You can't because of
[evil companies you hate](http://westlaw.com/) and bad government portals
that crash.

So you scrape [the data](http://www.dcregs.dc.gov/) overnight. It's 685MB
of .doc files, 92MB when [converted to text](http://www.wagner.pp.ru/~vitus/software/catdoc/).
Too big for browsers. Let's do it anyway. First:

## Enter the Inverted Index

_Sidenote, [read this about Google Code Search](http://swtch.com/~rsc/regexp/regexp4.html). It's
barely related but totally awesome._

An inverted index maps _occurences of words_ to _documents appeared in_ and,
optionally, spots in that text. To crib an example from Russ Cox (read that article already):

    (1) Google Code Search
    (2) Google Code Project Hosting
    -> Yields
    Code: {1, 2}
    Google: {1, 2}
    Hosting: {2}
    Project: {2}
    Search: {1}

See? Inverted indexes are the basic building block of a search index. And they
don't require much power to use - you just need to load the index and do
a bunch of `AND` clauses.

Let's build an inverted index!

{% highlight js %}
var w = _s.words(text), words = {};
w.forEach(function(word) {
    word = word.replace(/[^A-Za-z]/g, '').toLowerCase();
    if (word.length < 3) return;
    if (typeof words[word] !== 'object') words[word] = [];
    if (words[word].indexOf(id) === -1) words[word].push(id);
});
{% endhighlight %}

Bam, so easy. (okay, so that used [underscore.string](http://epeli.github.com/underscore.string/) to get words
and doesn't have certain context) But building an inverted index of all of my text content makes
an 8MB file, which is above my 'browsers can do this' threshold.

Here's an example of an inverted index & a trie in action, using the code from
this site, but applying it to Genesis.

<div class='link-block'>
  <a href='http://bl.ocks.org/4072696/'>searching genesis</a>
</div>

## So Then Comes Hashing & Sharding

Let's split that up.

A hash function is like a one-way summary function. One hash function could
be `'Hello'->4, 'Hi'->2, 'Goodbye'->7` - summarizing words by their
number of letters. Another might be by adding all of the letters together,

Behold a shard function:

{% highlight js %}
function shard(word) { return word[0]; }
{% endhighlight %}

Cool, right?

Okay, so combining the two means instead of having one 8MB inverted index,
we have 26 shards of an inverted index, with the largest being around 800KB.
Not too bad, and if this ended up being not enough, we could do something like

{% highlight js %}
function shard(word) { return word.splice(0,2); }
{% endhighlight %}

And have smaller slices.

As far as how to actually use this index, it's pretty easy. If you have
a search term like `bricked`, you load the index `b.json` and it has a line
like `"bricked": [4861]`. So, `bricked` appears in document 4861, so display
that document in results and link to it. If you have multiple terms, load
the indexes for each of them, and find the intersection of their results.

## This is Trie

Cool! We now have an inverted index. So we can search for certain terms, and
get a list of articles those terms appear within.

But it's an exact search, and relatively blind. If you're typing 'bicycle',
you don't get anything for 'bicycles', and you don't get any results when
you've just typed 'bicy'.

This would be more useful with autocomplete. But how to do it?

There are multiple ways. One would be to just use the (sorted) list of entries
and `for`-loop through it until you hit a word which is has your search term
as a prefix. For `n` words, this would have approximately `O(n)` performance
(look, I'm not a scientist, man). We can do better.

For this, I used a **[trie](http://en.wikipedia.org/wiki/Trie)**, aka a prefix tree. It's a [tree data structure](http://en.wikipedia.org/wiki/Tree_(data_structure))
in which each node has a letter of a word, and words that share prefixes
share parts of the tree.

<div class='link-block'>
  <a href='http://bl.ocks.org/4063830'>trie demo</a>
</div>

Play with it!

So, traversing the tree is pretty simple:

{% highlight js %}
var pos = trie, prefix = '', strs = [];
for (var i = 0; i < last.length; i++) {
    if (pos[last[i]]) {
        prefix += last[i];
        pos = pos[last[i]];
    }
}
function traverse(pos, prefix) {
    if (strs.length > limit) return callback(strs);
    if (isEmpty(pos)) strs.push(prefix);
    for (var i in pos) traverse(pos[i], prefix + i);
}
traverse(pos, prefix);
{% endhighlight %}

And, as you can see, finding the right prefix subtree to traverse takes only
as many steps as your prefix has letters, since each level of the tree is stored
as an object.

## Implementation

[My implementation of these ideas is on GitHub](https://github.com/tmcw/dcmr),
as well as [an example data portal that displays the DC Municipal Regulations](http://dcmr-1.s3-website-us-east-1.amazonaws.com/).

The regulations are available for download in full, and the implementations
are stashed in `generate_index` of the GitHub repository.

There are plenty of things I didn't do in this implementation that you would
want to do. Most inverted indexes also store the point in the text where the word
occurs. Or use a really compact datastructure. I did pull in a few of the
normal tricks, not storing [stop words](http://en.wikipedia.org/wiki/Stop_words) to
reduce noise in the index.

## See Also

* [Simon Tokumine's trigram_search](https://github.com/tokumine/trigram_search) project does static trigram indexes
* [Seriously, read how we built Google Code Search](http://swtch.com/~rsc/regexp/regexp4.html)
