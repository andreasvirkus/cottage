---
title: "snippet #1 - Vue Logger"
layout: Post
description: Conditional logging - check!
date: 2019-11-07
tags:
  - snippet
  - javascript
---

One of the first things I do for new projects is to copy over some common utility files,
to keep in my handy `src/utils/` belt. Today, let's explore a member of that family -
`logger.js`

```js
export const logger = (...args) => process.env.DEBUG && console.log(...args)
```

This allows us to sprinkle `logger('quack')` statements all over our code,
without worrying of logging sensitive things in our production environment.
The spread operator allows us to pass in all included arguments, so they'd work
just like they do when you call `console.log('Variable:', someVar, '...meow')`

**Note** that you should use a proper logging library like
[winston long multiline link](https://github.com/winstonjs/winston) or
[bunyan](https://github.com/trentm/node-bunyan)
for Node.js.

We can also turn this into a [Vue plugin](https://vuejs.org/v2/guide/plugins.html#Using-a-Plugin).
`vue-cli` provides us with various [`.env`](https://cli.vuejs.org/guide/mode-and-env.html) files,
so make sure to add `VUE_APP_DEBUG=true` for
your `.env.local` or `.env.development` files (but definitely set it to false in `.env.production`)

```js
export const logger = (...args) => process.env.VUE_APP_DEBUG && console.log(...args)

export default {
  install (Vue) {
    Vue.prototype.$log = logger
  }
}
```

We still export the `logger` function, since it comes in handy in regular `.js` files,
e.g. for your router and store files.\
We can now import those in our entrypoint (e.g. `main.js`).
```js
import Vue from 'vue'
import logPlugin, { logger } from '@/src/utils/logger'

Vue.use(logPlugin)
new Vue({
  render: h => h(App)
}).$mount('#app')
logger('App mounted')
```

By using it as a plugin, it's always available in our Vue components without excessive
import statements. Note that multiple parameters work just like they do for `console.log`:
```html
<script>
export default {
  name: 'some-child',
  props: {
    msg: String
  },
  created () {
    this.$log('Child component created!', msg)
  }
}
</script>
```
