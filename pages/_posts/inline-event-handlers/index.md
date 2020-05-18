---
title: 'inline event handlers'
layout: Post
description: Sometimes an HTML file is all you need
date: 2020-05-18
tags:
  - til
---

I recently realised that an HTML event handler has access to the DOM node via `this` in
its inline event handlers. That means you could do silly things like

```html
<button onclick="this.style.background = 'tomato'">Paint me!</button>
```

<button onclick="this.style.background = 'tomato'">Paint me!</button>

And a nifty use-case for this might be unidirectional interactions, e.g. a "Read more" block.

Maybe you're hosting a very simple static file (e.g. your next side-project's documentation
or an event page on GitHub pages, Netlify, what-have-you). And adding a separate
JS file, linking to it, looking up an element, adding a listener, .... maybe you can't be arsed 🙊.

So here's a simple "Read more" element, that manipulates the `classList` API in the click handler:

```html
<div onclick="this.classList.add('expanded')">
  <div class="wrapper">
    <p>Long text here..</p>
  </div>
  <button class="optional-trigger-element">Read more</button>
</div>
```

```css
.wrapper {
  position: relative;
  overflow: hidden;
  max-height: 100px;
  transition: max-height 700ms cubic-bezier(0.645, 0.045, 0.355, 1);
}
.expanded .wrapper {
  max-height: 600px;
}
.expanded .trigger {
  display: none;
}
```

<div onclick="this.classList.add('expanded')">
  <div class="wrapper">
    <p><strong>Example of long text.</strong> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc</p>
  </div>
  <button class="trigger">👇 Read more</button>
</div>

---

Okay, I may have lied before. We're not actually limited to a single direction here.
Let's make the example above collapsible as well:

<div>
  <div class="wrapper">
    <p><strong>Example of long text.</strong> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc</p>
  </div>
  <button class="trigger-expand" onclick="this.parentNode.classList.add('expanded')">👇 Read more</button>
  <button class="trigger-collapse" onclick="this.parentNode.classList.remove('expanded')">👆 Show less</button>
</div>

We're placing the click handler on a separate trigger element and keeping the
expand/collapse triggers as two separate elements. We can still change the class
on the wrapper element by accessing it via `this.parentNode` in the handler

```html
<div>
  <div class="wrapper">
    <p>More text...</p>
  </div>

  <button class="trigger-expand" onclick="this.parentNode.classList.add('expanded')">👇 Read more</button>
  <button class="trigger-collapse" onclick="this.parentNode.classList.remove('expanded')">👆 Show less</button>
</div>
```

```css
.trigger-collapse,
.expanded .trigger,
.expanded .trigger-expand {
  display: none;
}
.expanded .trigger-collapse {
  display: block;
}
```

<div class="foxy-box -padded-m">
  <strong>PS (minirant)</strong> - going back to basics like this example feels very
  empowering to me. Knowing that I do not have to reach for tens or hundreds of
  kilobytes of JavaScript and various rendering libraries to accomplish simple
  interaction. It's like getting a fire started in the woods with a stick and some string.
</div>

Why would you want to do all this instead of separating your logic in a separate file?
Who knows... but now you know how to.

<style>
.wrapper {
  position: relative;
  overflow: hidden;
  max-height: 112px;
  background-color: #CECECE;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  padding: 12px;
  transition: max-height 400ms cubic-bezier(0.645, 0.045, 0.355, 1);
}
.expanded .wrapper {
  max-height: 600px;
}
.trigger-collapse,
.expanded .trigger,
.expanded .trigger-expand {
  display: none;
}
.expanded .trigger-collapse {
  display: block;
}
button {
  background: none;
  font-size: 16px;
  font-family: inherit;
  margin-top: 8px;
  border-radius: 4px;
}
</style>
