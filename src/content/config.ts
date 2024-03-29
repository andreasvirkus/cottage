import { defineCollection, z } from 'astro:content'

const thoughts = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    readingTime: z.number().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional(),
  }),
})

export const collections = { thoughts }
