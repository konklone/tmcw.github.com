---
layout: post
title: Images as Maps
categories:
- blog
---

The question comes up surprisingly often: how does one create fictional maps -
like [World of WarCraft maps](http://mapwow.com/) -
in a modern cartography system like [TileMill](http://mapbox.com/tilemill/)?

I've made [non-geographical maps before](https://tiles.mapbox.com/tmcw/map/maze), but
never anything with raster data or properly dodging the distortion of
[projections](http://macwright.org/2012/01/27/projections-understanding.html) and
their [distortions](http://macwright.org/2012/02/02/rhumb-lines-great-circles.html).

<iframe width='640' height='300' frameBorder='0' src='http://a.tiles.mapbox.com/v3/tmcw.blue-marble-sphere.html#2/0.000/-56.250'></iframe>

<div class='link-block'>
  <a href='https://gist.github.com/3326365'>Download the script as a Gist →</a>
</div>

This is a [Python](http://www.python.org/) script: download
it as a [raw file](https://raw.github.com/gist/3326365/ea6ce42d866e33b67f610208b602420dee29fea8/togeo.py),
name it `togeo.py`. You'll need [GDAL](http://www.gdal.org/) for
it to work - not necessarily the 'python bindings', but make sure that,
in your terminal, `gdal_translate` and `gdalinfo` are present.

Run the script with a single filename as its argument:

{% highlight sh %}
python togeo.py pie.jpeg
{% endhighlight %}

<small>(if you've got an image format other than JPEG, convert your image to JPEG
first with a graphics application, [graphicsmagick](http://www.graphicsmagick.org/),
or [a free online conversion service](http://www.zamzar.com/))</small>

<iframe width='640' height='300' frameBorder='0' src='http://a.tiles.mapbox.com/v3/tmcw.sombrero-galaxy.html#2/4.215/-50.361'></iframe>

This will generate `pie.jpeg.tif` or `yourfile.jpeg.tif`, geo-referenced.
What I mean by 'geo-referenced' is that the `tif` file is now a [GeoTIFF](http://geotiff.osgeo.org/)
file - a TIFF file with special information about what projection it's in
and where its corners are in the world. This script transforms the image
into the [spherical mercator](http://en.wikipedia.org/wiki/Transverse_Mercator_projection) projection,
and then does some extra legwork to make sure that its corners are referenced
in a way that respects the image's [aspect ratio](http://bit.ly/SaCBFk).

The way that it does that is pretty simple: the maximum bounds of a GeoTIFF
in EPSG:900913 is `-20037508.34, -20037508.34, 20037508.34, 20037508.34`.
`togeo.py` simply crops this either widthwise or lengthwise to fit a
smaller area and preserve the image's dimensions.

From there, you can use it in TileMill or your favorite GeoTIFF-supporting
application ([QGIS](http://www.qgis.org/) is another good one) easily!

<iframe width='640' height='250' frameBorder='0' src='http://a.tiles.mapbox.com/v3/tmcw.map-5qadc7q9.html#4/10.380/-134.187'></iframe>

### See Also

* [GSV](http://mike.teczno.com/giant/pan/) by [Mike Migurski](http://mike.teczno.com/)
  doesn't make any geo-assumptions and includes a Python script for tiling.
* [Zoomify](http://www.zoomify.com/) takes the product angle and is popular
  with photographers.
* You can hack the [Google Maps API](https://developers.google.com/maps/documentation/javascript/reference) to
  produce a similar effect, or use [OpenLayers](http://openlayers.org/)
* If your images have something to do with the world, and you want to combine
  them with other maps, none of these techniques will work: you should check
  out image rectification. [Map Warper](http://mapwarper.net/) and
  [Map Knitter](http://mapknitter.org/) are great options for doing that.
