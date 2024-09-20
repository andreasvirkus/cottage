---
title: barebones API mocks in vue
description: JSON here, JSON there, JSON everywhere!
pubDate: 2023-12-05
tags:
  - javascript
  - vue
---

I've seen a lot of FE folks claim to be blocked by their fellow backend developers,
because they're waiting on a new API endpoint or a change to be introduced.
But if you got a working mouth on ya and they got a pair of ears (or vice-versa), there's no reason why
you shouldn't be able to just agree on the new API structure, and then you can be underway
with that new structure available to you just a few seconds later!

I'll share a quick hacky way of doing this first and then point you towards some proper mocking
tools, which have their own benefits.

## Modify the local dev server

The plus side of this first method is that you don't need to think about it too long.
Just pass it your JSON file with mocked data and you're off to the races. The example
below is for `vue-cli` or a vanilla Webpack config, but you can achieve this just as well
in [Vite](https://vitejs.dev/guide/api-javascript.html#vitedevserver).

```js
import users from './__mocks__/users.json'

module.exports = {
  devServer: {
    before: function(app, server) {
      app.get('/api/users/v2', function(req, res) {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(data))
      })
    }
  },
```

## Mock in your browser!

A pretty new option that sorta flew under the radar (at least for me) was that Chrome also introduced modifying payloads locally. And the changes persist across reloads!

More details:\
https://developer.chrome.com/docs/devtools/overrides/

## Proper mocking library

I rarely reach for these (just because of the initial setup involved), but once you get into the habit of using these during your development, they're super handy!
Mocking utilities have the added benefit of introducing controlled chaos to your requests. Meaning you can configure half of them to error out (throw 404 or 500), some of the requests to return an empty data set and so on. Because mocking can otherwise often have a curse of perfection attached to it. Here's 3 popular options:

1. [MirageJS](https://miragejs.com/)
2. [Parrot](https://github.com/americanexpress/parrot) is another popular choice
It has support for fancy scenarios, but you can also stick to very basic mocking.
3. You can also look into Mock Service Worker – [MSW](https://mswjs.io/)

I hope in the future you'll be more open to collaborate with your backend counterparts, lock those payload structures down quick and get to developing on day 1! 🚀
