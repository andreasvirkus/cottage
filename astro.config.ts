import { defineConfig, passthroughImageService } from 'astro/config'
import mdx from '@astrojs/mdx'
// import tailwind from "@astrojs/tailwind"
import sitemap from '@astrojs/sitemap'
import { remarkReadingTime } from './src/utils/reading-time'

// https://astro.build/config
export default defineConfig({
  site: 'https://andreasvirkus.me',
  integrations: [mdx(), sitemap()],
  image: {
    service: passthroughImageService(),
  },
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
  markdown: {
    remarkPlugins: [remarkReadingTime],
    shikiConfig: {
      theme: 'vitesse-dark',
      wrap: true,
    },
  },
})
