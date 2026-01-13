import { getAllPosts } from "@/lib/posts"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { EditButton, EditContainer } from "@/components/ui"

export default function Home() {
  const posts = getAllPosts().slice(0, 6)

  return (
    <div className="edit-section min-h-screen">
      <EditContainer>
        {/* Hero Section - Editorial Typography */}
        <section className="mb-24">
          <div className="edit-grid-asym gap-12 items-start">
            {/* Main headline */}
            <div className="space-y-8">
              <div className="edit-byline mb-4">ISSUE 001 — 2025</div>
              <h1 className="font-bold leading-none tracking-tight">
                HODGEPODGE
                <br />
                <span className="edit-bg-pastel-pink px-2">— BLOG</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
                日々の記録や小さな覚え書きを、気ままにまとめる個人ブログ。
                <br />
                無理のない分量で、ゆっくり更新します。
              </p>
              <Link href="/blogs">
                <EditButton variant="primary" size="lg" className="group">
                  記事一覧を見る
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </EditButton>
              </Link>
            </div>

            {/* Decorative element */}
            <div className="md:border-l md:border-border pl-0 md:pl-8 mt-8 md:mt-0">
              <div className="edit-byline mb-4">LATEST</div>
              {posts.slice(0, 3).map((post, index) => (
                <div key={post.slug} className={`mb-6 ${index === 0 ? "edit-bg-pastel-mint p-4 -ml-4" : ""}`}>
                  <div className="edit-meta mb-2">
                    <time dateTime={post.datePublished}>
                      {new Date(post.datePublished).toLocaleDateString("ja-JP")}
                    </time>
                    <span className="edit-dot" />
                    <span>{post.readingTime}min read</span>
                  </div>
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="font-medium hover:underline decoration-1 underline-offset-2"
                  >
                    {post.title}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="edit-section">
          <div className="edit-grid-asym gap-12">
            <div>
              <div className="edit-byline mb-4">ABOUT</div>
              <h2 className="text-3xl font-bold mb-6">このブログについて</h2>
              <p className="text-muted-foreground leading-relaxed">
                Hodgepodgeは、日々の記録と小さな覚え書きを気ままにまとめる個人ブログです。
                暮らしの気づきや考えごとを、無理のない分量でゆっくり更新します。
              </p>
            </div>
            <div className="edit-bg-muted p-6">
              <div className="edit-byline mb-4">SPEC</div>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between edit-divider-bottom pb-2">
                  <dt className="font-medium">Tech Stack</dt>
                  <dd className="text-muted-foreground">Next.js 15</dd>
                </div>
                <div className="flex justify-between edit-divider-bottom pb-2">
                  <dt className="font-medium">Style</dt>
                  <dd className="text-muted-foreground">Tailwind CSS</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Content</dt>
                  <dd className="text-muted-foreground">Velite + MDX</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      </EditContainer>
    </div>
  )
}
