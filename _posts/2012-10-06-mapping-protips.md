---
layout: post
title: Mapping Protips
categories:
- blog
---

<img src='http://farm9.staticflickr.com/8176/8060360827_c1b24c65af_b.jpg' width='640' height='276' />

_Excuse the typical tech-blogness of this post; it essentially consists of
specific, technical advice to specific technical things. Ideally it's helpful
to specific people, and if this doesn't look like your kind of thing, just
keep on movin on._

## Use TileMill Maps in Development

The design cycle for [TileMill](http://mapbox.com/tilemill/) and sites based
on [mapbox.js](http://mapbox.com/mapbox.js/) can seem kinked and slow if you're
tabbing between site & map, or even exporting and uploading 'test' maps to
see what they look like.

You can use TileMill as a map server, and when you make changes, they quickly
propagate to your site. Let's say you have a map setup like:

{% highlight js %}
var map = mapbox.map('map'),
    barLayer = mapbox.layer().id('foo.bar');

map.addLayer(barLayer);
{% endhighlight %}

Just use the [layer.url method](http://mapbox.com/mapbox.js/api/v0.6.6/#layer.url)
and bring in TileMill's [TileJSON](http://mapbox.com/wax/tilejson.html)
output.

{% highlight js %}
var map = mapbox.map('map'),
    barLayer = mapbox.layer().url('http://localhost:20009/api/Project/bar');

map.addLayer(barLayer);
{% endhighlight %}

## Filtering shortcuts for markers.js

A lot of sites have a certain pattern as far as how they use markers - you'll
load a lot of markers, and then filter them by property in [GeoJSON](http://www.geojson.org/).

You end up with code like

{% highlight js %}
// set up markers layer as markers
$('#foo').onclick(function() {
    markers.filter(function(f) {
        return f.properties.foo == true;
    });
});
$('#bar').onclick(function() {
    markers.filter(function(f) {
        return f.properties.bar == true;
    });
});
{% endhighlight %}

This isn't terrible, but it's repetitive and has a clear pattern. To clean
this up, you can use a `by` function:

{% highlight js %}
function by(a, b) {
    return function(f) { return f.properties[a] === b; };
}
function filterby(a, b) {
    return function() { markers.filter(by(a, b)); };
}
// set up markers layer as markers
$('#foo').onclick(filterby('foo', true));
$('#bar').onclick(filterby('bar', true));
{% endhighlight %}

This uses a [closure](http://lostechies.com/derekgreer/2012/02/17/javascript-closures-explained/),
which is a Javascript technique very worth learning.

It's also handy to have around these two functions:

{% highlight js %}
function all() { return true; }
function none() { return false; }

// show all markers
markers.filter(all);
{% endhighlight %}

## Removing the Attribution Prefix from Leaflet

This one's simple, a one-liner. It's [documented](http://leaflet.cloudmade.com/reference.html#control-attribution),
too. But people either don't realize this, assume that Leaflet
'requires attribution', or they do just want to throw a shout-out to the
library in there.

{% highlight js %}
map.attributionControl.setPrefix('');
{% endhighlight %}

While this isn't evil, it's a little obtrusive and there's no requirement
to keep it there.

## Downsampling Tiles For Performance

[MapBox](http://mapbox.com/)'s tiles are, by default, made to be pretty,
and the infrastructure is meant to deliver them crazy fast. If you need
them even faster or don't have bandwidth to spare, you can switch to downsampled
versions. Full deets are in the [image quality section of the developer docs](http://mapbox.com/developers/api/#image_quality).

<iframe src='http://bl.ocks.org/d/3827272' width='640' height='200'> </iframe>

{% highlight js %}
mapbox.load('examples.map-vyofok3q', function(o) {
    // Get the layer's configuration as TileJSON
    var tj = o.layer.tilejson();
    // Downsample tiles
    for (var i = 0; i < tj.tiles.length; i++) {
        tj.tiles[i] = tj.tiles[i].replace('.png', '.jpg70');
    }

    mapbox.map('map', mapbox.layer()
        // set an updated configuration on a new mapbox.layer
        .tilejson(tj))
        .zoom(5)
        .center({ lat: 38, lon: 90 });
});
{% endhighlight %}

## Using Maps in the DOM

Maps are not too far from the DOM. Read my [article on how web maps work](http://macwright.org/2012/05/15/how-web-maps-work.html)
for the full story. But, the short of it, is that in mapbox.js (and in
[Modest Maps](http://modestmaps.com/)), when you have a layer, you always have
access to `layer.parent`, a direct reference to the layer's parent DOM element.

Thus it's pretty simple to do stuff with this. You can, for instance, do

{% highlight html %}
<style>#foo { opacity: 0.2; }</style>
<script> // (after map setup, foo is a layer)
foo.parent.id = 'foo';
</script>
{% endhighlight %}

Or you can do slightly more advanced stuff like this example, where your
mouse position left to right on the map changes the layer's opacity. (useless,
but you get the idea)

<iframe src='http://bl.ocks.org/d/3845877/' width='640' height='200'> </iframe>

{% highlight js %}
mapbox.load('examples.map-vyofok3q', function(o) {
    mapbox.map('map', o.layer).zoom(5).center({ lat: 38, lon: 90 });
    document.onmousemove = function(e) {
        o.layer.parent.style.opacity = e.clientX / window.innerWidth;
    };
});
{% endhighlight %}

Simple as that. The only thing to watch out here is automatic compositing in
mapbox.js, which you can easily turn off by calling `.composite(false)` on
a layer object.
