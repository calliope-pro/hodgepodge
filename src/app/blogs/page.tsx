"use client"

import { getAllPosts, getAllTags } from "@/lib/posts"
import { useState, useMemo, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Clock, X } from "lucide-react"
import { NeuContainer, NeuButton, NeuCard, NeuTag } from "@/components/ui"
import { TagFilter } from "@/components/TagFilter"
import { SearchCombobox } from "@/components/SearchCombobox"

function BlogsContent() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get("query") || "")
  const [selectedTags, setSelectedTags] = useState<string[]>(
    searchParams.get("tags")?.split(",").filter(Boolean) || [],
  )
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1)

  const allPosts = getAllPosts()
  const allTags = getAllTags()
  const postsPerPage = 9

  const filteredPosts = useMemo(() => {
    let filtered = allPosts

    if (searchQuery) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter((post) => selectedTags.every((tag) => post.tags.includes(tag)))
    }

    return filtered
  }, [allPosts, searchQuery, selectedTags])

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage,
  )


  const clearFilters = () => {
    setSearchQuery("")
    setSelectedTags([])
    setCurrentPage(1)
  }

  return (
    <div className="py-16">
      <div className="mb-16 text-center">
        <NeuContainer variant="floating" size="xl" gradient="sage" className="mb-8">
          <h1 className="mb-6 text-4xl font-bold text-foreground">記事一覧</h1>
          <p className="text-2xl text-muted-foreground font-light">
            <span className="text-accent font-semibold">{filteredPosts.length}件</span>
            の記事があります
          </p>
        </NeuContainer>
      </div>

      {/* 検索・フィルタセクション */}
      <div className="mb-16 space-y-10">
        {/* 検索フォーム */}
        <search className="flex gap-4">
          <SearchCombobox
            value={searchQuery}
            onChange={(value) => {
              setSearchQuery(value)
              setCurrentPage(1)
            }}
          />
          {(searchQuery || selectedTags.length > 0) && (
            <NeuButton
              type="button"
              onClick={clearFilters}
              variant="secondary"
              size="lg"
              className="whitespace-nowrap flex items-center gap-3"
            >
              <X className="h-4 w-4" />
              クリア
            </NeuButton>
          )}
        </search>

        {/* タグフィルタ */}
        <TagFilter
          allTags={allTags}
          selectedTags={selectedTags}
          onTagsChange={(tags) => {
            setSelectedTags(tags)
            setCurrentPage(1)
          }}
        />
      </div>

      {/* 記事一覧 */}
      <section aria-live="polite">
        {paginatedPosts.length > 0 ? (
          <>
            <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {paginatedPosts.map((post) => (
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
                  <h2 className="mb-3 text-xl font-semibold text-card-foreground">
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="transition-colors hover:text-accent"
                    >
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
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {post.readingTime}分
                    </span>
                  </div>
                </NeuCard>
              ))}
            </div>

            {/* ページネーション */}
            {totalPages > 1 && (
              <NeuContainer variant="subtle" size="lg" className="mt-8">
                <nav
                  className="flex items-center justify-center space-x-3"
                  aria-label="ページネーション"
                >
                  <NeuButton
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    variant="ghost"
                    size="md"
                  >
                    前へ
                  </NeuButton>

                  <div className="flex space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <NeuButton
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        variant={currentPage === page ? "primary" : "ghost"}
                        size="md"
                        className="px-4 py-2 text-sm font-medium"
                      >
                        {page}
                      </NeuButton>
                    ))}
                  </div>

                  <NeuButton
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    variant="ghost"
                    size="md"
                  >
                    次へ
                  </NeuButton>
                </nav>
              </NeuContainer>
            )}
          </>
        ) : (
          <div className="py-16 text-center">
            <NeuContainer variant="card" size="md" className="mx-auto max-w-md text-center">
              <div className="mx-auto mb-4 h-12 w-12 text-muted-foreground flex items-center justify-center">
                <span className="text-2xl">📄</span>
              </div>
              <p className="text-lg text-muted-foreground">
                検索条件に一致する記事が見つかりませんでした。
              </p>
            </NeuContainer>
          </div>
        )}
      </section>
    </div>
  )
}

export default function BlogsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogsContent />
    </Suspense>
  )
}
