---
title: thoughts
description: My thoughts and musings
layout: page
injectAllPosts: true
---

# thoughts

Here you can read 'bout my questionable opinions on
anything dev-related or just nice tips/hacks I enjoy having in my utility belt.

<hr>

page:: {{ posts }}

<posts-list :posts="posts"/>

<script>
import PostsList from '@/components/PostsList'

export default {
  props: ['page'],
  components: { PostsList },
  computed: {
    posts () {
      return this.page ? this.page.posts : []
    }
  }
}
</script>
