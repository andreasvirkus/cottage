<template>
  <main class="content blender">
    <slot/>

    <div class="blender__reel">
      <button :disabled="prevBtnDisabled" class="blender__nav" @click="goPrevious">&lang;</button>

      <video v-if="renderType === VIDEO" :src="activeRender.url" loop muted autoplay class="blender__render" />
      <img v-else :src="activeRender.url" class="blender__render" />

      <button :disabled="nextBtnDisabled" class="blender__nav" @click="goNext">&rang;</button>
    </div>

    <p>Explore the list below!</p>

    <hr />

    <h3>video renders (🎥)</h3>

    <ul>
      <li v-for="render in videos" :key="render.label">
        <a :href="render.url" target="_blank" rel="noopener noreferrer nofollow" @click.prevent="switchActiveRender(render)">
          {{ render.label }}
        </a>
      </li>
    </ul>

    <h3>still renders 🌁</h3>

    <ul>
      <li v-for="render in stills" :key="render.label">
        <a :href="render.url" target="_blank" rel="noopener noreferrer nofollow" @click.prevent="switchActiveRender(render)">
          {{ render.label }}
        </a>
      </li>
    </ul>
  </main>
</template>

<script>
const STATIC = 'static'
const VIDEO = 'video'

const videos = [
  {
    label: 'donut',
    url: 'https://github.com/andreasvirkus/blender-fiddles/blob/master/donut/renders/le_donut.mov?raw=true',
  },
  {
    label: 'pendulum.row.1',
    url: 'https://github.com/andreasvirkus/blender-fiddles/blob/master/pendulum_row/renders/final.1.mov?raw=true',
  },
  {
    label: 'pendulum.row.2',
    url: 'https://github.com/andreasvirkus/blender-fiddles/blob/master/pendulum_row/renders/final.3.mov?raw=true',
  },
  {
    label: 'pendulum.row.3',
    url: 'https://github.com/andreasvirkus/blender-fiddles/blob/master/pendulum_row/renders/final.4.mov?raw=true',
  },
  {
    label: 'pendulum.cross.1',
    url: 'https://github.com/andreasvirkus/blender-fiddles/blob/master/pendulum-crossing/render.1.mp4?raw=true',
  },
  {
    label: 'pendulum.cross.2',
    url: 'https://github.com/andreasvirkus/blender-fiddles/blob/master/pendulum-crossing/render.3.mp4?raw=true',
  },
]

const stills = [
  {
    label: 'donut.1',
    url: 'https://github.com/andreasvirkus/blender-fiddles/blob/master/donut/renders/donut.render.2.png?raw=true',
  },
  {
    label: 'donut.2',
    url: 'https://github.com/andreasvirkus/blender-fiddles/blob/master/donut/renders/donut.render.3.png?raw=true',
  },
  {
    label: 'donut.3',
    url: 'https://github.com/andreasvirkus/blender-fiddles/blob/master/donut/renders/donut.render.7.denoised.png?raw=true',
  },
  {
    label: 'donut.4',
    url: 'https://github.com/andreasvirkus/blender-fiddles/blob/master/donut/renders/donut.render.8.png?raw=true',
  },
  {
    label: 'cup.1',
    url: 'https://github.com/andreasvirkus/blender-fiddles/blob/master/donut/renders/cup.render.1.png?raw=true',
  },
  {
    label: 'cup.2',
    url: 'https://github.com/andreasvirkus/blender-fiddles/blob/master/donut/renders/cup.render.3.png?raw=true',
  },
  {
    label: 'cup.3',
    url: 'https://github.com/andreasvirkus/blender-fiddles/blob/master/donut/renders/water.render.1.png?raw=true',
  },
  {
    label: 'cup.4',
    url: 'https://github.com/andreasvirkus/blender-fiddles/blob/master/donut/renders/water.render.2.png?raw=true',
  },
  {
    label: 'cup.5',
    url: 'https://github.com/andreasvirkus/blender-fiddles/blob/master/donut/renders/coffee.render.2.png?raw=true',
  },
  {
    label: 'cup.6',
    url: 'https://github.com/andreasvirkus/blender-fiddles/blob/master/donut/renders/coffee.render.3.png?raw=true',
  },
  {
    label: 'cup.7',
    url: 'https://github.com/andreasvirkus/blender-fiddles/blob/master/donut/renders/coffee.render.4.png?raw=true',
  },
  {
    label: 'donut.composition.1',
    url: 'https://github.com/andreasvirkus/blender-fiddles/blob/master/donut/renders/final.render.1.png?raw=true',
  },
  {
    label: 'donut.composition.2',
    url: 'https://github.com/andreasvirkus/blender-fiddles/blob/master/donut/renders/final.render.2.png?raw=true',
  },
  {
    label: 'donut.composition.3',
    url: 'https://github.com/andreasvirkus/blender-fiddles/blob/master/donut/renders/final.render.4.png?raw=true',
  },
]

export default {
  name: 'blender',
  props: ['page'],
  data() {
    return { videos, stills, activeRender: videos[0], VIDEO }
  },
  head () {
    const { title, description, excerpt } = this.page
    const defaultTitle = this.$siteConfig.title
    return {
      title: (title && title !== defaultTitle)
        ? `${title} | ${defaultTitle}`
        : defaultTitle,
      meta: [
        {
          name: 'description',
          content: description || excerpt || this.$siteConfig.description
        }
      ]
    }
  },
  computed: {
    renderType() {
      const urlParts = this.activeRender.url.split('.')
      const format = urlParts[urlParts.length - 1]
      return format.startsWith('png') ? STATIC : VIDEO
    },
    masterFeed() {
      return [...videos, ...stills]
    },
    activeIndex() {
      return this.masterFeed.findIndex((r) => this.activeRender.label === r.label)
    },
    prevBtnDisabled() {
      return this.activeIndex === 0
    },
    nextBtnDisabled() {
      return this.activeIndex === this.masterFeed.length - 1
    },
  },
  watch: {
    activeRender: {
      handler(render) {
        const hash = this.$route.hash.slice(1)
        if (render && render.label !== hash) this.$router.replace({ hash: `#${render.label}`, params: { savePosition: true } })
      }
    }
  },
  created() {
    const label = this.$route.hash.slice(1)

    if (this.activeRender.label !== label) {
      const render = this.masterFeed.find((r) => r.label === label)
      if (render) this.activeRender = render
    }
  },
  methods: {
    switchActiveRender(render) {
      this.activeRender = render
    },
    goPrevious() {
      this.activeRender = this.masterFeed[this.activeIndex - 1]
    },
    goNext() {
      this.activeRender = this.masterFeed[this.activeIndex + 1]
    },
  },
}
</script>

<style>
.blender__reel {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.blender__render {
  display: block;
  margin: 2rem auto;
  width: 90%;
  max-width: 40rem;
  height: auto;
  /* min-height: 40rem; */
  border-radius: 8px;
  /* TODO: Add intrinsic ratio? */
}

.blender__nav {
  border: none;
  background: none;
  font-size: 3rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease-out;
}
.blender__nav:hover {
  background-color: #ddd;
}
.blender__nav:disabled {
  cursor: not-allowed;
  color: var(--color-contrast);
}
</style>