---
layout: post
date: 2011-11-22 10:00:00 UTC
title: xtw - a menu bar item for taskwarrior
hn: 
categories:
- blog
- release
---

I think I've finally found the todo list of my dreams.
[Taskwarrior](http://taskwarrior.org/projects/show/taskwarrior) is
simple, open source (MIT), fast, and stays out of my way.

![TaskWarrior](/graphics/taskwarrior.png)

## XTW

I like it so much that I took a bit of time to learn some
Objective-C and write xtw.

![xtw](/graphics/xtw.png)

[xtw is a status bar widget](http://github.com/tmcw/xtw),
for Taskwarrior on OSX. All it does is give me
what [Todoist](http://todoist.com/) did
really well: a little number that gives you a heads-up-display
of your theoretical productivity. The name is small because it's
small, but it's more or less OS**X** **T**ask**w**arrior.

Right now it only shows you tasks to do, but it'll probably soon
show a bit more, and make it all much prettier. I'm still learning.

It's an interesting little foray into OSX development with
XCode and the whole thing. Objective-C looks absolutely disgusting
and I'm amazed that developers have source folders with spaces and...
even... `+` signs in them. Autocompletion is awesome,
[llvm](http://llvm.org/)-powered error messages are helpful, and
the libraries are huge.

The few open-source Cocoa projects I feel are diamonds in the rough,
even if you have to track down the source in Sourceforge or whatnot:
[Meteorologist](http://heat-meteo.sourceforge.net/) by Joe Crobak
was the invaluable push to learn how to make a menu bar item, a repeating
task, and the skeleton of an app that I desperately needed. xtw,
of course, is open source as BSD software, though it's an amateurish
effort.

## A tiny taste of Taskwarrior

So Taskwarrior just got me: it has the right form of encouragement
when you finish tasks, the right amount of interface and shortcut, and
a relatively good chance at being portable if I switch operating systems
some time in the future.

It makes shortcuts more straightforward:

{% highlight sh %}
alias t="task"
alias tl="task list"
alias ta="task add"
alias td="task done"
{% endhighlight %}

And if something else becomes really common, I can alias that too -
just like I do with [git](http://git-scm.com/) commands.

And the format for the files is pretty darn readable - a line of a task
(indentation mine) looks like

{% highlight js %}
[description:"hover help text in autocomplete"
    entry:"1320767263"
    status:"pending"
    uuid:"c2c14914-7e62-4af7-985c-e0037524557b"]
{% endhighlight %}

All in all, I think that the Taskwarrior crew has got it right -
they aren't overarchitecting a solution, and it's a tool that feels
natural alongside other Unix-like tools.

On OSX, you can install it with [Homebrew](http://mxcl.github.com/homebrew/)
in just one line:

{% highlight sh %}
brew install task
{% endhighlight %}
