export interface Post {
  title: string
  description: string
  datePublished: string
  tags: string[]
  keywords?: string[]
  hero?: {
    src: { src: string; width: number; height: number; blurDataURL: string }
    alt: string
    width?: number
    height?: number
  }
  relatedPosts?: string[]
  slug: string
  filePath: string
  draft: boolean
  content: string
  raw: string
  readingTime: number
  canonical: string
  ogImage: string
}
