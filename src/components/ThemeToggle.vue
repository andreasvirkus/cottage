<template>
  <label :class="[$style.wrapper, 'foxy-box']" @click.stop
    >Theme toggle
    <input v-model="darkTheme" type="checkbox" class="hidden-visually" />

    <img v-if="darkTheme" src="/svg/sun.svg" />
    <img v-else src="/svg/moon.svg" />
  </label>
</template>

<script>
export default {
  name: 'ThemeToggle',
  data() {
    return {
      darkTheme: false,
    }
  },
  mounted() {
    const savedTheme = document.documentElement.dataset.theme
    const preference = window.matchMedia('(prefers-color-scheme: dark)')
    this.darkTheme = savedTheme !== 'light' && preference.matches

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      this.darkTheme = e.matches
    })
  },
  watch: {
    darkTheme(isDark) {
      if (process.server) return

      const theme = isDark ? 'dark' : 'light'
      document.documentElement.dataset.theme = theme
      localStorage.setItem('theme', theme)
    },
  },
}
</script>

<style module>
.wrapper {
  position: fixed;
  top: 1rem;
  left: 1.5rem;
  font-size: 0;
  color: transparent;
  z-index: 5;
  padding: 6px;
}

@media screen and (max-width: 70rem) {
  .wrapper {
    top: min(calc(100vh - 6rem), 90vh);
    right: 1.5rem;
    left: unset;
  }
}
</style>
