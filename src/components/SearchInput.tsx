"use client"

import { Search } from "lucide-react"
import { useId } from "react"

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchInput({ value, onChange, placeholder = "キーワードまたはタグで検索" }: SearchInputProps) {
  const searchId = useId()

  return (
    <div className="relative">
      <label htmlFor={searchId} className="sr-only">検索</label>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        <input
          id={searchId}
          type="text"
          className="w-full neu-concave rounded-2xl bg-gradient-to-r from-card to-secondary/30 pl-12 pr-6 py-4 text-lg text-card-foreground placeholder:text-muted-foreground focus:neu-pressed focus:outline-none transition-premium"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  )
}
