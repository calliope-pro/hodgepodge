import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/posts"
import { generateToc } from "@/lib/toc"
import { TableOfContents } from "@/components/TableOfContents"
import { MDXContent } from "@/components/MDXContent"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { Clock, ArrowLeft } from "lucide-react"
import { EditTag, EditCard, EditContainer } from "@/components/ui"

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
    title: `${post.title}`,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: "calliope" }],
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

      <article className="edit-section">
        {/* Header section - full width */}
        <EditContainer>
          {/* Back button */}
          <div className="mb-8">
            <Link
              href="/blogs"
              className="edit-meta hover:text-foreground transition-colors inline-flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>記事一覧に戻る</span>
            </Link>
          </div>

          {/* Article header */}
          <header className="mb-12">
            {/* Tags */}
            <div className="mb-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <EditTag key={tag} href={`/tags/${tag}`} variant="pastel-pink" size="sm">
                  {tag}
                </EditTag>
              ))}
            </div>

            {/* Title */}
            <h1 className="mb-6 text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight leading-tight max-w-4xl">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="edit-meta pb-6 edit-divider-bottom max-w-2xl">
              <time dateTime={post.datePublished}>
                {new Date(post.datePublished).toLocaleDateString("ja-JP", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span className="edit-dot" />
              <span className="edit-meta-item">
                <Clock className="h-3 w-3" />
                {post.readingTime}min read
              </span>
            </div>
          </header>

          {/* Hero image */}
          {post.hero && (
            <div className="mb-12 edit-divider-bottom pb-12">
              <Image
                src={post.hero.src.src}
                alt={post.hero.alt}
                width={post.hero.src.width}
                height={post.hero.src.height}
                className="w-full border border-border"
                priority
              />
            </div>
          )}
        </EditContainer>

        {/* Main content area with sidebar */}
        <EditContainer>
          <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
            {/* Article content */}
            <div className="min-w-0">
              {/* Mobile TOC */}
              {tocItems.length > 0 && (
                <div className="mb-12 lg:hidden">
                  <details className="group edit-bg-muted p-4">
                    <summary className="cursor-pointer list-none flex items-center justify-between edit-byline hover:text-foreground transition-colors">
                      <span>INDEX</span>
                      <span className="transform group-open:rotate-180 transition-transform">↓</span>
                    </summary>
                    <div className="mt-4 pl-4 edit-divider-vertical">
                      <TableOfContents items={tocItems} />
                    </div>
                  </details>
                </div>
              )}

              {/* Content */}
              <div className="edit-content prose max-w-none">
                <MDXContent code={post.content} />
              </div>

              {/* Article footer */}
              <footer className="mt-16 edit-divider-top pt-8">
                <div className="edit-byline mb-4">END OF ARTICLE</div>
                <div className="flex justify-between items-center">
                  <Link
                    href="/blogs"
                    className="edit-meta hover:text-foreground transition-colors inline-flex items-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>記事一覧に戻る</span>
                  </Link>
                  <div className="edit-meta">
                    <span className="edit-line" />
                    <span className="mx-2">SHARE</span>
                    <span className="edit-line" />
                  </div>
                </div>
              </footer>
            </div>

            {/* Desktop sidebar TOC */}
            {tocItems.length > 0 && (
              <aside className="hidden lg:block">
                <div className="sticky top-8">
                  <div className="edit-byline mb-4">INDEX</div>
                  <div className="edit-divider-vertical pl-4">
                    <TableOfContents items={tocItems} />
                  </div>
                </div>
              </aside>
            )}
          </div>
        </EditContainer>

        {/* Related articles */}
        {relatedPosts.length > 0 && (
          <section className="edit-divider-top mt-16 pt-16">
            <EditContainer>
              <div className="edit-byline mb-4">RELATED ARTICLES</div>
              <h2 className="text-2xl font-bold mb-8">あわせて読みたい</h2>
              <div className="edit-grid-3 gap-6">
                {relatedPosts.map((relatedPost, index) => (
                  <EditCard
                    key={relatedPost.slug}
                    variant="default"
                    size="lg"
                    className={`${
                      index === 0
                        ? "edit-bg-pastel-peach"
                        : index === 1
                          ? "edit-bg-pastel-mint"
                          : "edit-bg-pastel-lavender"
                    }`}
                  >
                    <div className="mb-3 flex flex-wrap gap-1">
                      {relatedPost.tags.slice(0, 2).map((tag) => (
                        <EditTag
                          key={tag}
                          href={`/tags/${tag}`}
                          variant={index === 0 ? "pastel-pink" : index === 1 ? "pastel-mint" : "pastel-lavender"}
                          size="sm"
                        >
                          {tag}
                        </EditTag>
                      ))}
                    </div>
                    <h3 className="mb-2 text-base font-semibold leading-tight">
                      <Link
                        href={`/blogs/${relatedPost.slug}`}
                        className="hover:underline decoration-1 underline-offset-2"
                      >
                        {relatedPost.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {relatedPost.description}
                    </p>
                  </EditCard>
                ))}
              </div>
            </EditContainer>
          </section>
        )}
      </article>
    </>
  )
}
