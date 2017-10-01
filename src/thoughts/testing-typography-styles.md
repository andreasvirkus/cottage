---
title: Testing typography styles
layout: post.hbs
description: Styling code and quote blocks and other various typography bits.
postDate: 2017-06-24
---

Every now and then, a blog will come across a need to quote someone or maybe
display a code snippet or two. Markdown, being the solid fella that it is,
takes care of generating the markup for us. But it's up to us to also carry
that semantic meaning over to the end user through visual means.

Since I lack content for the blog at this day and age, I thought, instead of
creating a temporary filler site, styling the elements, and then deleting it,
I'd leave the elements and their evolution of styles here for future reference
in the form of a blog post.

So let's run through some rudimentary elements essential for a half-decent blog!

Some headings:

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

And a content link style with sexy underlines - [Gargoyle Gigglypuff jamming it out](https://andreasvirkus.me)

- A
- List
- Of
- Sorts

A default line separator:

<hr>

Let's style a quote.

> Normality is a waste of potential.
>
> &mdash; Me

Then some default text styles (content by the ever-amusing [hipsum](https://hipsum.co)):

Edison bulb godard craft beer, leggings keytar organic XOXO disrupt irony hell of. Yuccie fam glossier, yr health goth la croix four dollar toast swag 3 wolf moon aesthetic waistcoat prism leggings tattooed. Farm-to-table pug listicle scenester blue bottle hashtag. Wayfarers food truck blue bottle celiac leggings. Pug waistcoat polaroid fingerstache messenger bag flannel tumeric migas pinterest salvia. Artisan ugh health goth unicorn keffiyeh pabst direct trade. Master cleanse coloring book meditation tbh fashion axe activated charcoal, shaman migas aesthetic gastropub health goth.

Swag occupy affogato flexitarian, locavore actually plaid cloud bread street art art party cardigan health goth. +1 mustache paleo tofu knausgaard neutra. Gluten-free hashtag umami, helvetica tilde meditation direct trade hot chicken tbh forage artisan. Tote bag helvetica quinoa vexillologist, blog air plant etsy asymmetrical la croix stumptown art party.


And now a code block:

```
Some monospaced sexiness!

const pi = 'I never remembered it :o';
```

Also the `<tbd>` element is great for writing inline styles!

Down the road, we'll add syntax highlighting with PrismJS to Metalsmith.
<!-- TODO: Link to that post in the future -->