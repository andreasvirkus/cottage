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
  // integrations: [tailwind()]
  markdown: {
    remarkPlugins: [remarkReadingTime],
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
})
