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
  // If relatedPosts is specified, use those files
  if (currentPost.relatedPosts && currentPost.relatedPosts.length > 0) {
    const related: Post[] = []
    for (const fileName of currentPost.relatedPosts) {
      if (related.length >= limit) break
      const post = posts.find((p) => p.filePath.endsWith(fileName) && !p.draft && p.slug)
      if (post && post.slug) {
        related.push({ ...post, slug: post.slug })
      }
    }
    return related
  }

  // If relatedPosts is not specified, return empty array
  return []
}
