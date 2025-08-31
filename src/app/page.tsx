import { getAllPosts } from "@/lib/posts"
import Link from "next/link"
import { Clock, ArrowRight } from "lucide-react"
import { NeuCard, NeuButton, NeuTag, NeuContainer } from "@/components/ui"

export default function Home() {
  const posts = getAllPosts().slice(0, 6)

  return (
    <div className="py-12">
      {/* Hero Section */}
      <section className="mb-24 text-center relative">
        <NeuContainer variant="hero" size="xl" className="text-center">
          <h1 className="mb-8 text-6xl md:text-8xl font-bold leading-tight text-foreground tracking-tight">
            個人ブログ <span className="text-accent font-extrabold">Hodgepodge</span>
          </h1>
          <p className="mx-auto max-w-4xl text-xl md:text-2xl leading-relaxed text-muted-foreground font-light">
            <span className="text-accent font-medium">日々の記録や小さな覚え書き</span>を、気ままにまとめる個人ブログ
            <br className="hidden md:block" />
            無理のない分量で、ゆっくり更新します
          </p>
        </NeuContainer>
      </section>

      {/* Latest Posts Section */}
      <section className="mb-20">
        <div className="mb-12 flex items-center justify-between">
          <h2 className="text-4xl font-bold text-foreground">最近の記事</h2>
          <Link href="/blogs">
            <NeuButton variant="primary" size="lg" className="group flex items-center gap-3">
              記事一覧を見る
              <ArrowRight className="h-5 w-5 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110" />
            </NeuButton>
          </Link>
        </div>

        {posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <NeuCard
                key={post.slug}
                variant="subtle"
                size="lg"
                gradient="earth"
                className="group"
              >
                <div className="mb-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <NeuTag key={tag} href={`/tags/${tag}`} variant="sage" size="sm">
                      {tag}
                    </NeuTag>
                  ))}
                </div>
                <h3 className="mb-3 text-xl font-semibold text-card-foreground">
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="transition-colors hover:text-accent"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="mb-4 text-muted-foreground line-clamp-3 leading-relaxed">
                  {post.description}
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <time dateTime={post.datePublished}>
                    {new Date(post.datePublished).toLocaleDateString("ja-JP")}
                  </time>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {post.readingTime}分
                  </span>
                </div>
              </NeuCard>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">まだ記事がありません。</p>
          </div>
        )}
      </section>
    </div>
  )
}
