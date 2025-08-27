"use client"

import { Fragment } from "react"
import { Listbox, Transition } from "@headlessui/react"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { NeuContainer } from "@/components/ui"

interface TagFilterProps {
  allTags: string[]
  selectedTags: string[]
  onTagsChange: (tags: string[]) => void
}

export function TagFilter({ allTags, selectedTags, onTagsChange }: TagFilterProps) {
  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag]
    onTagsChange(newTags)
  }

  const clearAllTags = () => {
    onTagsChange([])
  }

  return (
    <NeuContainer variant="card" size="lg" gradient="lavender" className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">タグで絞り込み</h3>
        {selectedTags.length > 0 && (
          <button
            type="button"
            onClick={clearAllTags}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
            クリア
          </button>
        )}
      </div>

      <Listbox value={selectedTags} onChange={onTagsChange} multiple>
        <div className="relative">
          <Listbox.Button className="neu-concave w-full cursor-pointer rounded-xl bg-gradient-to-r from-card to-secondary/30 py-4 px-6 text-left focus:neu-pressed focus:outline-none transition-premium">
            <span className="block truncate">
              {selectedTags.length === 0
                ? "タグを選択..."
                : `${selectedTags.length}個のタグを選択中`}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-6">
              <ChevronsUpDown className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="neu-floating absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-xl bg-card py-2 shadow-lg ring-1 ring-border focus:outline-none">
              {allTags.map((tag) => (
                <Listbox.Option
                  key={tag}
                  className={({ active, selected }) =>
                    `relative cursor-pointer select-none py-3 px-6 transition-colors ${
                      active
                        ? "neu-pressed bg-accent/20 text-accent-foreground"
                        : "text-foreground"
                    } ${selected ? "font-semibold" : "font-normal"}`
                  }
                  value={tag}
                >
                  {({ selected }) => (
                    <>
                      <span className="block truncate">{tag}</span>
                      {selected ? (
                        <span className="absolute inset-y-0 right-0 flex items-center pr-6 text-accent">
                          <Check className="h-4 w-4" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>

      {/* 選択されたタグの表示 */}
      {selectedTags.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">選択中のタグ:</p>
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagToggle(tag)}
                className="neu-convex group inline-flex items-center gap-2 rounded-lg bg-accent/10 px-3 py-2 text-sm font-medium text-accent-foreground hover:bg-accent/20 focus:bg-accent/20 focus:outline-none transition-premium"
              >
                {tag}
                <X
                  className="h-3 w-3 transition-transform group-hover:rotate-90"
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </NeuContainer>
  )
}