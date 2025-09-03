import { defineConfig, s } from "velite"
import readingTime from "reading-time"
import { v5 as uuidv5 } from "uuid"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc.js"

dayjs.extend(utc)

export default defineConfig({
  root: "src/content",
  output: {
    data: ".velite",
    assets: "public/assets",
    base: "/assets/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: {
    posts: {
      name: "Post",
      pattern: "posts/**/*.mdx",
      schema: s
        .object({
          title: s.string().max(99),
          description: s.string().min(120).max(160),
          datePublished: s.isodate(),
          tags: s.array(s.string()),
          keywords: s.array(s.string()).optional(),
          hero: s
            .object({
              src: s.image(),
              alt: s.string(),
              width: s.number().optional(),
              height: s.number().optional(),
            })
            .optional(),
          slug: s.slug("posts").optional(),
          draft: s.boolean().default(false),
          content: s.mdx(),
          raw: s.markdown(),
        })
        .transform((data, { meta }) => {
          const today = dayjs().utc().add(9, "hour").toDate()
          const publishDate = new Date(data.datePublished)

          // Generate slug from filename if not provided, or use fixed UUID based on file path
          const namespace = "6ba7b810-9dad-11d1-80b4-00c04fd430c8" // UUID namespace
          const slug = data.slug || uuidv5(meta.path as string, namespace)

          // Hide future posts
          if (publishDate > today) {
            data.draft = true
          }

          // Calculate reading time from content
          const stats = readingTime(meta.content as string)

          return {
            ...data,
            slug,
            readingTime: Math.ceil(stats.minutes),
            canonical: `/blogs/${slug}`,
            ogImage: `/api/og?title=${encodeURIComponent(data.title)}`,
          }
        }),
    },
  },
})
