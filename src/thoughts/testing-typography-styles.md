---
title: Testing typography styles
layout: post-wip.hbs
description: Styling code and quote blocks and other various typography bits.
postDate: 06-24-2017
---

Every now and then, a blog will come across a need to quote someone or maybe
display a code snippet or two. Markdown, being the solid fella that it is,
takes care of generating the markup for us. But it's up to us to also carry
that semantic meaning over to the end user through visual means.

Since I lack content for the blog at this day and age, I thought, instead of
creating a temporary filler site, styling the elements, and then deleting it,
I'd leave the elements and their evolution of styles here for future reference
in the form of a blog post.

I'm big on using HTML elements as semantically as possible (or at least I think
I am).


&uarr; Above you can see the post style `<hr>` element.

&darr; Below you can see the default styles of an `<hr>` element.

<hr>

Let's style a quote.

> Normality is a waste of potential.
>
> &mdash; Me

And now a code block:
```
Some monospaced sexiness!

const pi = 'I never remembered it :o';
```

Down the road, we'll add syntax highlighting with PrismJS to Metalsmith.
<!-- TODO: Link to that post in the future -->
