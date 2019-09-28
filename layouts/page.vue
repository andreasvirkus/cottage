<template>
  <div class="theme-container">
    <search-box/>
    <sidebar/>

    <main class="content">
      <slot name="default"/>
    </main>

    <page-footer :page="page"/>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
import SearchBox from '@/components/SearchBox'
import PageFooter from '@/components/PageFooter'

export default {
  name: 'page',
  props: ['page'],
  components: {
    Sidebar,
    SearchBox,
    PageFooter
  },
  head () {
    const { title, description, excerpt } = this.page
    return {
      title: title
        ? `${title} | ${this.$siteConfig.title}`
        : this.$siteConfig.title,
      meta: [
        {
          name: 'description',
          content: description || excerpt || this.$siteConfig.description
        }
      ]
    }
  }
}
</script>

<style>
.content {
  padding-bottom: 2rem;
}

.page-nav {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-height: 3rem;
}
.page-nav.next {
  margin-left: auto;
}

#nprogress .bar {
  background: red !important;
}

.page-enter-active, .page-leave-active {
  transition: opacity .5s;
}
.page-enter, .page-leave-to {
  opacity: 0;
}

@media (max-width: 35em) {
  .prev {
    display: block;
    margin-bottom: .5rem;
  }
  .prev + .next {
    margin-top: .5rem;
  }
}
</style>
