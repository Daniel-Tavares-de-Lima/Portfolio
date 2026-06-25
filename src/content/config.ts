import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.object({ pt: z.string(), en: z.string() }),
    description: z.object({ pt: z.string(), en: z.string() }),
    stack: z.array(z.string()),
    category: z.enum(['professional', 'academic', 'personal']),
    featured: z.boolean().default(true),
    order: z.number(),
    github: z.string().url().optional(),
    demo: z.union([z.string().url(), z.literal('')]).optional(),
    relatedRepos: z.array(z.string().url()).optional(),
  }),
});

export const collections = { projects };
