<template>
  <main class="page">
    <slot name="default" />

    <blockquote>
      <p>cheers;</p>
      <p>i'll be sure to get in touch</p>
      <p>- well, me</p>
    </blockquote>

    <form id="form" netlify name="contact" action="/contact?sent">
      <label for="name">i am:</label>
      <input name="name" id="name" type="text" placeholder="Jayden Smith" required autocomplete="name" />

      <label for="email">write back to:</label>
      <input name="email" id="email" type="email" required placeholder="unique+lead@mail.com" autocomplete="email" />

      <label for="content">i just want to say that...</label>
      <textarea name="content" id="content" required placeholder="Pour your heart out; I'm all ears"></textarea>

      <button type="submit">reach out</button>
    </form>
  </main>
</template>

<script>
export default {
  name: 'contact',
  data() {
    return {
      sent: false,
    }
  },
  mounted() {
    this.sent = window.location.search.includes('sent')
  },
}
</script>

<style scoped>
form {
  width: 25rem;
  max-width: 90%;
  margin: 2rem;
}

input,
textarea {
  border: none;
  background: none;
  display: block;
  font-family: var(--font-mono);
  font-size: 1rem;
  color: #4a4a4a;
  transition: box-shadow 0.3s ease-out;
  margin: 1rem 0;
  padding: 0.6rem 0.4rem;
}
input:focus,
textarea:focus {
  border: none;
  outline: none;
  box-shadow: 0 16px 24px 0 rgba(118, 143, 255, 0.2);
}
input + label {
  display: block;
}

textarea {
  resize: vertical;
  width: 100%;
  min-height: 5rem;
}
label {
  cursor: pointer;
}

button {
  border: 2px solid var(--color);
  color: #fff;
  background: var(--color);
  margin-top: 1.5rem;
  padding: 0.7rem 2rem;
  font-size: 1.3rem;
  font-family: var(--font-mono);
  cursor: pointer;
  transition: box-shadow 350ms cubic-bezier(0.23, 1, 0.32, 1);
}
button:hover,
button:focus {
  outline: none;
  box-shadow: inset 0px 0px 0px 3px #fff;
}

blockquote {
  margin-top: 6rem;
}

@media (max-width: 70em) {
  form {
    margin-left: 0;
    margin-right: 0;
  }
}
</style>
