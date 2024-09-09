---
title: 'javascript bookmarklets'

description: Bring back bookmarklets to enhance your browsing experience
pubDate: 2020-02-16
tags:
  - javascript
---

Here's something novel: using [JavaScript bookmarklets](https://en.m.wikipedia.org/wiki/Bookmarklet) to enhance your web experience.
Since a bookmark follows the spec of an HTML anchor element's `href` attribute, then you can execute
inline JavaScript in it, same as you could write:

```html
<a href="javascript:alert('hullo reader')">Greetings</a>
```

<a href="javascript:alert('hullo reader')">Greetings</a>

There are a lot of nifty use-cases. For example, you might like using a certain web service. I'll take
YouTube Repeat as an example. If you've ever had an ear worm and you're tired of navigating back to that
YT tab just to hit the repeat button, then you can always append `repeat` before `.com` and it'll load
up the same song, ready to be played in a loop for your enjoyment.

```
https://www.youtube.com/watch?v=YDWEz1mia1I
👇
https://www.youtuberepeat.com/watch?v=YDWEz1mia1I
```

Now let's automate it via a bookmarklet. We'll start off with a self-invoking method:

```js
;(() => {
  const id = location.search.split('v=')[1]
  location.href = `https://youtuberepeat.com?v=${id}`
})()
```

And since browsers usually don't like whitespaces nor new-lines in their bookmark's location declarations,
we'll run it through a home-brewn minifier when stiching it together (or use a proper minifier online)

```js
const minify = (code) => code.replace(/\n/g, '')

minify(`
  javascript: (() => {
    const id = location.search.split('v=')[1];
    location.href = 'https://youtuberepeat.com?v=' + id;
  })();
`)
```

Now you can paste the output into the destination of a new bookmarklet, but the core of Open Web is
the ability to easily share and link to things. So here's the fun part - when you put it into an element's
`href` attribute, a user can click, hold & drag that link directly to their bookmarks bar! Note that
the textual content becomes the name for the bookmark.

<a href="javascript:(()=>{constid=location.search.split('v=')[1];location.href='https://youtuberepeat.com?v='+id;})();">Try it out!</a>

Here's another one as an example: I use this one to check for train times so I wouldn't have to enter
the starting point, destination and date every time I visit their URL:

```js
javascript: (() => {
  const d = new Date()
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  location.href = `https://elron.pilet.ee/et/otsing/Tondi/Tallinn/${`${d.getFullYear()}-${month}-${day}`}`
})()
```

I feel that this is all another great example of why we need to keep to the standards of the web and
make sure every part of our website/app is linkable, since it opens up new use-cases to old spec,
or allows us to resurface things like bookmarklets as the language gets more powerful.
