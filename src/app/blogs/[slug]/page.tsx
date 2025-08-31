import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/posts"
import { generateToc } from "@/lib/toc"
import { TableOfContents } from "@/components/TableOfContents"
import { MDXContent } from "@/components/MDXContent"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { Clock } from "lucide-react"
import { NeuTag, NeuCard } from "@/components/ui"

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {}
  }

  return {
    title: `${post.title} | Hodgepodge`,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: "Hodgepodge" }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.datePublished,
      tags: post.tags,
      locale: "ja_JP",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
    alternates: {
      canonical: post.canonical,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(post, 3)
  const tocItems = generateToc(post.raw)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.hero?.src,
    datePublished: post.datePublished,
    dateModified: post.datePublished,
    author: {
      "@type": "Organization",
      name: "Hodgepodge",
    },
    publisher: {
      "@type": "Organization",
      name: "Hodgepodge",
    },
    keywords: post.keywords?.join(", "),
    articleSection: post.tags.join(", "),
  }

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD構造化データは安全
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="py-12">
        {/* ヘッダー */}
        <header className="mb-8">
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <NeuTag key={tag} href={`/tags/${tag}`} variant="sage" size="md">
                {tag}
              </NeuTag>
            ))}
          </div>

          <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">{post.title}</h1>

          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <time dateTime={post.datePublished}>
              {new Date(post.datePublished).toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              約{post.readingTime}分
            </span>
          </div>
        </header>

        {/* Hero画像 */}
        {post.hero && (
          <div className="mb-8">
            <Image
              src={post.hero.src.src}
              alt={post.hero.alt}
              width={post.hero.src.width}
              height={post.hero.src.height}
              className="w-full rounded-lg object-cover"
              priority
            />
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-6">
          {/* コンテンツ */}
          <main className="lg:col-span-5">
            <MDXContent code={post.content} />
          </main>

          {/* 目次 */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8">
              <TableOfContents items={tocItems} />
            </div>
          </aside>
        </div>

        {/* 関連記事 */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 border-t border-border pt-8">
            <h2 className="mb-6 text-2xl font-bold text-foreground">関連記事</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <NeuCard
                  key={relatedPost.slug}
                  variant="subtle"
                  size="lg"
                  gradient="earth"
                  className="group"
                >
                  <div className="mb-2 flex flex-wrap gap-1">
                    {relatedPost.tags.slice(0, 2).map((tag) => (
                      <NeuTag key={tag} href={`/tags/${tag}`} variant="sage" size="sm">
                        {tag}
                      </NeuTag>
                    ))}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                    <Link
                      href={`/blogs/${relatedPost.slug}`}
                      className="hover:text-accent transition-colors"
                    >
                      {relatedPost.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {relatedPost.description}
                  </p>
                </NeuCard>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  )
}
