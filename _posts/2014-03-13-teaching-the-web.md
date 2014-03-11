---
layout: post
title: Teaching Technology
categories:
- blog
---

**Education.** It means a lot of things, from self-education to online education to Pre-K. It's as important as it is complicated: many people in the tech community are self-taught or see advanced computer science education as only useful in very narrow scopes. Many of us started out in basements or bedrooms with tinkering, not lecturing. But self-starting doesn't scale like we want it to, whether in numbers or demographics, the number of young coders and the variety of their backgrounds could be so much more.

I decided to try: this month, I spent a week co-teaching a class with Sarah MacWright at Millbrook School in upstate New York, on 'building the web'. It aimed high: 10 high schoolers, five days, five and a half hours a day, we set out to learn the language of the web. We tried to select for a group of students with no prior knowledge, only the will to learn and some goals.

We learned a lot, on many different levels - everything from class structure to technology choices and ways of speaking came out of the experience. The biggest caveat is that this was a single class, a single time around: so we know what worked and what didn't, but can only surmise what might work better.

## The Topic

The working topic of the class ended up being: building the web, with HTML, JavaScript, and CSS. This choice wasn't obvious or easy: as [_why astutely said in his Art && Code talk](#), why would anyone choose to teach a just-starting programmer _three languages at the same time_? Many starting-to-program classes use Python as a learning language, and this makes some sense. Python is one environment, and for the basics, Python code is simple and predictable. But the end product matters: with the web, kids can share with their friends and brag about their creations. The initial learning curve of the web is steeper than writing & running `python snake.py`, but I think the moderate one is easier, due to the plethora of information and ability to always right-click on something interesting & hit 'Inspect Element'.

Once we decided on the web, there's the question of abstraction: should we teach HTML or Wordpress? The latter has quick results and is less frustrating, and is the way a lot of people make the web. And instead of starting with 'Hello world' in Times New Roman on a white page in black text, kids can start with something that looks nice.

We chose to go the HTML/CSS/JavaScript route, and power through the low level of abstraction. Multiple causes led to this decision: there should be something _different_ about learning the web rather than just using a service. The empowerment of knowing the basic language of the web is real: it's cool to pull back the curtains and show what's underneath, even if it's a little scary and weird.

## The First Lesson

So, 10 high schoolers in a room, and five days to learn the web? Where do you start? Here's what we tried.

**'Inspect Element' as an onramp**: each student opened the school homepage, right clicked on an element, and changed the CSS properties on the right. Then they changed some of the text. Their mods ranged from all pink to jokey title changes, and the first `<` and `>` brackets made their appearance.

Then, to start exploring code that **does stuff**, we opened up a [Flappy Birds Clone](http://nebez.github.io/floppybird/), and tinkered with changing variables. This had kids read the first bits of JavaScript and get a first idea of the hacker mentality: _We can change the stuff in computers_.

## The First Writing Assignment

Next, we start creating. After a short presentation on HTML basics, we use [jsbin](http://jsbin.com/) to write small chunks of HTML. First it's just `Hello, world`, and then `Hello, <strong>world</strong>`, and then tinkering with tags and typing. In this early stage it's vital to have instant updating so kids can try variations quickly.

It was hard to choose a HTML editor that would work great: [Mozilla Thimble](https://thimble.webmaker.org/) was a first choice because of its great HTML error reporting, but I was expecting to need to save the output, and the Persona requirement was a deal-breaker. JSBin did well, but exhibited a few bugs and oddities: sometimes the cursor would jump to an incorrect spot, external links don't work in the right pane, and refreshing the right pane is somewhat unreliable. In the end, we didn't actually need to save output often in this stage, so Thimble would have fared well.

## Next: CSS

Then we went through a similar process explaining CSS. The concepts of CSS came to the class at varying speeds, and already I started to notice the inconsistencies with programming that are invisible to the indoctrinated but a serious handicap to newbies.

## Words Help Us Learn

Around this point I noticed that my style of teaching was missing terms: words contain and define concepts, and this massively helps learning. The words blend together in practice and day-to-day programming, so I wasn't nearly discrete or precise enough in my initial language. For instance, I should have taught the concept of matching HTML start tags to end tags as 'balancing', with exercises and analogies, not as a detail or peculiarity of language. Then you can talk about `balancing`, and kids can grasp why it's a common characteristic to the languages they learn.

## First Bite of JavaScript

I went through a quick presentation on JavaScript while encouraging the class to try out examples in [mistakes.io](http://mistakes.io/) for the most part this was successful, but it made me realize that an even-simpler mistakes.io might be useful - something that slims it down to a single line of JavaScript and explains what that JS does in painstaking detail. You type `var foo = 4;` and it explains what every token means - you're creating a variable, called foo, assigning it to 4, which is a number, and ending the line with `;`. And it would give fantastic guidance for incorrect or incomplete input.

Two students went down the path of learning JavaScript deeply, and constructed incredible games. We'll get to that later, but for the majority of the class this was just a taste. To learn 'just a little' of browser JavaScript just doesn't make sense, since a single line can contain 5 untaught concepts at once.

## ~/Sites

The first lessons used online programming environments that imitated livecoding. To move forward, we needed to start building websites - that means files, editing, and servers. We set up Sublime Text 2 for each student, and I ran a Terminal window with `python -m SimpleHTTPServer` running from the `~/Sites` directory.

It wasn't easy to choose an editor, and I think Sublime was the wrong choice. It worked for our purposes, but it had a few drawbacks:

1. Unlicensed Sublime nags you for a license every few saves.
2. Automatic bracket insertion was, in the vast majority of cases, counterproductive.
3. The 'tabs + sidebar' navigation was confusing. Disappearing tabs are poorly communicated by the interface, and tabs don't convey the difference between files with the same name in different folders.
4. By default, Sublime doesn't have JavaScript formatting and I didn't have enough time to configure a plugin for it (or find some hidden preference).

## Exercises make working knowledge

Sarah wisely added exercises after each short lesson. After we learn a few more HTML tags, we make a quick 'about me' page or make a `<table>` of our favorite foods. Doing this quickly gave us a gauge of how kids were catching on and gave students the ability to see why they were learning this stuff.

## Projects

On day three, we started on projects: four students built photo portfolios, two built games, and four worked in a group creating a student blog with Tumblr.

## Portfolios

I built a quick [template](https://github.com/tmcw/intersession/tree/gh-pages/starts/photos) for photo galleries, which was modified by the students - quickly we went towards Google Fonts for a custom look, switched to auto-advancing slides, switched up colors and other details.

## Games

The two students playing games, a junior and senior, built their creations with [Coquette](#), an excellent library by Mary Rose Cook. One game, called Flying Mario, evolved from a side-scroller to a helicopter-like game with Mario-inspired graphics and style. The other, The Raze Maze, is a 2D dungeon crawler with hand-drawn pixel graphics and moving things to grab. Both are awesome.

The games were far different in scope and skills than the other projects - there was an awesome moment where a student used trigonometry in the real world for the first time, making little pixel rectangle targets move in a video game. But we also bumped into some of the hard problems of games, like how to do collision detection and have different entities in the game exhibit different behavior. I was fascinated by the 'tuning' tasks that students quickly mastered, like adjusting the ratio between gravity and jump height to make a game tricky, or designing a maze with nothing more than pixel coordinates and sizes of rectangles.

In all, Coquette was fantastic for this purpose and let us focus mostly on actual topics and behavior of the games. For the small issues we found, I'm making notes to create examples or patches to make things even better.

## School Blog

The final project was a school blog, [brook-posts.com](http://brook-posts.com/). We chose to host it on Tumblr, since it permitted HTML & CSS editing. My sister's skills were mainly for Wordpress, and I rarely use blogging software (this blog is on Jekyll), so this was a bit of the 'unknown'. We quickly wanted to change the page from the template - which, in itself, is awesome: before this class, I doubt kids would have pushed beyond default settings.

## Let's Talk URLs

I never did a lesson on URLs, and I should have: what blends into the background for me is not obvious to others. How you link between files, what the different parts of a URL mean: these are obscured by most tools we use. Every once in a while Google Chrome even experiments with hiding the `http://`, increasing the level of abstraction even more. A visual explanation combined with an exercise of right-clicking and seeing how things get linked together might have eliminated a lot of confusion down the line.