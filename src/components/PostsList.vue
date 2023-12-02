<template>
  <nav class="content" role="navigation">
    <ol reversed :class="$style.links">
      <li v-for="post in posts" :key="post.permalink" :class="$style.item">
        <saber-link :to="post.permalink" :class="$style.link">
          <div :class="$style.title">{{ post.title }}</div>
          <div :class="$style.subtitle" :data-short-date="formatPostDate(post.createdAt, true)">
            <time :datetime="post.createdAt">{{ formatPostDate(post.createdAt) }}</time>

            <span :class="$style.tags">
              <code v-for="tag in post.tags" :key="tag">{{ tag }}</code>
            </span>
          </div>
          <div v-html="stripTags(post.excerpt)" :class="$style.excerpt"></div>
        </saber-link>
      </li>
    </ol>
  </nav>
</template>

<script>
import { formatPostDate } from '@/util'

export default {
  name: 'PostsList',
  props: {
    posts: Array,
  },
  methods: {
    formatPostDate,
    stripTags(html) {
      return html.replace(/<(?:.|\n)*?>/gm, '')
    },
  },
}
</script>

<style module>
.links {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-top: 2rem;
  list-style: decimal-leading-zero;
}

.link {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 3rem;
  font-size: 1.6rem;

  padding: 2rem;
  border-radius: 4px 4px 0 0;
  box-shadow: 0 20px 30px -20px rgb(0 0 0 / 15%);
}
.link:hover {
  background: transparent;
  box-shadow: 0 30px 40px -30px rgb(0 0 0 / 50%);
}

.title {
  font-size: 1.4rem;
}

.subtitle,
.excerpt {
  font-size: 0.875rem;
  opacity: 0.8;
}

@media screen and (max-width: 70rem) {
  .links {
    list-style: none;
    padding: 0;
  }
}
</style>
