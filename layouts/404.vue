<template>
  <main class="content">
    <h1>404</h1>
    <blockquote>{{ getMsg() }}</blockquote>

    <p>
      You've sailed into uncharted territories!
      I'm not sure why you thought this
      page would exist, but it seems I didn't
      have the coding skills to pull it off.
    </p>
    <a href="javascript:history.back()">Navigate back</a> or hop to the <saber-link to="/">homepage</saber-link>.

    <p>
      If you're looking to get in touch, just reach out to me on
      <a href="https://www.linkedin.com/in/andreasvirkus"
        title="View my LinkedIn profile"
        rel="noopener noreferrer">LinkedIn</a> or via
      <a href="mailto:write@andreasvirkus.me" title="Shoot me a mail!">e-mail</a>.
    </p>
  </main>
</template>

<script>
import Sidebar from '@/components/Sidebar'
import SearchBox from '@/components/SearchBox'
import PageFooter from '@/components/PageFooter'

const msgs = [
  `Why, it's obvious, Watson... There's nothing here. 🔍`,
  `Feelin' mighty adventurous, aren't we? 🕺`,
  `Ahh - standard Four-O-Four right here, cap'n ⛴`,
  `Looks like we've got some broken links. How about you help me fix them? 🔧`
]

export default {
  components: {
    Sidebar,
    SearchBox,
    PageFooter
  },
  methods: {
    getMsg () {
      return msgs[Math.floor(Math.random() * msgs.length)]
    }
  }
}
</script>
