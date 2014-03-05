---
layout: post
title: TAP & Tape, the awesome way to test JavaScript
categories:
- blog
published: true
---

![a wall in philadelphia](http://farm3.staticflickr.com/2808/12958201333_2ef88bdb3b_b.jpg)

[node-tap](https://github.com/isaacs/node-tap) & [tape](https://github.com/substack/tape) are simple, awesome testing tools for JavaScript. The JavaScript community has grown up with testing culture, and the vast majority of projects use larger tools like [Mocha](http://visionmedia.github.io/mocha/) and [Jasmine](http://jasmine.github.io/). Recently I've been switching lots of projects over to tap & tape, and want to share why.

[substack](http://substack.net/), the creator of `tape`, has already written a bit about [his process](http://substack.net/how_I_write_tests_for_node_and_the_browser) and thinking - here's just a little more, written from the perspective of a former `mocha` user.

What it sorts down into is roughly three parts: the protocol, browserify, and magic.

## The Protocol

<img alt='tap' src='https://farm3.staticflickr.com/2894/12957966915_6f8a252434_o.png' class='white-on-white' />

The [Test Anything Protocol](https://en.wikipedia.org/wiki/Test_Anything_Protocol) is the definition of 'tried & true': it's been around since 1987 and has been implemented in [a ton of languages](https://en.wikipedia.org/wiki/Test_Anything_Protocol#List_of_TAP_producers). It's just a dead-simple way to format test results, like

{% highlight sh %}
TAP version 13
# equivalence
ok 1 these two numbers are equal

1..1
# tests 1
# pass  1

# ok
{% endhighlight %}

Having this format be super simple means that you can combine tools that have common expectations. For instance, [faucet](https://github.com/substack/faucet) is a node module that gives pretty, summarized results for your tests, but it doesn't directly plug into `tape` or `node-tap` - all it cares about is the TAP protocol, so you can pipe results into it. You could even pipe a [TAP producer in a different language](http://testanything.org/producers.html) into it, and it'll work just the same.

## Browserify

[browserify](http://browserify.org/) is another awesome tool written by [substack](http://substack.net/). With it, you can use node-style `require()` calls in code you're going to run in browsers, and then use the `browserify` command to stitch them all together and make something you can throw in a script tag.

Browserify has been huge for writing cross-platform libraries, and it's been huge for building things. [Mapbox.com](http://mapbox.com/) and [Mapbox.js](https://www.mapbox.com/mapbox.js/api/v1.6.1/) are both constructed this way - individual libraries on [npm](https://www.npmjs.org/), `package.json` just like nodejs code, and then browserify to bring it to the web.

Long story short, `browserify` 'just works' with `tape`. While `mocha` has something of an unusual browser story - it's hard to get at the files you'd want to run tests in a browser, and then when you do, if you want to run tests in both browsers and node, it's not straightforward to conditionally require things sometimes.

So, to run browserify tests in a browser, you can just run

{% highlight sh %}
$ npm install -g browserling testling
$ browserify test/test.js | testling
{% endhighlight %}

Simple as that. Since tape is just a node module and browserify turns the whole thing into just JavaScript, it's easy to run it anywhere you want - embedded in a webpage, in a browser, or wherever. `tape` uses `console.log` to write its results, which is super easy to pull out of a headless browser.

## Magic

Using mocha always gave me a bad feeling about magic. With only few exceptions, nodejs has the assumption that any variables on a page will come from obvious places:

{% highlight js %}
// this comes from a module
var module = require('module');
{% endhighlight %}

In the interest of simplicity, `mocha` doesn't do that. Your mocha test files have assumptions:

{% highlight js %}
var assert = require("assert")
describe('truth', function(){
  it('should find the truth', function(){
    assert.equal(1, 1);
  })
})
{% endhighlight %}

Keen eyes will notice that `assert` entered the stage by a `require()` call, but `describe` and `it` didn't.

On the other hand, a basic `tape` test:

{% highlight js %}
var test = require('tape').test;
test('equivalence', function(t) {
    t.equal(1, 1, 'these two numbers are equal');
    t.end();
});
{% endhighlight %}

`test` comes from `require()`, and `t` comes from the closure. Simple enough. This lack of abstraction has two awesome advantages:

1. It's easier to form a mental model of what's going on, so it's easier to hack with it and know what'll happen. What if I call a function with `t` and then call functions off of `t`? It'll work.
2. Tests are code. So, you can run tests as modules with node, just like you'd run other code: `node test/test.js`, and it works. As opposed to needing a 'test runner' binary that contains some of the code the test really needs.