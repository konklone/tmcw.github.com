---
layout: post
date: 2011-11-07 10:00:00 UTC
title: GIF Polyrhythms & GIF CLOCK
hn: 
thumbnail: http://farm7.static.flickr.com/6099/6320704288_cb4ec558a8_q.jpg
categories: blog
---

![GIF CLOCK unraveled](http://farm7.static.flickr.com/6099/6320704288_cb4ec558a8_z.jpg)

<span class='image-credit'>the minute, second, and hour hand of gif clock,
in each of their states traveling around the dial, all as one image.</span>

[GIFCLOCK](http://macwright.org/demo/gifclock/) was the most popular
thing on this site last month. It's not very technical, unrelated to maps,
and is really just
an experiment hacked together and deployed from 1-3am.
[GIFs](http://en.wikipedia.org/wiki/GIF), it turns out, are pretty
big on this little internet.

The point of GIF clock is two things.

## Playback

There's no code behind the clock. Of course, I hacked together a [few
Python scripts](https://gist.github.com/1343450) to tone down the
boring work, but the real thing - there's
[no magic](https://github.com/tmcw/demo/blob/gh-pages/gifclock/index.html#L32).

It is a picture of every clock, that advances every second. Hopefully by
the time this is published, I'll be starting on a successor: YouTube clock.
A video of a wall clock ticking away every second of a day, and then looping
back when it reaches the next day.


<table class='data-table inset-right'>
  <tr>
  <th>seconds</th>
  <th>tic tac toe</th>
  <th>chess</th>
  </tr>
  <tr>
  <td>
  86,400
  </td>
  <td>
  255,168
  </td>
  <td>
  10<sup>123</sup>
  </td>
</table>

There's an interesting range of decision
trees and chances in most things. Chess has as many game-tree possibilities
as [the shannon number](http://en.wikipedia.org/wiki/Shannon_number).
Tic tac toe is shallow enough to be [visualized](http://en.wikipedia.org/wiki/Tic-tac-toe#Strategy)
in [all of its possible combinations](http://xkcd.com/832/).
And then time is always the same:
the same states, repeated over and over. It's unimportant whether you're
watching a video of the states of a clock, or flipcards of all possible
clocks, or a working clock - it's all the same.

<a href='http://en.wikipedia.org/wiki/Tic-tac-toe#Strategy'><img class='inset-right' src='http://farm7.static.flickr.com/6046/6320704326_7156d45308_o.png' /></a>

So there are some quirks. Like if the minute hand GIF takes too long to load,
minutes will be slow. Or if you start it at any time besides noon or midnight,
it'll be inaccurate. It's a lot like an extremely rudimentary wind-up
clock.

## Polyrhythms

The reason why GIF CLOCK is not gigantic is because of polyrhythms. It's
three GIFs - a seconds hand, minutes hand, and hours hand, and each only
has as many frames as positions - 60, 60, and 12. So 132 frames total,
instead of 60 * 60 * 12 = 43200. Of course, there are 86,400 seconds
in a day, but GIF CLOCK doesn't differentiate between AM & PM.

[Polyrhythms](http://en.wikipedia.org/wiki/Polyrhythm) are independent,
different rhythms that are played at the same time. In music, they're
usually something like 4:3, or 3:2 - things that are sometimes very
difficult to learn and perform, but not mathematically complex:
the measures that they resolve to are usually similar to musical
phrasing. Used tastefully, they tend to sound awesome, like
in the middle of [Joanna Newsom's Sawdust and Diamonds](http://youtu.be/ClqY--4fpZw?t=4m1s).

The relation between a polyrhythm and the number of beats you
need to 'count' to get to the 'common beat' is decided by the
[least common multiple](http://en.wikipedia.org/wiki/Least_common_multiple).
And by this measure, the common beat becomes more and more sparse:
a 4:5 polyrhythm only lines up every 20th beat. So, musically,
playing polyrhythms gets pretty rough beyond single-digits -
and to most ears kind of trying.

<iframe src='http://macwright.org/demo/gifclock/lcm.html' width='640' height='70'></iframe>

But having different measures going at the same time is pretty
cool for other things: where you're trying to make semi-random visualizations
look truly random and natural, having different longer rhythms going
at the same time can make things seem more natural, without
having to make longer, more disk-space-expensive loops.

Here's a quick example from some of my silly [videos from Denver](http://vimeo.com/29332628):
a video of a river in which the horizontal space is basically scanlines,
each with a different framerate and overall duration. Click load
to load the GIF. The videos last
5.74, 1.85, 8.19, and 15.12 seconds: so it'll only line up every 1.9<sup>46</sup>
seconds. It's probably not something that matters, or that's very noticeable,
but, heck, why not?

<iframe src='http://macwright.org/demo/polyrhythm/load.html' width='640' height='380'></iframe>

Anyway, for an absurdist clock, [consult GIF clock](http://macwright.org/demo/gifclock/).
[Gifsicle](http://www.lcdf.org/gifsicle/) is instrumental in gif-making for me -
the rest is hacked together with [Imagemagick](http://www.imagemagick.org/script/index.php)
(which is not very enjoyable) and Python/shell scripts.

* [# of tic tac toe games](http://www.btinternet.com/~se16/hgb/tictactoe.htm)
* tic-tac-toe image [by Nneonneo](http://en.wikipedia.org/wiki/File:Tictactoe-X.svg)
