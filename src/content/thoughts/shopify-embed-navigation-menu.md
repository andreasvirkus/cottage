---
title: 'shopify – embed navigation menu'

description: Navigate the way
pubDate: 2024-02-23
tags:
  - snippet
  - liquid
  - shopify
---

Couple of things bundled together in this one. I needed to present users with
a way to quickly navigate between the product categories (different collections).

As I already had them defined in the main navigation & I didn't want to manually keep
the two menus in sync, I figured I could just grab the links/structure from the main nav.

However, when wanting to pipe `linklists.main-menu.links` through the `| json` filter to see its output, I was met with:

```sh
{"error":"json not allowed for this object"}
```

Turns out JSON is not a universal utility/transformer and your filterable object must have it
defined as a method. LinkList children do not have such a method available 😑

But... you can either target your specific menu structure directly with indexes *or* loop through
all of the main menu's children and then pick out the specific link you need, for example based on the `handle` or the `url`.
As my product categories were quite a few levels deep and I do not expect the overall nav
hierarchy to change anytime soon, I went with the indexed access.

```liquid
{% for link in linklists.main-menu.links[0].links[1].links %}
```

Now before we continue, I must warn you that there's a little bit of ugly HTML hacking incoming. Still here? Well anyway... you could create your own dropdown and have a JS listening to its value change, etc. But I just slapped together a `select` element with an `onchange` listener (you [already know](https://andreasvirkus.me/thoughts/inline-event-handlers/) I like simplistic solutions like this). This allows the user to hop
to the next page whenever they select a new value from the dropdown:


```liquid
<select onchange="location = this.value" style="font-size:1.6rem;margin-left:-2rem;">
  {% for link in linklists.header-menu.links[0].links[1].links %}
    {% if link.url contains collection.handle %}
    <option selected="selected" value="{{ link.url }}">{{ link.title }}</option>
    {% else %}
    <option value="{{ link.url }}">{{ link.title }}</option>
    {% endif %}
  {% endfor %}
</select>
```

And that's it! You now have a dropdown menu with product category links.
