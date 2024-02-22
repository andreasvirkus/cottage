---
title: 'sort shopify products by availability'

description: Screw paid apps!
pubDate: 2024-02-23
tags:
  - snippet
  - liquid
  - shopify
---

I ran into a very basic issue and was surprised that Shopify didn't have a built-in, straightforward
solution for it. Let's say you'd love to sort your "out of stock" products towards the end of the list, so you hop over to your theme's code editor and slap a good ol' [sort](https://shopify.dev/docs/api/liquid/filters/sort) filter ontop of your products array, which sounds very fitting. But it seems Spotify can't
figure out how to sort boolean properties, so it leaves the array unchanged.

```liquid
{% assign sorted_products = collection.products | sort: 'available' %}

{% for product in sorted_products %}
  ... 👎
```

But we can luckily use the [where](https://shopify.dev/docs/api/liquid/filters/where) filter instead to achieve this, coupled with [concat](https://shopify.dev/docs/api/liquid/filters/concat). We'll create an array *with* our products and one *without* and then smoosh them together.

```liquid
{% assign available_products = collection.products | where: 'available' %}
{% assign out_of_stock_products = collection.products | where: 'available', false %}
{% assign products = available_products | concat: out_of_stock_products %}

{% for product in products %}
  ... 👍
```
