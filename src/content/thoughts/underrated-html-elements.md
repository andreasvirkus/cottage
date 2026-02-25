---
title: the most underrated html elements

description: semantic elements that eliminate javascript
pubDate: 2026-02-25
draft: true
tags:
  - html
  - css
---

Every few months I see another React library for something that HTML already does natively.
A modal component with 400 lines of JS and a focus trap implementation. An accordion with
state management. A disclosure widget with animation hooks. Meanwhile, the browser has been
shipping elements that do all of this for free — you just have to know they exist.

Here are the HTML elements I think deserve more love.

## `<fieldset>` — the form disabler

I've [written about this before](/thoughts/properly-disable-forms), but it's worth repeating.
There's no `disabled` attribute on `<form>`. But `<fieldset disabled>` disables every form
control inside it. Inputs, buttons, selects — all of them. One attribute, zero JavaScript.

```html
<form>
  <fieldset disabled={isSubmitting}>
    <input type="text" name="email" />
    <button type="submit">Send</button>
  </fieldset>
</form>
```

Pair it with `display: contents` to remove the fieldset's default styling, and you
have a transparent wrapper that gives you form-wide disable control for free.

## `<details>` & `<summary>` — the accordion

The amount of JavaScript I've seen written to toggle the visibility of content is staggering.
Click handlers, state variables, aria attributes, animations — all to replicate what
`<details>` does out of the box.

```html
<details>
  <summary>How do I cancel my subscription?</summary>
  <p>You can cancel anytime from your account settings.</p>
</details>
```

It's keyboard accessible, screen-reader friendly, and has a built-in open/close toggle.
You get a `toggle` event for free if you need to react to state changes. And with a
bit of CSS, you can style it however you want.

```css
details summary {
  cursor: pointer;
  list-style: none; /* remove the default triangle */
}

details[open] summary::after {
  content: '−';
}

details:not([open]) summary::after {
  content: '+';
}
```

Want exclusive accordions where only one is open at a time? The `name` attribute
groups them together — no JavaScript needed.

```html
<details name="faq">
  <summary>Question 1</summary>
  <p>Answer 1</p>
</details>
<details name="faq">
  <summary>Question 2</summary>
  <p>Answer 2</p>
</details>
```

## `<dialog>` — the modal

If you've ever implemented a modal from scratch, you know the pain: focus trapping,
escape key handling, backdrop clicks, scroll locking, z-index wars, `aria-modal`,
returning focus to the trigger element... It's a lot.

`<dialog>` handles most of this natively:

```html
<dialog id="my-dialog">
  <h2>Are you sure?</h2>
  <p>This action cannot be undone.</p>
  <form method="dialog">
    <button value="cancel">Cancel</button>
    <button value="confirm">Confirm</button>
  </form>
</dialog>
```

```js
// That's it. That's the JavaScript.
document.getElementById('my-dialog').showModal()
```

`showModal()` gives you a proper modal with backdrop, focus trapping, and Escape to close.
The `method="dialog"` on the form closes the dialog and exposes the clicked button's
value via the dialog's `returnValue` property. It's elegant.

Style the backdrop with `::backdrop`, and you have a fully functional modal
with ~5 lines of JS.

## `popover` — tooltips and dropdowns

The newest addition to this list, and perhaps the most impactful. The `popover` attribute
turns any element into a popup that:

- Sits in the top layer (no z-index battles)
- Dismisses on outside click (light dismiss)
- Dismisses on Escape
- Can be toggled with a simple `popovertarget` attribute — **zero JavaScript**

```html
<button popovertarget="my-menu">Menu</button>

<div id="my-menu" popover>
  <a href="/settings">Settings</a>
  <a href="/logout">Log out</a>
</div>
```

That's a dropdown menu. No JS. No library. No `useRef` and `useEffect` to detect
outside clicks. The browser handles it all.

Combine it with CSS anchor positioning and you have positioned tooltips and popovers
that are aware of viewport boundaries — all declaratively.

## `<datalist>` — the autocomplete

Need a text input with suggestions? Before you install that autocomplete library:

```html
<input list="fruits" type="text" />
<datalist id="fruits">
  <option value="Apple" />
  <option value="Banana" />
  <option value="Cherry" />
</datalist>
```

It's not the most styleable element (browser defaults are pretty stubborn here),
but for internal tools, admin panels, or anywhere you just need functional autocomplete
without fuss — it's hard to beat.

## The pattern

There's a recurring theme: developers reach for JavaScript to solve problems that HTML
already handles. Not because the HTML solutions are hidden — they're on MDN, well-documented,
widely supported — but because we learn frameworks before we learn the platform.

Every one of these elements is keyboard accessible by default, works without JavaScript,
and degrades gracefully. That's a feature set no library can match, because it's baked
into the browser itself.

Next time you're about to `npm install` a UI primitive, check MDN first. You might
be pleasantly surprised.
