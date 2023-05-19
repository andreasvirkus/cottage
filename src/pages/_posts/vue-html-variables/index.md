---
title: vue html variables
layout: Post
description: Make use of dynamic env variables in your HTML
date: 2020-11-15
tags:
  - til
  - vue
---

Let's see how you can cut down on TLS handshake times by understanding
how we can leverage `vue-cli`'s environment variables in our `index.html` file.

## vue and dotenv

Vue's (as well as React's) ecosystem uses `.env` files to define its
[environment variables](https://cli.vuejs.org/guide/mode-and-env.html#modes-and-environment-variables).
These variables will be made available to you at compile-time under `process.env`,
as long as you prefix each variable with `VUE_APP_*`.
Therefore, you could target an environment-specific API with `process.env.VUE_APP_API_HOST`.

## preconnect

[`preconnect`](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/preconnect) is a powerful [resource hint](https://www.smashingmagazine.com/2019/04/optimization-performance-resource-hints/) via the HTML `<link>` tag, which goes into your
document's head. It tells the browser to establish a connection with the
target host in parallel to your CSS & JS still being loaded/parsed.
Meaning once your JS is parsed and it wants to make requests, the browser can
skip certain parts of initiating a connection, because preconnect has already
gone ahead and told the browser to do that way before we made the request. Namely, preconnect:

1. performs a DNS lookup (this can also be achieved with `<link rel="dns-prefetc">`
2. performs a TCP handshake
3. does TLS negotiation for HTTPS sites

I feel this is crucial for modern SPAs, where Time-To-Interactive
often suffers. Let's say that your SPA somehow establishes a user session with a
provider (imagine GitHub, Firebase, Auth0 or whatnot) & loads in some data from your API. You could speed up those for-sure-to-happen requests by preconnecting to their
hosts:

```html
<link rel="preconnect" href="https://api.example.com" />

<link rel="preconnect" href="https://login.example.com" />
```

## duct tape time

Whilst the example above is great for a proof of concept, ideally we'd want to
take our local, staging and other environments as close as possible to our production
setup. And resource hints should be no exception. In theory, you _could_ just spam your document's head full of preconnect tags, but please don't. This will tie up a
bit of resources on the target server and steal your own page's resources as it establishes
a connection with each domain.

Instead, we can leverage Vue's environment variables right in our `index.html` file!
If you're using `vue-cli`, you're all set already. If not, you'd have to configure the
[`html-webpack-plugin`](https://www.npmjs.com/package/html-webpack-plugin) yourself.

We'll have to use the [EJS](https://ejs.co/) template syntax in our HTML file, which
would make the 2 static tags above turn into:

```html
<link rel="preconnect" href="<%= VUE_APP_AUTH_DOMAIN %>" />

<link rel="preconnect" href="<%= VUE_APP_API_DOMAIN %>" />
```
