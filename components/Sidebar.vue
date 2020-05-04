<template>
  <aside ref="menu" class="menu" :class="{ 'menu--open': open }" role="navigation">
    <div class="menu__waves">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#273036"
          fill-opacity="1"
          d="M0,192L26.7,181.3C53.3,171,107,149,160,149.3C213.3,149,267,171,320,170.7C373.3,171,427,149,480,138.7C533.3,128,587,128,640,133.3C693.3,139,747,149,800,160C853.3,171,907,181,960,186.7C1013.3,192,1067,192,1120,170.7C1173.3,149,1227,107,1280,74.7C1333.3,43,1387,21,1413,10.7L1440,0L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"
        ></path>
      </svg>
    </div>

    <nav class="menu__list">
      <div class="menu__blob" :style="{ '--activeIndex': activeLinkIndex }"></div>
      <saber-link v-for="link in links" :key="link.path" :to="link.path" class="menu__link">{{
        link.label
      }}</saber-link>
    </nav>
  </aside>
</template>

<script>
const emojis = ['👾', '😶', '🐨', '🐹', '🦊', '🧙‍♂️', '🚀']

export default {
  name: 'sidebar',
  data() {
    return {
      menu: null,
      open: false,
      narrowViewport: false,
      pathEl: [],
      paths: [],
      links: [
        {
          label: this.pickRandomEmoji(),
          path: '/'
        },
        {
          label: 'me',
          path: '/about'
        },
        {
          label: 'thoughts',
          path: '/thoughts'
        },
        {
          label: 'contact',
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
      this.$set(this.links[0], 'label', this.pickRandomEmoji())
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
  position: fixed;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 5;
  transition: transform 0.6s, top 0.4s;
}
.menu::before {
  content: '';
  display: block;
  position: absolute;
  height: 84vh;
  top: 6vh;
  left: 100%;
  z-index: 5;
  width: 2px;
  background-color: #22223320;
}
.menu__list {
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 2rem 0;
  margin-top: 6vh;
}
.menu__link {
  padding: 1rem 2rem 1rem 3.5rem;
  cursor: pointer;
  flex-grow: 1;
  line-height: 1;
  transition: transform 0.2s ease-out;
}
.menu__blob {
  position: absolute;
  top: 2.45rem;
  right: -0.25rem;
  width: 6px;
  height: 2.75rem;
  border-radius: 3px;
  background-color: var(--color-background);
  transform: translateY(calc(var(--activeIndex, 0) * 3rem));
  transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
.menu__waves {
  display: none;
}
@media screen and (min-width: 74rem) {
  .menu__link:hover {
    transform: translateX(0.75rem);
  }
}
@media screen and (max-width: 74rem) {
  .menu {
    bottom: 0;
    top: initial;
    height: auto;
    width: 100vw;
    border: none;
    background-color: #273036;
  }
  .menu::before {
    content: none;
  }
  .menu__list {
    flex-direction: row;
    width: 100%;
    padding: 0 1rem;
    margin: 0 auto;
    max-width: 35rem;
  }
  .menu__link {
    position: relative;
    font-size: 0.875rem;
    padding: 1rem 0 1.4rem;
    color: #cecece;
    transition: border-color 0.3s ease-out;
  }
  .router-link-exact-active {
    color: white;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-shadow: 2px 2px 0px #666, 7px 7px 0px rgba(0, 0, 0, 0.2);
  }
  .menu__blob {
    display: none;
  }
  .menu__waves {
    display: block;
    position: absolute;
    z-index: -1;
    bottom: 1rem;
    left: 0;
    right: 0;
  }
  @keyframes animateWave {
    0% {
      transform: scale(1, 0);
    }
    100% {
      transform: scale(1, 1);
    }
  }
  .menu__waves > svg {
    display: block;
    transform-origin: bottom;
    animation: animateWave 1000ms cubic-bezier(0.23, 1, 0.32, 1) forwards;
  }
}
</style>
