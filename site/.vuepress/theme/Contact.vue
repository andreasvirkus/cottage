<template>
  <main>

    <Content :custom="false" v-if="!sent" />

    <blockquote v-else>
      <p>cheers;</p>
      <p>i'll be sure to get in touch</p>
      <p>- well, me</p>
    </blockquote>

    <form id="form" netlify name="contact" action="/contact?sent">
      <label for="name">i am:</label>
      <input name="name" id="name" type="text" required autocomplete="name">

      <label for="email">write back to:</label>
      <input name="email" id="email" type="email" required autocomplete="email">

      <label for="content">i just want to say that...</label>
      <textarea name="content" id="content" required></textarea>

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
    width: 25rem;
    max-width: 90%;
    margin: 2rem;
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
    border-bottom: 2px dashed var(--border-color);
    display: block;
    margin: 1rem 0;
    font-family: var(--font-mono);
    font-size: 1.3rem;
    transition: border .3s ease;
  }
  input:focus,
  textarea:focus {
    border: none;
    outline: none;
  }
  input:focus {
    border-bottom: 2px solid var(--border-color);
  }
  textarea:focus {
    border: 2px solid var(--border-color);
  }
  input + label {
    display: block;
    margin-top: 3rem;
  }

  textarea {
    border: 2px dashed var(--border-color);
    resize: vertical;
    width: 100%;
    min-height: 5rem;
  }

  button {
    border: 2px solid var(--border-color);
    color: #fff;
    background: var(--border-color);
    margin-top: 1.5rem;
    padding: .7rem 2rem;
    font-size: 1.3rem;
    font-family: var(--font-mono);
    cursor: pointer;
    transition: box-shadow 350ms cubic-bezier(0.23, 1, 0.32, 1);
  }
  button:hover {
      box-shadow: inset 0px 0px 0px 3px #fff;
  }

  blockquote {
    margin-top: 6rem;
  }
</style>