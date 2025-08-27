import { posts } from "#site/content"
import type { Post } from "@/types/post"

export function getAllPosts(): Post[] {
  return posts
    .filter((post) => !post.draft && post.slug)
    .sort((a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime())
    .map((post) => ({ ...post, slug: post.slug as string }))
}

export function getPostBySlug(slug: string): Post | undefined {
  const post = posts.find((post) => post.slug === slug && !post.draft && post.slug)
  return post ? { ...post, slug: post.slug as string } : undefined
}

export function getPostsByTag(tag: string): Post[] {
  return posts
    .filter((post) => !post.draft && post.slug && post.tags.includes(tag))
    .sort((a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime())
    .map((post) => ({ ...post, slug: post.slug as string }))
}

export function getAllTags(): string[] {
  const tags = new Set<string>()
  for (const post of posts) {
    if (!post.draft && post.slug) {
      for (const tag of post.tags) {
        tags.add(tag)
      }
    }
  }
  return Array.from(tags).sort()
}

export function getRelatedPosts(currentPost: Post, limit = 3): Post[] {
  const related = posts
    .filter(
      (post) =>
        !post.draft &&
        post.slug &&
        post.slug !== currentPost.slug &&
        post.tags.some((tag) => currentPost.tags.includes(tag)),
    )
    .sort((a, b) => {
      const aMatchCount = a.tags.filter((tag) => currentPost.tags.includes(tag)).length
      const bMatchCount = b.tags.filter((tag) => currentPost.tags.includes(tag)).length
      return bMatchCount - aMatchCount
    })
    .slice(0, limit)
    .map((post) => ({ ...post, slug: post.slug as string }))

  return related
}
