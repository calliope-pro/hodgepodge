import { getAllTags, getPostsByTag } from "@/lib/posts"
import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { Clock, ChevronRight } from "lucide-react"
import { NeuCard, NeuTag } from "@/components/ui"

interface TagPageProps {
  params: Promise<{
    tag: string
  }>
}

export async function generateStaticParams() {
  const tags = getAllTags()
  return tags.map((tag) => ({
    tag: encodeURIComponent(tag),
  }))
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  const posts = getPostsByTag(decodedTag)

  if (posts.length === 0) {
    return {}
  }

  return {
    title: `${decodedTag}の記事 | Hodgepodge`,
    description: `${decodedTag}に関する記事一覧です。${posts.length}件の記事があります。`,
    openGraph: {
      title: `${decodedTag}の記事`,
      description: `${decodedTag}に関する記事一覧です。${posts.length}件の記事があります。`,
      type: "website",
      locale: "ja_JP",
    },
    twitter: {
      card: "summary_large_image",
      title: `${decodedTag}の記事`,
      description: `${decodedTag}に関する記事一覧です。${posts.length}件の記事があります。`,
    },
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  const posts = getPostsByTag(decodedTag)

  if (posts.length === 0) {
    notFound()
  }

  return (
    <div className="py-12">
      <div className="mb-12">
        <div className="mb-4 flex items-center space-x-2">
          <Link href="/blogs" className="text-accent hover:text-accent/80 transition-colors">
            記事一覧
          </Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">タグ</span>
        </div>

        <h1 className="mb-4 text-4xl font-bold text-foreground">
          <NeuTag variant="active" size="md" className="px-4 py-2 font-semibold">
            {decodedTag}
          </NeuTag>
          の記事
        </h1>

        <p className="text-xl text-muted-foreground">{posts.length}件の記事があります</p>
      </div>

      {/* 記事一覧 */}
      <section>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <NeuCard key={post.slug} variant="subtle" size="lg" gradient="earth" className="group">
              <div className="mb-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <NeuTag
                    key={tag}
                    href={`/tags/${encodeURIComponent(tag)}`}
                    variant="sage"
                    active={tag === decodedTag}
                  >
                    {tag}
                  </NeuTag>
                ))}
              </div>

              <h2 className="mb-3 text-xl font-semibold text-card-foreground">
                <Link href={`/blogs/${post.slug}`} className="hover:text-accent transition-colors">
                  {post.title}
                </Link>
              </h2>

              <p className="mb-4 text-muted-foreground line-clamp-3 leading-relaxed">
                {post.description}
              </p>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <time dateTime={post.datePublished}>
                  {new Date(post.datePublished).toLocaleDateString("ja-JP")}
                </time>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readingTime}分
                </span>
              </div>
            </NeuCard>
          ))}
        </div>
      </section>

      {/* 他のタグ */}
      <section className="mt-16 border-t border-border pt-8">
        <h2 className="mb-6 text-2xl font-bold text-foreground">他のタグ</h2>
        <div className="flex flex-wrap gap-3">
          {getAllTags()
            .filter((tag) => tag !== decodedTag)
            .map((tag) => (
              <NeuTag key={tag} href={`/tags/${encodeURIComponent(tag)}`} variant="sage">
                {tag}
              </NeuTag>
            ))}
        </div>
      </section>
    </div>
  )
}
