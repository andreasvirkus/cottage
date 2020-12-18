<template>
  <label :class="$style.wrapper"
    >Theme toggle
    <input v-model="darkTheme" type="checkbox" class="hidden-visually" />

    <svg viewBox="0 0 250 250" fill="currentColor" :class="$style.toggle">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M140.811 2.566a49.998 49.998 0 00-31.622 0l-75 25C13.77 34.37 0 53.478 0 75v100c0 21.522 13.771 40.628 34.189 47.434l75 25a50 50 0 0031.622 0l75-25C236.229 215.628 250 196.522 250 175V75c0-21.522-13.771-40.629-34.189-47.434l-75-25zM125 75c27.614 0 50 22.386 50 50s-22.386 50-50 50v50c2.67 0 5.34-.428 7.906-1.283l75-25A25 25 0 00225 175V75a25 25 0 00-17.094-23.717l-75-25A25 25 0 00125 25v50zm25 50c0 13.807-11.193 25-25 25s-25-11.193-25-25 11.193-25 25-25 25 11.193 25 25z"
      />
    </svg>
  </label>
</template>

<script>
export default {
  name: 'ThemeToggle',
  data() {
    return {
      darkTheme: false
    }
  },
  mounted() {
    const theme = window.matchMedia('(prefers-color-scheme: dark)')
    this.darkTheme = theme.matches

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      this.darkTheme = e.matches
    })
  },
  watch: {
    darkTheme: {
      immediate: true,
      handler(isDark) {
        if (process.server) return
        document.body.parentNode.dataset.theme = isDark ? 'dark' : 'light'
      }
    }
  }
}
</script>

<style module>
.wrapper {
  position: absolute;
  top: 80px;
  right: 36px;
  font-size: 0;
  color: transparent;
}

.toggle {
  display: block;
  height: 24px;
  width: 24px;
  cursor: pointer;
  color: var(--content-color);
}
</style>
