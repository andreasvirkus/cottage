<template>
  <aside ref="menu" class="menu" :class="{ 'menu--open': open }" role="navigation">
    <!-- <div class="menu__waves">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#273036"
          fill-opacity="1"
          d="M0,192L26.7,181.3C53.3,171,107,149,160,149.3C213.3,149,267,171,320,170.7C373.3,171,427,149,480,138.7C533.3,128,587,128,640,133.3C693.3,139,747,149,800,160C853.3,171,907,181,960,186.7C1013.3,192,1067,192,1120,170.7C1173.3,149,1227,107,1280,74.7C1333.3,43,1387,21,1413,10.7L1440,0L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"
        ></path>
      </svg>
    </div> -->

    <nav class="menu__list">
      <!-- <div class="menu__blob" :style="{ '--activeIndex': activeLinkIndex }"></div> -->
      <saber-link v-for="link in links" :key="link.path" :to="link.path" class="menu__link">{{
        link.label
      }}</saber-link>
    </nav>
  </aside>
</template>

<script>
// const emojis = ['👾', '😶', '🐨', '🐹', '🦊', '🧙‍♂️', '🚀']
const emojis = ['👾', '🦊', '🙊', '🐹']

export default {
  name: 'Sidebar',
  data() {
    return {
      menu: null,
      open: false,
      narrowViewport: false,
      pathEl: [],
      paths: [],
      links: [
        {
          label: `H${emojis[0]}me`,
          path: '/'
        },
        {
          label: 'Me',
          path: '/about'
        },
        {
          label: 'Thoughts',
          path: '/thoughts'
        },
        {
          label: 'Contact',
          path: '/contact'
        }
      ]
    }
  },
  props: ['page'],
  computed: {
    activeLinkIndex() {
      const path = this.$route.path
      if (path.startsWith('/thoughts')) return 2
      return this.links.findIndex(link => link.path === path || link.path + '/' === path) || 0
    }
  },
  watch: {
    '$route.path'() {
      this.$set(this.links[0], 'label', `H${emojis[this.activeLinkIndex]}me`)
    }
  },
  methods: {
    pickRandomEmoji() {
      return emojis[Math.floor(Math.random() * emojis.length)]
    }
  }
}
</script>

<style>
.menu {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 3;
  border-top: 15px solid var(--accent-primary);
  transition: transform 0.6s, top 0.4s;
}
.menu__list {
  position: relative;
  display: flex;
  flex-direction: row;
  text-align: center;
  padding: 8px 0;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}
.menu__link {
  padding: 8px;
  cursor: pointer;
  flex-grow: 1;
  line-height: 1;
  transition: transform 0.2s ease-out;
}
</style>
