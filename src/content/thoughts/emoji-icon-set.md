---
title: 'emoji icon set'

description: built-in icons, stylized
pubDate: 2020-05-10
tags:
  - snippet
  - css
---

Before emojis, we had emoticons (dating back all the way to [1881](https://twitter.com/Libroantiguo/status/560209307393097730)).
Then kaomojis took over our forums and online communities. Now, as [92%](https://www.wired.com/2016/04/the-science-of-emoji/?mbid=GuidesLearnMore)
of all people online use emojis, they're also becoming more and more common in web design trends.

Whilst you can swing for colourful emojis like everyone else in the webosphere, today
I'd want to show a neat trick of making native emojis solid-coloured or keeping only
their outline. It might not be the most practical knowledge, but maybe it could
jive with your next project's visual vibe or grant some minimalism, to keep the design
a little more grounded and prevent it from being too colourful.

We can achieve it with just a couple lines of CSS! The benefits here might be that

1. they're "installed" for everyone, so there's nothing to download (performance <span class="emoji">⚡️</span>)
2. you don't need to add Yet Another Dependency™ to your project (great for prototyping)
3. the selection is huge _and_ growing + almost all users find the figures already familiar
4. it's a bit of a different look to regular emojis and could look rather tasteful when done right
5. you won't have to properly title all the icons you use, since emojis are [quite accessible](https://www.perkinselearning.org/technology/blog/how-do-people-vision-impairments-use-emoji) out-of-the-box.

_Side note: Perkins has some pretty great articles that give you amazing insights on how various people use software that you build - check them out!_

All we need to get started are **2** lines of CSS!
(Note that a separate class or data-emoji might be more aligned with
best practises, but I like the way `<span emoji>` feels when I write it)

```css
span[emoji] {
  color: transparent;
  text-shadow: 0 0 #cecece;
}
```

```html
<div>
  <span emoji>🐱</span>
  <span emoji>⭐</span>
  <span emoji>👉</span>
  <span emoji>💎</span>
  <span emoji>👌</span>
</div>
```

This will get us solid-filled icons 👇

<div>
  <span emoji>🐱</span>
  <span emoji>⭐</span>
  <span emoji>👉</span>
  <span emoji>💎</span>
  <span emoji>👌</span>
</div>

We can now take this one step further by giving them an outline with `text-shadow`.

```css
.stroke {
  text-shadow:
    0 0 white,
    -1px -1px 0 #4a4a4a,
    1px -1px 0 #4a4a4a,
    -1px 1px 0 #4a4a4a,
    1px 1px 0 #4a4a4a;
}
```

<div>
  <span emoji class="stroke">🐱</span>
  <span emoji class="stroke">⭐</span>
  <span emoji class="stroke">👉🏿</span>
  <span emoji class="stroke">💎</span>
  <span emoji class="stroke">👌</span>
</div>

<style>
span[emoji] {
  font-size: 4rem;
  color: transparent;
  text-shadow: 0 0 #CECECE;
}

span[emoji].stroke {
  text-shadow: 0 0 white,
   -1px -1px 0 #4A4A4A,
    1px -1px 0 #4A4A4A,
    -1px 1px 0 #4A4A4A,
     1px 1px 0 #4A4A4A;
}

span[emoji].no-select {
  user-select: none;
}
p::selection span[emoji].highlight,
span[emoji].highlight::selection {
  text-shadow: 0 0 tomato;
}
</style>

The only odd part is that when a user selects some part of the text that contains this
emoji, it'll display the emoji in its original coloured form. To work around this (if you'd like) you should either

- set the emoji to have `user-select: none;`
- override the highlighted styles with the `::selection` pseudo-class

Highlight this block for a demo of all three:\
A) <span emoji>💩</span>\
B) <span emoji class="no-select">💩</span>\
C) <span emoji class="highlight">💩</span>

That's all there is to it. Hope you can put this to use in your next project. As always...
