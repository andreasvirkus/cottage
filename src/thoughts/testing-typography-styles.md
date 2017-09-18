---
title: Testing typography styles
layout: post.hbs
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

So let's run through some basic elements rudimentary for a half-decent blog!

Some headings:

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

And a content link style with sexy underlines - [Gargoyle Gigglypuff jamming out](www.google.com)

- A
- List
- Of
- Sorts

<hr>

Above you can see the default

Let's style a quote.

> Normality is a waste of potential.
>
> &mdash; Me

And now a code block:
```
Some monospaced sexiness!

const pi = 'I never remembered it :o';
```

Also the `<tbd>` element is great for writing inline styles!

Down the road, we'll add syntax highlighting with PrismJS to Metalsmith.
<!-- TODO: Link to that post in the future -->
