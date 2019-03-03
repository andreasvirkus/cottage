<template>
  <nav class="blog__menu content" role="navigation">
    <ol reversed class="blog__menu-list">
      <li v-for="(post, i) in posts" :key="i" class="blog__menu-item" :class="{ active: post.path === $router.path }">
        <router-link :to="post.path" class="blog__menu-link">
          <div class="blog__menu-title">{{ post.frontmatter.pageTitle }}</div>
          <div v-if="false"
            class="blog__menu-date"
            :data-short-date="formatPostDate(post.frontmatter.postDate, true)">
            <time :datetime="post.frontmatter.postDate">{{ formatPostDate(post.frontmatter.postDate) }}</time>
          </div>
        </router-link>
      </li>
    </ol>
  </nav>
</template>

<script>
import { formatPostDate}  from './util'

export default {
  props: {
    posts: Array
  },
  methods: {
    formatPostDate: (date, short = false) => formatPostDate(date, short)
  }
}
</script>

<style lang="stylus">
@import './css/variables.css'

.blog__menu-list {
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
    // width: 50%;
}
.blog__menu-link::before {
    // content: '';
    left: 0;
    bottom: 1rem;
    width: 100%;
    height: 2px;
    background-color: var(--dark-accent-color);
    position: absolute;
    transition: transform .5s ease;
    transform: scaleX(0);
}

.blog__menu-title {
  overflow: hidden;
  white-space: nowrap;
}

.blog__menu-date {
    margin-left: auto;
    flex-shrink: 0;
    padding-left: 7px;
}


@media (min-width: 35rem) {
  .blog__menu-title::after {
    letter-spacing: 4px;
    // content: " .........................................................................";
  }
}

@media (max-width: 70rem) {
  .blog__menu-list {
    list-style: none;
  }
  .blog__menu-date {
      padding-left: 0;
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
