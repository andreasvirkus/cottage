<template>
  <main class="page">
    <Content :custom="false"/>
  </main>
</template>

<style lang="stylus">
@import './css/variables.css'

.page
  padding-bottom 2rem

.page-nav
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-height: 3rem;
  .next
    margin-left auto

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
