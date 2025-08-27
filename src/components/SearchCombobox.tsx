"use client"

import { useState, useCallback, useId, Fragment } from "react"
import { Combobox, Transition } from "@headlessui/react"
import { Search, Check, ChevronsUpDown } from "lucide-react"
import { getAllPosts } from "@/lib/posts"

interface SearchResult {
  id: string
  title: string
  excerpt: string
  slug: string
  tags: string[]
}

interface SearchComboboxProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchCombobox({ value, onChange, placeholder = "記事を検索..." }: SearchComboboxProps) {
  const searchId = useId()
  const [query, setQuery] = useState(value)
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])

  const searchPosts = useCallback((searchQuery: string): SearchResult[] => {
    if (!searchQuery.trim()) {
      return []
    }

    const posts = getAllPosts()
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
    )

    return filtered.slice(0, 8).map((post) => ({
      id: post.slug,
      title: post.title,
      excerpt: post.description.length > 100 
        ? `${post.description.substring(0, 100)}...` 
        : post.description,
      slug: post.slug,
      tags: post.tags,
    }))
  }, [])

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery)
    onChange(newQuery)
    
    // リアルタイム検索結果の更新
    const results = searchPosts(newQuery)
    setSearchResults(results)
  }

  const handleSelection = (result: SearchResult | null) => {
    if (result) {
      // 記事が選択された場合はページ遷移
      window.location.href = `/blogs/${result.slug}`
    }
  }

  return (
    <div className="flex-1">
      <Combobox value={null} onChange={handleSelection}>
        <div className="relative">
          <label htmlFor={searchId} className="sr-only">
            記事を検索
          </label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Combobox.Input
              id={searchId}
              className="w-full neu-concave rounded-2xl bg-gradient-to-r from-card to-secondary/30 pl-16 pr-16 py-6 text-lg text-card-foreground placeholder:text-muted-foreground focus:neu-pressed focus:outline-none transition-premium"
              placeholder={placeholder}
              value={query}
              onChange={(event) => handleQueryChange(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-6">
              <ChevronsUpDown className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
            </Combobox.Button>
          </div>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setSearchResults([])}
          >
            <Combobox.Options className="neu-floating absolute z-10 mt-2 max-h-80 w-full overflow-auto rounded-xl bg-card py-2 shadow-lg ring-1 ring-border focus:outline-none">
              {searchResults.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none px-6 py-4 text-muted-foreground">
                  検索結果が見つかりませんでした。
                </div>
              ) : (
                searchResults.map((result) => (
                  <Combobox.Option
                    key={result.id}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-3 px-6 transition-colors ${
                        active 
                          ? 'neu-pressed bg-accent/20 text-accent-foreground' 
                          : 'text-foreground'
                      }`
                    }
                    value={result}
                  >
                    {({ selected }) => (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className={`block truncate font-semibold ${selected ? 'font-bold' : ''}`}>
                            {result.title}
                          </span>
                          {selected ? (
                            <Check className="h-4 w-4 text-accent" aria-hidden="true" />
                          ) : null}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {result.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {result.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium bg-secondary text-secondary-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}