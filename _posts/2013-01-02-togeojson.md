---
layout: post
title: toGeoJSON
categories:
- blog
---

[toGeoJSON](https://github.com/tmcw/togeojson) is a tiny library that
converts [KML](https://developers.google.com/kml/documentation/)
to [GeoJSON](http://www.geojson.org/).

![](http://farm9.staticflickr.com/8072/8336236566_14e6699aee_h.jpg)

KML is popular mostly because it is the native format of
Google Earth and Google Maps. Support for KML is limited in the Javascript
ecosystem because it is a relatively complex and XML-based format. Although modern browsers have
XML parsers, they're awkward to use
and even trickier to generate output with. [node.js](http://nodejs.org/), the most
popular headless environment for Javascript, has several parsers,
modules but most are bindings to C libraries.

As a result, [d3](http://d3js.org/), [Leaflet](http://leafletjs.com/),
and other libraries focus on GeoJSON rather than KML support.

The canonical implementation of KML in browsers (outside Google's closed-source ecosystem)
has been [OpenLayers](http://openlayers.org/), a project I've
[critiqued in the past](http://notesarchive.tumblr.com/post/6010879882/openlayers)
for its large and complex codebase. And so I've had the dream of extracting
OpenLayers's many format implementations to create a sort of
'compatibility library' like OGR for Javascript - but this turned out to be
the wrong path. Unfortunately, OpenLayers embraces inheritance, interdependencies,
and a 'native representation' of features, so `OpenLayers.Format.KML` is 31KB and
requires 29 dependent classes.

Personally I don't think that this is necessary, and regret that there is no
Javascript parallel to [OGR](http://www.gdal.org/ogr/), a comprehensive library
for format compatibility in C languages.

## Obligatory Versus

There are things that the OpenLayers KML implementation does which toGeoJSON
cannot: parse embedded styles into data, try to fetch sub-files referenced
with NetworkLink, and so on. It also includes an XML-parser-wrapper which
apparently tries to fix subtle problems in XML implementations like IEs.

That said, since toGeoJSON aims to be simpler and smaller, it's useful to
quantify that difference. I'll do that with [websize](https://gist.github.com/4408971),
a quick utility I use to get gzipped/[uglify](https://github.com/mishoo/UglifyJS)'ed sizes
for libraries, just to be fair.

A custom build of OpenLayers with just `OpenLayers/Format/KML.js` is
`31.1KB`, while toGeoJSON is `1.0KB`. So, the OpenLayers implementation is
roughly 31 times the size of toGeoJSON.

I think it would be possible to pull off the same kind of size difference with
another format, given the ease of implementing KML, but none come to mind -
standards like GML and GeoRSS are not used in production often.

## Using It

You can use toGeoJSON via nodejs or any browser - [and I've written a quick site](http://macwright.org/togeojson/)
that demos conversions and has a cut-and-paste interface for converting
other KML files.

Right now there's a single function, `toGeoJSON.kml(XMLDOM)`, which takes
an XML DOM, which can come from browser AJAX libraries like jQuery, reqwest,
d3, dojo, and so on, or from a nodejs dom library, like jsdom. In the browser,
a request & conversion would look like:

{% highlight js %}
$.ajax('test/data/linestring.kml').done(function(xml) {
    console.log(toGeoJSON.kml(xml));
});
{% endhighlight %}

## See Also

* [Paul Ramsey on KML at the OGC](http://blog.cleverelephant.ca/2007/04/kml-ogc.html), just as
  'the standards process' started.
* [The KML Reference](https://developers.google.com/kml/documentation/) (the
  OGC maintains a [less useful, less readable version that covers the standardized standard only](http://www.opengeospatial.org/standards/kml)).
* [GeoJSON.org](http://geojson.org/) does a spectacular job of documenting that format.
