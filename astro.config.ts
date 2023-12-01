import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
// import tailwind from "@astrojs/tailwind"
import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
  site: 'https://andreasvirkus.me',
  integrations: [mdx(), sitemap()],
  // integrations: [tailwind()]
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
})
