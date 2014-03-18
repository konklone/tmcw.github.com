---
layout: post
title: Teaching
categories:
- blog
---

![](http://farm4.staticflickr.com/3738/13204812803_64ee9caf56_b.jpg)

Education means a lot of things: self-education, online classes,  Pre-K. It's as important as it is complicated, especially in technology. Many programmers learned their first lessons on a family computer, not in a classroom. That's where I started, and without deeper consideration, it could be "the way": formal education in the backseat, adolescent hacking at center stage.

But self-starting doesn't scale like we want it to. There are kids with home computers who have time and will write scripts and hacks for fun and have a supportive peer group who will think that's cool. But they look a lot like I did at the time: white boys with parents who can afford a real computer, and people around them who understand or accept their interests.

I don't think this will change on its own. Computers are cheaper and more powerful than they were in my youth, but they are poorer gateways to experimentation and learning. Gender stereotypes are still strong and destructive, as are many other lines upon which people are group- and self-discouraged to experiment.

Educational resources are one escape hatch: with a little technical knowledge and a reason to learn, you can dial up sites like [Codecademy](http://www.codecademy.com/) and advance up the rungs of knowledge. But those qualifications are brutal. What seems like an iota of prerequisites to me is a mountain. The spark, the motivation, to take the leap, is huge, and without it few have reason to trudge through the painful initial learning curve.

Teaching can help. It's hard and time-intensive and can be draining, but it's uniquely able to inspire and inform.

So I decided to try: I spent a week co-teaching a class with [Sarah MacWright](http://sarahmacwright.com/) at [Millbrook School](https://www.millbrook.org/) in upstate New York. With ten high schoolers, for five days of five hours a day, and we learned how to make the web. Here's how it went.

## Building the web with HTML, JavaScript, and CSS.

The choice of topic wasn't obvious or easy. As [_why astutely said in his Art && Code talk](https://vimeo.com/5047563), why would anyone choose to teach a just-starting programmer _three languages at the same time_? You could use a single language and a single environment, like Python or Ruby. But the end product matters: on the web, kids can share and brag about their creations. And they can connect to websites they already use in a new, fascinating way: view-source feels like understanding deeply.

Then, the question of abstraction: should we teach HTML or [Wordpress](https://wordpress.org/), or another CMS? Wordpress quickly makes real-looking websites, and spares kids the worst parts of the learning curve.

But our intent was to create deeper understanding and creative urges, not just to make websites. The pain of HTML, CSS, and JavaScript lets way to a different way of thinking about the web and a cheat code to understanding it in a universal light.

## The First Lesson

<img src='http://farm4.staticflickr.com/3818/13206604675_1281f5a8d2_b.jpg' class='white-on-white' />

The order of languages taught follows their difficulty level and  distance to the 'basic webpage': HTML for content, then CSS for style, and finally JavaScript for behavior.

I didn't want to start the class with a 'framework' or `Hello, world` on a white page. We need a better onramp: something that connects and entertains.

We used **'Inspect Element'**. Everyone opens the school homepage, and right-clicks on a title. They see their first pageful of confusing HTML, but have a clear mission: vandalism. In practice, it was gentle trolling: changing the name of the school to 'My School' and redesigning the page in fashionable shades of pink, amongst other tweaks.

![](http://farm4.staticflickr.com/3791/13204919343_c0d48d16a0_b.jpg)

Then we moved on to start changing behaviors and animations, by learning our first bits of JavaScript. Given a [Flappy Birds Clone](http://nebez.github.io/floppybird/), students typed their first lines of JavaScript, changing gravity, acceleration, the gap between pipes, and everything else.

This wasn't a lesson to teach the nitty-gritty. We imparted the hacker mentality, that we can change the stuff in computers, and braved the first sight of intimidating software code while ensuring kids felt positive and were having fun.

## The Nitty Gritty

The second day, we started building from scratch. I gave a short, simple [presentation on the basics of HTML](https://docs.google.com/presentation/d/1eM7T9WoA76fUBN8RuuuBNuJqFi4d3AIprcM-T0rR0nM/pub?start=false&loop=false&delayms=3000), and students followed along. Setting up text editors and learning how to save & refresh would have cost time, so we used [jsbin](http://jsbin.com/) to edit our first bits of HTML.<sup><a href='#html-editor'>1</a></sup> First, `Hello, world`, and then `Hello, <strong>world</strong>`. Then tinkering with tags and typing. In this early stage it's vital to have instant updates so kids can try variations quickly: this attempt-fail-succeed loop is where you learn.

Then, a [presentation about CSS](https://docs.google.com/presentation/d/1N6Bq7yFdyK1L1y5A3kfw5qn4aS9tP-dug5Ceyl_mfZQ/pub?start=false&loop=false&delayms=3000) and similar tinkering.

## Words Help Us Learn

![](http://farm4.staticflickr.com/3723/13209864244_2d2ba23711_b.jpg)

Around this point I noticed that my style of teaching didn't use terms effectively.

Words contain and define concepts, and they structure learning. Mine had blended together in day-to-day work, so I wasn't nearly discrete or precise enough in my language.

For instance, I should have taught the concept of matching HTML start tags to end tags as 'balancing', with exercises and analogies, not as a detail or peculiarity of language. Then you can talk about `balancing`, and kids can grasp why it's a common characteristic to the languages they learn. I needed to create words and mnemonics for when to use which brackets in which language. Familiar metaphors for syntax like `;` in JavaScript - "it's like the end of a sentence" helped students in a way that tens of mistakes wouldn't.

## First Bite of JavaScript

Then, the final language: JavaScript. I ran through [a quick presentation](https://docs.google.com/presentation/d/1R5Vm_H0wUBjKO-rh2w_UkA1Bv_VCAbfYW1nl3avgvWw/pub?start=false&loop=false&delayms=3000) and encouraged the class to try out examples in [mistakes.io](http://mistakes.io/).<sup><a href='#mistakes'>2</a></sup>

As expected, teaching JavaScript is significantly harder than HTML or CSS. These lessons, more than any others, identified disconnects between the world of code and the language of English.

* People are sentence-case by default. HTML is permissive, CSS is less, and JavaScript is even less.
* Balancing brackets like `method({})` requires a mental queue of what you still have to end. The ability to do this varied widely.
* It was remarkably easy to avoid an in-depth explanation of objects and JavaScript 'warts' like `this`.
* Explaining 'what happens when' in JavaScript is extremely hard.
* JavaScript error reporting in browsers, while great and improving, could always be better and friendlier.

Only two students decided to grapple with JavaScript for the rest of the class, and they constructed incredible games. For the rest of the class, this was just a glimmer, and a lesson I was divided on: the amount of knowledge you need to start using JavaScript is significant and its usefulness your first HTML/CSS websites is limited. But, conversely, as the only imperative programming language, it has creative and academic potential greater than any markup language.

## ~/Sites

The first lessons used online programming environments that imitated live-coding, but to move forward, we needed to start building websites - that means files, editing, and servers. We set up [Sublime Text 2](http://www.sublimetext.com/2) for each student, and I ran a Terminal window with `python -m SimpleHTTPServer` running from the `~/Sites` directory. Instead of just typing, students needed to save and click 'refresh' to see changes.<sup><a href='#autorefresh'>2</a></sup>

In usage, Sublime Text had a number of issues that made it feel like a sub-optimal choice.<sup><a href='#sublime'>1</a></sup> In hindsight, I might have used [TextWrangler](http://www.barebones.com/products/textwrangler/) instead, if an even-simpler text editor doesn't crop up.

## Exercises & Handouts

![](http://farm4.staticflickr.com/3670/13211272653_110d53a77b_b.jpg)

Sarah wisely added exercises to intermittently help kids solidify their learning and check that they understood what we were talking about. After each lesson, we would make a quick 'about me' page or a `<table>` of our favorite foods: tasks that encourage students to use their skills creatively.

Then we created 'cheatsheets' with [examples of HTML elements]((https://docs.google.com/a/macwright.org/file/d/0B4VvhLurSlaHSVVYNUFPdFJCNTA/edit) and tips for writing new pages. These were quickly and persistently adopted by the class.

## Student Projects

On day three, students began their projects: four students built photo portfolios, two built games, and four worked in a group creating a student blog with Tumblr.

## Portfolios

In an afternoon, I built a [simple template](https://github.com/tmcw/intersession/tree/gh-pages/starts/photos) for photo galleries, with concise HTML & CSS markup. By link-dropping a ZIP file of it on Dropbox, I gave students a running start on their projects: quickly we went towards Google Fonts for customization, switched to auto-advancing slides, tweaked colors and other details.

Seeing the students use the web as their medium was fascinating, especially in those who had experience in photography and framing. There grew new logical questions: how should a carousel work with different aspect ratios? Given infinite options for backgrounds, which complements their photography and style?

## Games

<img src='http://i.imgur.com/aXa7cAI.gif' width='100%' />

Though many expressed interest, only two students ended up building games. A freshman and senior, they started with the [Coquette](http://coquette.maryrosecook.com/) framework which provides fundamentals like collision detection and a canvas to draw on. The game above, called The Maze Raze, features an awesome hand-drawn player and this student's first use of trigonometry in the real world.

![](http://farm3.staticflickr.com/2760/13208020934_e4c327a043_b.jpg)

Another game, called Flying Mario, evolved from a side-scroller to a helicopter-like game with Mario-inspired graphics and style.

The games were far different in scope and skills than the other projects - there was an awesome moment where a student used trigonometry in the real world for the first time, making little pixel rectangle targets move in a video game. But we also bumped into some of the hard problems of games, like collision detection and how have different entities in the game exhibit different behavior.

I was fascinated by the 'tuning' tasks that students quickly mastered, like adjusting the ratio between gravity and jump height to make a game tricky, or designing a maze with nothing more than pixel coordinates and sizes of rectangles.

Coquette was fantastic for this purpose and let us focus mostly on actual topics and behavior of the games. For the small issues we found, I'm making notes to create examples or patches to make things even better.

## Integration

![](http://farm3.staticflickr.com/2820/13245703745_91bfcd8460_b.jpg)

At lunch on Thursday, I was talking with the math teacher about class, and reported that two of my students had used math: not just arithmetic, but multiplication, trigonometry, algebra.

I realized something I never had as a student: schools have multiple subjects that are independent. In each subject area, students can be two or more years ahead or behind, or can even opt-out.

The difference between how I barely learned in school and how I learn today is that I now jump subjects through combination. For instance, I wanted to learn statistics, so I wrote [simple statistics](https://github.com/tmcw/simple-statistics), bootstrapping my non-existent stats skills with my decent coding skills. This way you learn by application and avoid the knowledge vacuum. And you have the fun experience of finding new subjects within your range.

But when you don't know if students have taken tech class art class, you can't teach this way. And ideally, that's how you teach coding: you teach fundamentals, and then apply them everywhere, in math, in art, in English. Coding is a lever, and could be effectively learned as one. You could think of it as writing or reading - skills than you use for the whole journey.

## School Blog

The final project was a school blog, [brook-posts.com](http://brook-posts.com/). We chose to host it on Tumblr, since it permitted HTML & CSS editing, but also made the upkeep of a blog-like website less tricky. The places students took the site were interesting and awesome - after the have an understanding of HTML & CSS, they start asking more of 'custom': can we change layouts and design part of the site from scratch? And the mix of technical and non-technical tasks let students teach each other.

## Let's Talk URLs

Once the websites were in motion, I realized that we were missing an element of knowledge: URLs. How to link to pages, the difference between relative and absolute, and the different parts from `http://` to `.html`, are essential bits of learning that make the web make sense, and are often abstracted away. Chrome has experimented with hiding `http://` in the address bar, and students spend much of their time on singular websites, like Facebook. I never had the time to teach this, but I should have.

## Going Live

The final step was going live: putting portfolios & games on the internet, where students could pass around URLs or even put them on college applications. This was a surprising challenge to source: where, on the internet, can you just drag & drop files, for free, simply? It's easy to find application hosting like [Wordpress.com](http://wordpress.com/) or more advanced tools like [GitHub](https://github.com/)'s [`gh-pages`](http://pages.github.com/) functionality, but the low end is scarce.

<img src='http://farm3.staticflickr.com/2804/13207892025_d721601581_b.jpg' class='white-on-white' />

The answer came from an unexpected place: [neocities.org](http://neocities.org/), a [volunteer project](https://en.wikipedia.org/wiki/NeoCities) that captures the spirit of now-shuttered [GeoCities](https://en.wikipedia.org/wiki/GeoCities), worked perfectly. Registering for an account is simple, and uploading a site is just drag & drop. Since photos in portfolios were hosted on Flickr, all of the student projects were well under the 10MB storage limit. And in a moment that made my oldness visible, no-one in the class had heard of the once-popular GeoCities, so the name had no connotations.

## Landing

![](http://farm8.staticflickr.com/7145/13246463414_b93e0de368_b.jpg)

The class was a few weeks ago, and it's still sinking in. When I write code or try to explain a topic, there's a much greater range of considerations and possibilities, thanks to my sister and these students. Like any sort of teaching, the results will come in time - I hope that we inspired people to think creatively and feel like they can change and make more kinds of things.

Teachers reading this post will probably wince at my newbie mistakes.<sup><a href='#teaching'>5</a></sup> Without my sister's teaching ability, I would have only confused and bored this class. Like many non-teachers, I didn't know how to teach. But this is a new area, and is still a little mysterious to everyone. There's a blossoming of adult tech education, like [nodeschool.io](http://nodeschool.io/), and [Hacker School](https://www.hackerschool.com/) and its clones, but we're still looking for a good way to start earlier. Teachers and tech people alike are still finding what works and what doesn't.

And so, just like coding, I'm hoping to iterate. The things that didn't work, I have guesses for what would work better but they're only guesses. The variables of time, location, and demographics would all massively influence content & style.

The full class materials are [in a Github repository](https://github.com/tmcw/intersession) and are [CC0](http://creativecommons.org/publicdomain/zero/1.0/) licensed. If you're interested in trying out teaching, there are plenty of places to start, like [CoderDojo](http://www.coderdojo.com/), [TEALS](http://www.tealsk12.org/), [Citizen Schools](http://www.citizenschools.org/curriculum-category/science-technology/),  and [code.org](http://code.org/educate/hoc).

### Footnotes

* <a name='html-editor'></a>It was hard to choose a HTML editor that would work great: [Mozilla Thimble](https://thimble.webmaker.org/) was a first choice because of its great HTML error reporting, but I was expecting to need to save the output, and the Persona requirement was a deal-breaker. JSBin did well, but exhibited a few bugs and oddities: sometimes the cursor would jump to an incorrect spot, external links don't work in the right pane, and refreshing the right pane is somewhat unreliable. In the end, we didn't actually need to save output often in this stage, so Thimble would have fared well.
* <a name='mistakesio'></a>For the most part this was successful, but it made me realize that an even-simpler mistakes.io might be useful - something that slims it down to a single line of JavaScript and explains what that JS does in painstaking detail. You type `var foo = 4;` and it explains what every token means - you're creating a variable, called foo, assigning it to 4, which is a number, and ending the line with `;`. And it would give fantastic guidance for incorrect or incomplete input.
* <a name='sublime'></a>Unlicensed Sublime nags you for a license every few saves. Automatic bracket insertion was, in the vast majority of cases, counterproductive. I think that bracket insertion is an example of overoptimizing for writing code while crippling the experience of editing and rewriting code, which is very much the majority task. The 'tabs + sidebar' navigation was confusing. Disappearing tabs are poorly communicated by the interface, and tabs don't convey the difference between files with the same name in different folders. And by default, Sublime doesn't have JavaScript formatting and I didn't have enough time to configure a plugin for it (or find some hidden preference).
* <a name='autorefresh'></a>Autorefresh code does exist, of course, but given the time constraints and the limited ability of students to debug software, I went for the simplest route.
* <a name='teaching'></a>Incidentally, the school is also trying to find a teacher who could do technology, and it's a tough hunt. Resources that would help teachers cross over into technology seem pretty slim, and there aren't a lot of experienced educators who can or will cross-over. Perhaps this is an area where teacher fellowship programs can contribute.
