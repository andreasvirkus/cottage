---
title: "do your pixels justice"
layout: Post
description: Respect your elders. I mean... your pixels!
date: 2020-02-16
tags:
  - javascript
---

This is a quick one. A small CSS rule that will come in super handy when you
need to blow up a pixel image (QR code is an excellent example of this)
or you don't know in what size it'll be displayed.

```css
image-rendering: pixelated;
```

This is a QR code in its original size (note how small we can keep the images with this technique!)

<img src="./qrcode.png" width="48" height="48">

And now this is the same image scaled up (both are full-width, so make sure to stretch out your browser to see how the effect scales), but the second image has `image-rendering` set to `pixelated`.

<img src="./qrcode.png" style="width:100%">

Now that's better 👇
<img src="./qrcode.png" style="width:100%" class="pixelated">

<style>
.pixelated {
  image-rendering: pixelated;
}
</style>
