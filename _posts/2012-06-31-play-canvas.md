---
layout: post
date: 2012-06-31 10:00:00 UTC
title: Play Canvas
hn:
categories:
- blog
- releases
---

[`playcanvas`](http://macwright.org/playcanvas/) lets you play [Canvas](http://en.wikipedia.org/wiki/Canvas_element)
elements. That means that it turns images into audio in a variety of ways:
by scanning pixel by pixel, or by sweeping across an image.

It's a side project of some other work that I've been doing on a project
called `wind chime`, which, like `playcanvas`,
is a _'cross-media transform'_<sup>[[1]](#one)</sup>. Wind chime translates
from text input - realtime keystrokes like I used in [minute](http://macwright.org/2012/02/15/minute.html) -
into audio, to build a sort of assistive technology or just ambient signals.

Along the way I've been working on understanding all of the fun things
about audio - [additive synthesis](http://en.wikipedia.org/wiki/Additive_synthesis),
[algorithmic composition](http://en.wikipedia.org/wiki/Algorithmic_composition),
and even just the nitty-gritty of audio output with Apple APIs.

When Google did their [Moog synth doogle](http://www.wired.com/underwire/2012/05/best-moog-google-doodle/),
I was finally clued into the fact that they had implemented [`webKitAudioContext`](http://epx.com.br/artigos/audioapi.php),
the vital API necessary to make this happen. As I've found with the OSX work
and an earlier experiment into [L-System](http://en.wikipedia.org/wiki/L-system)-based
composition had shown, sampling and other halfway solutions don't cut it -
[MIDI](http://en.wikipedia.org/wiki/MIDI) or direct channel-data level APIs
are really needed for audio synthesis.

{% highlight js %}
var piano_roll = document.getElementById('piano_roll');
piano_ctx = piano_roll.getContext('2d');
piano_ctx.fillStyle = '#fff';
piano_ctx.fillRect(0, 0, piano_roll.width, piano_roll.height);
piano_ctx.fillStyle = 'rgb(255, 27, 27)';
piano_player = playcanvas(piano_roll).style('sweep');
{% endhighlight %}

As a demo, I built a [piano roll](http://en.wikipedia.org/wiki/Piano_roll)
in playcanvas. Instead
of treating sound and graphics as representations of an internal data format,
the graphical layer is the deepest level of data storage. That means you
can change the musical properties, like the quantization of tones and
notes, by changing the simple canvas drawing layer.


1. <a name='one'></a>If there's a preexisting better term for this, I'm open to using it.
