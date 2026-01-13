import { getAllTags, getPostsByTag } from "@/lib/posts"
import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { Clock, ChevronRight, Tag } from "lucide-react"
import { EditCard, EditTag, EditContainer } from "@/components/ui"

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
    <div className="edit-section min-h-screen">
      <EditContainer>
        {/* Breadcrumb */}
        <div className="mb-8 edit-meta">
          <Link href="/blogs" className="hover:text-foreground transition-colors">
            記事一覧
          </Link>
          <span className="mx-2">/</span>
          <span className="text-muted-foreground">タグ</span>
          <span className="mx-2">/</span>
          <span className="text-foreground">{decodedTag}</span>
        </div>

        {/* Page header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="edit-bg-pastel-pink p-3">
              <Tag className="h-6 w-6" />
            </div>
            <div>
              <div className="edit-byline mb-1">TAG</div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{decodedTag}</h1>
            </div>
          </div>
          <div className="edit-meta">
            <span className="edit-line" />
            <span className="mx-3">{posts.length} ARTICLES</span>
            <span className="edit-line" />
          </div>
        </div>

        {/* Articles grid */}
        <section>
          <div className="edit-grid-3 gap-6">
            {posts.map((post, index) => (
              <EditCard
                key={post.slug}
                variant="default"
                size="lg"
                className={`${
                  index % 3 === 0
                    ? "edit-bg-pastel-peach"
                    : index % 3 === 1
                      ? "edit-bg-pastel-mint"
                      : "edit-bg-pastel-lavender"
                }`}
              >
                {/* Tags */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <EditTag
                      key={tag}
                      href={`/tags/${encodeURIComponent(tag)}`}
                      variant={tag === decodedTag ? "pastel-pink" : "pastel-lavender"}
                      size="sm"
                    >
                      {tag}
                    </EditTag>
                  ))}
                </div>

                {/* Title */}
                <h2 className="mb-3 text-lg font-semibold leading-tight">
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="hover:underline decoration-1 underline-offset-2"
                  >
                    {post.title}
                  </Link>
                </h2>

                {/* Description */}
                <p className="mb-4 text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                  {post.description}
                </p>

                {/* Meta */}
                <div className="edit-meta pt-4 edit-divider-top">
                  <time dateTime={post.datePublished} className="edit-meta-item">
                    {new Date(post.datePublished).toLocaleDateString("ja-JP")}
                  </time>
                  <span className="edit-dot" />
                  <span className="edit-meta-item">
                    <Clock className="h-3 w-3" />
                    {post.readingTime}min
                  </span>
                </div>
              </EditCard>
            ))}
          </div>
        </section>

        {/* Other tags */}
        {getAllTags().filter((tag) => tag !== decodedTag).length > 0 && (
          <section className="edit-divider-top mt-16 pt-16">
            <div className="edit-byline mb-6">EXPLORE MORE TAGS</div>
            <h2 className="text-2xl font-bold mb-8">他のタグ</h2>
            <div className="flex flex-wrap gap-3">
              {getAllTags()
                .filter((tag) => tag !== decodedTag)
                .map((tag, index) => (
                  <EditTag
                    key={tag}
                    href={`/tags/${encodeURIComponent(tag)}`}
                    variant={
                      index % 3 === 0
                        ? "pastel-pink"
                        : index % 3 === 1
                          ? "pastel-mint"
                          : "pastel-lavender"
                    }
                    size="md"
                  >
                    {tag}
                  </EditTag>
                ))}
            </div>
          </section>
        )}
      </EditContainer>
    </div>
  )
}
