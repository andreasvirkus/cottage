<template>
  <main>

    <Content :custom="false" />

    <div v-if="sent" class="tip custom-block">
      <p class="custom-block-title">cheers;</p>
      <p>i'll be sure to get in touch</p>
    </div>

    <form netlify name="contact" action="/contact?sent">
      <label for="name">i am:</label>
      <input name="name" id="name" type="text" placeholder="Jane, Really Doe" required autocomplete="name">

      <label for="email">write back to:</label>
      <input name="email" id="email" type="email" placeholder="some@fancy.domain" required autocomplete="email">

      <label for="content">i just want to say that...</label>
      <textarea name="content" id="content" placeholder="Tell me about your day. Or not." required></textarea>

      <button type="submit">reach out</button>
    </form>
  </main>
</template>

<script>
  export default {
    name: 'contact',
    data () {
      return {
        sent: false
      }
    },
    created () {
      this.sent = window.location.search.includes('sent')
    }
  }
</script>

<style scoped>
  form {
    max-width: 35rem;
    margin: 0 auto;
    padding: 0 2.5rem;
  }
  .custom-block.tip {
    /* TODO: Add gradient instead of border color */
    margin-left: 2.5rem;
    margin-right: 2.5rem;
    margin-bottom: 2rem;
    text-align: center;
  }

  input, textarea {
    border: none;
    background: none;
    border-bottom: 2px dashed cornflowerblue;
    display: block;
    margin: 1rem 0;
    font-family: var(--font-mono);
    font-size: 1.3rem;
    transition: border .2s ease;
  }
  input:focus,
  textarea:focus {
    border-style: solid;
    border: none;
    border-bottom: 2px solid cornflowerblue;
    outline: none;
  }
  input + label {
    display: block;
    margin-top: 3rem;
  }

  textarea {
    resize: vertical;
    width: 30rem;
    min-height: 5rem;
  }

  button {
    border: 2px solid cornflowerblue;
    background: none;
    padding: .7rem 2rem;
    font-size: 1.3rem;
    font-family: var(--font-mono);
    cursor: pointer;
  }
  button:hover {

  }
</style>