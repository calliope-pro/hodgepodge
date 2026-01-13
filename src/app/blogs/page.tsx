"use client"

import { getAllPosts, getAllTags } from "@/lib/posts"
import { useState, useMemo, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Clock, X, Search } from "lucide-react"
import { EditContainer, EditButton, EditCard, EditTag, EditInput } from "@/components/ui"

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
    <div className="edit-section min-h-screen">
      <EditContainer>
        {/* Page Header */}
        <div className="mb-16 text-center">
          <div className="edit-byline mb-4">ARCHIVE</div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">記事一覧</h1>
          <div className="edit-meta justify-center">
            <span className="edit-line" />
            <span className="mx-3">{filteredPosts.length} ARTICLES</span>
            <span className="edit-line" />
          </div>
        </div>

        {/* Search & Filter Section */}
        <div className="mb-16">
          <EditCard variant="subtle" size="lg" className="p-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">記事を探す</h2>
              <p className="text-sm text-muted-foreground">キーワードやタグで絞り込み</p>
            </div>

            {/* Search input */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <EditInput
                  type="search"
                  placeholder="キーワードを入力..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="pl-12"
                />
              </div>
            </div>

            {/* Tag filters */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3 edit-byline">TAGS</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      const newTags = selectedTags.includes(tag)
                        ? selectedTags.filter((t) => t !== tag)
                        : [...selectedTags, tag]
                      setSelectedTags(newTags)
                      setCurrentPage(1)
                    }}
                    className="border-none bg-transparent p-0 cursor-pointer"
                  >
                    <EditTag
                      variant={selectedTags.includes(tag) ? "pastel-pink" : "default"}
                      size="md"
                    >
                      {tag}
                    </EditTag>
                  </button>
                ))}
              </div>
            </div>

            {/* Clear button */}
            {(searchQuery || selectedTags.length > 0) && (
              <EditButton
                type="button"
                onClick={clearFilters}
                variant="default"
                size="sm"
                className="flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                クリア
              </EditButton>
            )}
          </EditCard>
        </div>

        {/* Articles Grid */}
        <section aria-live="polite">
          {paginatedPosts.length > 0 ? (
            <>
              <div className="edit-grid-3 gap-6 mb-12">
                {paginatedPosts.map((post, index) => (
                  <EditCard
                    key={post.slug}
                    variant="default"
                    size="lg"
                    className={`group ${index % 3 === 0 ? "edit-bg-pastel-peach" : index % 3 === 1 ? "edit-bg-pastel-mint" : ""}`}
                  >
                    {/* Tags */}
                    <div className="mb-4 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <EditTag
                          key={tag}
                          href={`/tags/${tag}`}
                          variant="pastel-lavender"
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

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="edit-bg-muted p-6">
                  <nav
                    className="flex items-center justify-center gap-2"
                    aria-label="ページネーション"
                  >
                    <EditButton
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      variant="default"
                      size="sm"
                    >
                      ←
                    </EditButton>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <EditButton
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        variant={currentPage === page ? "primary" : "default"}
                        size="sm"
                      >
                        {page}
                      </EditButton>
                    ))}

                    <EditButton
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      variant="default"
                      size="sm"
                    >
                      →
                    </EditButton>
                  </nav>
                </div>
              )}
            </>
          ) : (
            <div className="py-16 text-center">
              <EditCard variant="subtle" size="lg" className="max-w-md mx-auto text-center">
                <div className="edit-byline mb-4">NOT FOUND</div>
                <p className="text-lg text-muted-foreground">
                  該当する記事は見つかりませんでした。
                  <br />
                  条件を変更してお試しください。
                </p>
              </EditCard>
            </div>
          )}
        </section>
      </EditContainer>
    </div>
  )
}

export default function BlogsPage() {
  return (
    <Suspense fallback={<div className="edit-section text-center">読み込み中です</div>}>
      <BlogsContent />
    </Suspense>
  )
}
