---
title: 'properly disable forms'

description: utilise fieldset for better ux
pubDate: 2025-10-12
tags:
  - snippet
  - html
---

Not sure if it's ever caused you sleepless nights, but there's no way to disable an HTML form. Sure you can disable the
submit button, and _seemingly_ you've now prevented the user from submitting. But oh heavens! They're a power user
and rarely use the submit button - since you've provided them with nice semantic HTML, they can just use `Enter` to submit
the form from any input field in focus. In theory we could just duplicate the submit button's disabled condition and
check for it in our form's handler. But what if we really believe in progressive enhancement or wouldn't want to sully our
form handler for larger & more complex forms?

Luckily, there's a simple work-around: the `fieldset` element. With a disabled fieldset, all descendants are disabled as well. Usually, the fieldset element is used to group several controls within a form. But it is also perfectly valid to only have a single fieldset in a form.

```html
<form>
  <fieldset disabled>
    <!-- your form controls -->
    <button>Disabled when fieldset is disabled</button>
  </fieldset>
</form>
```

You probably already have some CSS styling that should apply to disabled form controls. This usually also works within a field set without changing anything. Just make sure to use the proper selectors, i.e. `button:disabled` instead of `button[disabled]`.

By default, most browsers apply a border and some spacings to fieldset elements. That makes sense if they are actually used to group different form controls together. But for this use case, we likely don't want that default styling. You could remove spacings and the border with the usual CSS
```css
padding: 0;
margin: 0;
border-width: none;
```

But it is even better to set `display: contents` which has the effect that the fieldset—but not is descendants—is visually removed. That resolves problematic spacings and properly falls back to collapsing margins.

```css
fieldset {
  display: contents;
}
```