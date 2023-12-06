---
title: 'snippet #5 - csp hashing'

description: Secure inline scripts
pubDate: 2021-01-13
tags:
  - snippet
  - javascript
---

Another quick one - if you've ever wanted to add a short inline snippet to a
site that's properly locked down with [Content Security Policies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/), then you can add the following to your CSP to whitelist it.

```
'<hash-algorithm>-<base64-value>'
```

The supported algorithms are sha256, sha384 or sha512. It also works for CSS and from
CSP 3.0 it'll even work for the `script-src` directive for external scripts!

The snippet that we'll be hashing is currently loaded in this document's `<head>`:

```js
if (localStorage.getItem('theme')) document.documentElement.dataset.theme = localStorage.getItem('theme')
```

And this is what I used to get the necessary hash for my CSP:

```js
import crypto from 'crypto'

const generateChecksum = (str) => crypto.createHash('sha256').update(str, 'utf8').digest('base64')
const script =
  'if (localStorage.getItem("theme")) document.documentElement.dataset.theme = localStorage.getItem("theme")'

console.info(`sha256-${generateChecksum(script)}`)
```

Which produces: `'sha256-xrvJjXPsVTsDWETQpggIjt8GbIuC6Sc86vw0ry9JYG4=';`

You can save it in a file, swap the script for yours (be sure to minify it first,
since it needs to match the hash down to every whitespace) and run it with Node.
Best of luck staying safe!
