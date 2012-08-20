---
layout: post
title: Considering CSS
categories:
- blog
---

_these are just collected thoughts; always remember that I have
no idea what I'm doing_

I remember explaining to friends in 2002<sup>[*](#css-1)</sup> that
monitors are just the displays of computers, that the humming box below
it is the bit that thinks. And that learning [HTML](http://en.wikipedia.org/wiki/HTML)
is great and fun, but it's not a programming language, it's a
markup language, because it doesn't do things, it just describes them -
[PHP](http://www.php.net/), on the other hand, was a real programming language.
CSS, on the other hand, I said was a styling language.

Since then, the popularity of PHP has morphed into Ruby, Python, and now
Javascript, and HTML has made friends in
[Markdown](http://daringfireball.net/projects/markdown/), Textile,
and older comrades like [LaTeX](http://www.latex-project.org/).

**But CSS is still the only established stylesheet language.**

Now the internet runs on [worse is better](http://www.jwz.org/doc/worse-is-better.html)
thinking. We turned down the XML-correctness
of [XHTML](http://en.wikipedia.org/wiki/XHTML_2.0#XHTML_2.0)
for [tolerant HTML5 parsing](http://my.opera.com/hallvors/blog/2008/11/19/html5-and-invalid-documents-the-great-misunderstanding);
the [warts of Javascript](http://matt.might.net/articles/javascript-warts/)
are tolerated, and even [HTTP Cookies](http://en.wikipedia.org/wiki/HTTP_cookie)
are a glorified, inefficient hack.

And CSS is fairly good: the problems most people face in it are related to
variation of browsers<sup><a href='#css-2'>*</a></sup>, not lack of expressiveness.

And for the people who want CSS with the kitchen sink, we've been aggressively
developing it. There's [LESS](http://lesscss.org/)
lets you nest selectors, `spin()` colors, and
use variables. [Stylus](http://learnboost.github.com/stylus/)
allows omission of nearly everything, plus everything noted above.

But these are syntax sugar, not alternatives.

## When and How

One of the things that's becoming strange about CSS is the idea of when and
how.

The assumption is that you have a page, and you have a stylesheet. The page
refers to the stylesheet with a `link` or `style` tag, and that stylesheet
gets applied to the page. The HTML on that page acquires the style,
and any new HTML that you add to the page programmatically does as well.

This model starts to leak a little bit. First with media queries. This
website, for instance, contains the style:

{% highlight css %}
@media (min-width:860px) {
    html {
        border-right:200px inset #888;
    }
}
{% endhighlight %}

So, when the browser window is greater than 860px, the page has a big
right border. It might be an ugly style, but grant me my 'design flexibility'
or my opt-out of designerdom.

But, unlike other rules in CSS, you now can change the browser window,
and the 'CSS stylesheet' changes dynamically - this rule doesn't practically
exist or apply.

The other element of time in CSS is transitions: by setting a
'transition property', you can cause an element to move, brighten, expand,
and so on during a certain time period:

{% highlight css %}
.slider {
    position: absolute;
    left: 0px;
    transition: left 1s linear;
}
.slider.slide {
    left:100px;
}
{% endhighlight %}

Now this is tremendously cool, but it requires a bit of detail: what happens
if you want to cancel the transition? What happens at the end of the
transition? What about multiple simultaneous transitions?

## DOM CSS is Weak

The Javascript API for [accessing stylesheets and their rules](http://www.quirksmode.org/dom/w3c_css.html)
is rarely used. It's odd that we never think of it: that the possibility
of temporarily disabling a CSS rule with Javascript never enters the mind,
or dynamically adding and removing stylesheets to precisely match
page content.

<ul>
  <li id='css-1'><a href='http://www.youtube.com/watch?v=nSWTkI_aVSo'>I done got old</a></li>
  <li id='css-2'>Internet Explorer, and now probably mobile browsers, since
  they'll get harder to test on single systems.</li>
</ul>
