---
description: My thoughts and musings
layout: page
---

# thoughts

Here you can read 'bout my questionable opinions on
anything dev-related or just nice tips/hacks I enjoy having in my utility belt.

<hr>

{{ page }}

<posts-list :posts="page"/>

<script>
import PostsList from '@/components/Posts'

export default {
  props: ['page'],
  components: { PostsList }
}
</script>
