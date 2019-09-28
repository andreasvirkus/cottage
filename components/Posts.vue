<template>
  <nav class="blog__menu content" role="navigation">
    <ol reversed class="blog__menu-links">
      <li v-for="(post, i) in posts" :key="i" class="blog__menu-item" :class="{ active: post.path === $router.path }">
        <saber-link :to="post.path" class="blog__menu-link">
          <div class="blog__menu-title">{{ post.frontmatter.pageTitle }}</div>
          <div class="blog__menu-date"
            :data-short-date="formatPostDate(post.frontmatter.postDate, true)">
            <time :datetime="post.frontmatter.postDate"
            >{{ formatPostDate(post.frontmatter.postDate) }}</time>
          </div>
        </saber-link>
      </li>
    </ol>
  </nav>
</template>

<script>
import { formatPostDate }  from '@/util'

export default {
  props: {
    posts: Object
  },
  methods: {
    formatPostDate: (date, short = false) => formatPostDate(date, short)
  }
}
</script>

<style>
.blog__menu-links {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding-left: 0;
  font-style: normal;
  margin-top: 0;
}

.blog__menu-link {
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: .5rem 0;
  text-decoration: none;
  border-bottom: 0;
  text-align: center;
  font-style: normal;
}

.blog__menu-title {
  position: relative;
  overflow: hidden;
  white-space: nowrap;
}

.blog__menu-date {
  margin-left: auto;
  flex-shrink: 0;
  padding-left: 7px;
}

@media (max-width: 70rem) {
  .blog__menu-links {
    list-style: none;
  }
  .blog__menu-date {
    display: none;
  }
  .blog__menu-date time {
    position: fixed;
    opacity: 0;
  }
  .blog__menu-date::before {
    content: attr(data-short-date);
  }
  .blog__menu-title {
    text-overflow: ellipsis;
  }
}
</style>
