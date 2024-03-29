<template>
  <div class="search foxy-box">
    <input
      v-model="query"
      ref="input"
      aria-label="Search"
      autocomplete="off"
      placeholder="e.g. about"
      spellcheck="false"
      class="search__box"
      @focus="focused = true"
      @blur="focused = false"
      @keyup.enter="go(focusIndex)"
      @keyup.up="onUp"
      @keyup.down="onDown"
      @keyup.esc="unfocusSearchBox"
    />
    <ul class="search__suggestions" v-if="showSuggestions" @mouseleave="unfocus">
      <li
        class="search__suggestion"
        v-for="(s, i) in suggestions"
        :class="{ '-focused': i === focusIndex }"
        :key="s.permalink"
        @mousedown="go(i)"
        @mouseenter="focus(i)"
      >
        <saber-link :to="s.permalink" class="search__link" :class="{ '-focused': i === focusIndex }">
          <span class="search__suggestion-title">{{ s.title || s.path }}</span>
          <span v-if="s.header" class="search__suggestion-desc">&gt; {{ s.header.title }}</span>
        </saber-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      query: '',
      focused: false,
      focusIndex: 0,
      suggestions: [],
    }
  },
  props: ['page'],
  computed: {
    showSuggestions() {
      return this.focused && this.suggestions.length
    },
  },
  watch: {
    async query() {
      const database = await this.$fetchSearchDatabase()
      const keyword = this.query
      // TODO: Also go through the page's headers & tags
      this.suggestions = database
        .filter(
          (page) =>
            (page.title && page.title.includes(keyword)) ||
            page.permalink.includes(keyword) ||
            (page.excerpt && page.excerpt.includes(keyword)) ||
            (page.markdownHeadings || []).some((h) => h.slug.includes(keyword)),
        )
        .slice(0, 5)
    },
  },
  methods: {
    onUp() {
      if (this.showSuggestions) {
        if (this.focusIndex > 0) {
          this.focusIndex--
        } else {
          this.focusIndex = this.suggestions.length - 1
        }
      }
    },
    onDown() {
      if (this.showSuggestions) {
        if (this.focusIndex < this.suggestions.length - 1) {
          this.focusIndex++
        } else {
          this.focusIndex = 0
        }
      }
    },
    go(i) {
      this.$router.push(this.suggestions[i].permalink)
      this.query = ''
      this.focusIndex = 0
      this.$refs.input.blur()
    },
    focus(i) {
      this.focusIndex = i
    },
    unfocus() {
      this.focusIndex = -1
    },
    unfocusSearchBox() {
      this.$refs.input.blur()
    },
  },
}
</script>

<style>
.search {
  position: fixed;
  right: 2rem;
  top: 1.25rem;
  display: flex;
  height: 2rem;
  z-index: 5;
}
.search__box {
  display: inline-block;
  width: 0;
  left: 1rem;
  padding-left: 2rem;
  border: none;
  font-size: 0.85rem;
  font-weight: 500;
  font-family: var(--font-mono);
  outline: none;
  transition:
    width 350ms cubic-bezier(0.68, -0.55, 0.265, 1.55),
    border-color 350ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
  background: url('/svg/search.svg') 0.6rem 0.55rem no-repeat;
  will-change: width;
  cursor: pointer;
}
.search__box:focus {
  left: 0;
  width: 20rem;
  cursor: auto;
  background-color: var(--bg);
  border-radius: 1rem;
  border-color: rgba(34, 34, 51, 0.596);
}
.search__suggestions {
  background-color: var(--bg);
  width: 20rem;
  position: absolute;
  top: 1.5rem;
  right: 0;
  box-shadow: 0 2px 10px -4px rgba(0, 0, 0, 0.2);
  padding: 0.4rem;
  list-style-type: none;
}
.search__suggestion {
  line-height: 1.4;
  padding: 0.4rem 0.6rem;
  border-radius: 4px;
  cursor: pointer;
  z-index: 5;
}
.search__link {
  color: var(--color);
}
.search__suggestion-title {
  font-weight: 600;
}
.search__suggestion-desc {
  font-size: 0.9em;
  margin-left: 0.25em;
}
.search__suggestion.-focused {
  color: var(--color-contrast);
  background-color: var(--bg-contrast);
}
@media (max-width: 70rem) {
  .search {
    display: none;
  }
}
</style>
