---
title: 'increment a date in javascript'

description: "Dates are scary. Let's explore."
pubDate: 2020-04-04
tags:
  - javascript
---

Another quickie. Sometimes you want to increment a date without having to pull in the monster that is `moment.js`, `date-fns` or even the tiny `day.js`. Maybe you're restricted by your environment. Whatever the reason, it never hurts to know your way around some native APIs.

Let's say we need to display the current date _and_ a day a fortnight from now.

If you google for this, you'll find a [StackOverflow answer](https://stackoverflow.com/a/7751977/2803743)

```js
const fortnightAway = new Date(Date.now() + 12096e5)
```

Where `12096e5` is a representation of `1000 * 60 * 60 * 24 * 14`, which is 14 days in milliseconds. But we can do better.

```js
const date = new Date()
date.setDate(date.getDate() + 14)
```

The important thing to note is that modifier methods on our original `date` property (like `setDate()`)
modify the original date object in-place and return the new date's value in a smilar
manner as `Date.getNow()` would return. So whilst we could get the date again from the
return value, it's simpler to use the original date instance again.

So with this, we could implement something like

```js
const date = new Date()
const currentDate = date.toLocaleDateString('en-GB')
date.setDate(date.getDate() + 14)
const assignmentIsDue = date.toLocaleDateString('en-GB')
```

Which results in these dynamic dates <span class="emoji">👇</span>

Current - {{ currentDate }}

When your assignment is due - {{ assignmentIsDue }}

<script>
export default {
  name: 'increment-javascript-date',
  data() {
    const date = new Date()
    const currentDate = date.toLocaleDateString('en-GB')
    date.setDate(date.getDate() + 14)
    const assignmentIsDue = date.toLocaleDateString('en-GB')

    return { currentDate, assignmentIsDue }
  }
}
</script>
