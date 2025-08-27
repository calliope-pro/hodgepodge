"use client"

import { useState, useEffect } from "react"
import type { TocItem } from "@/lib/toc"

interface TableOfContentsProps {
  items: TocItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-80px 0px -80% 0px",
      },
    )

    const headings = document.querySelectorAll("h2, h3, h4, h5, h6")
    for (const heading of headings) {
      observer.observe(heading)
    }

    return () => observer.disconnect()
  }, [])

  const renderTocItems = (tocItems: TocItem[], depth = 0) => {
    return (
      <ul className={depth === 0 ? "space-y-2" : "mt-2 space-y-1 pl-4"}>
        {tocItems.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block text-sm transition-colors ${
                activeId === item.id
                  ? "text-accent font-medium"
                  : "text-muted-foreground hover:text-foreground"
              } ${depth > 0 ? "text-xs" : ""}`}
            >
              {item.title}
            </a>
            {item.children.length > 0 && renderTocItems(item.children, depth + 1)}
          </li>
        ))}
      </ul>
    )
  }

  if (items.length === 0) return null

  return (
    <nav className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">目次</h2>
      {renderTocItems(items)}
    </nav>
  )
}
