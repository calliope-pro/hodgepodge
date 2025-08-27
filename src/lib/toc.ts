export interface TocItem {
  id: string
  title: string
  level: number
  children: TocItem[]
}

export function generateToc(content: string): TocItem[] {
  // HTMLコンテンツから見出しタグを抽出
  const headingRegex = /<h([2-6])[^>]*>(.*?)<\/h[2-6]>/gi
  const headings: Array<{ level: number; title: string }> = []
  let match: RegExpExecArray | null

  match = headingRegex.exec(content)
  while (match !== null) {
    const level = parseInt(match[1], 10)
    const title = match[2]
      .replace(/<[^>]+>/g, "") // HTMLタグを除去
      .replace(/&[^;]+;/g, " ") // HTMLエンティティを除去
      .trim()

    headings.push({ level, title })
    match = headingRegex.exec(content)
  }

  const tocItems: TocItem[] = []
  const stack: TocItem[] = []

  for (const heading of headings) {
    const { level, title } = heading
    const id = title
      .toLowerCase()
      .replace(/[^\w\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\s-]/g, "")
      .replace(/\s+/g, "-")

    const item: TocItem = {
      id,
      title,
      level,
      children: [],
    }

    while (stack.length > 0 && stack[stack.length - 1].level >= level) {
      stack.pop()
    }

    if (stack.length === 0) {
      tocItems.push(item)
    } else {
      stack[stack.length - 1].children.push(item)
    }

    stack.push(item)
  }

  return tocItems
}
