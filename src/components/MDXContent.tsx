import { useMemo, createElement } from "react"
import { Fragment, jsx, jsxs } from "react/jsx-runtime"

interface MDXContentProps {
  code: string
}

// 見出し要素にIDを自動付与するカスタムコンポーネント
const createHeadingComponent = (level: number) => {
  return ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => {
    const text =
      typeof children === "string"
        ? children
        : Array.isArray(children)
          ? children.join("")
          : String(children)

    const id = text
      .toLowerCase()
      .replace(/[^\w\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\s-]/g, "")
      .replace(/\s+/g, "-")

    return createElement(`h${level}`, { id, ...props }, children)
  }
}

export function MDXContent({ code }: MDXContentProps) {
  const Component = useMemo(() => {
    const fn = new Function("arguments", code)
    return fn([{ Fragment, jsx, jsxs }]).default
  }, [code])

  // 外部リンクに target="_blank" rel="noopener noreferrer" を自動追加
  const LinkComponent = ({ href, children, ...props }: { href?: string; children: React.ReactNode; [key: string]: unknown }) => {
    const isExternalLink = href?.startsWith('http://') || href?.startsWith('https://')

    if (isExternalLink) {
      return createElement('a', { href, target: '_blank', rel: 'noopener noreferrer', ...props }, children)
    }

    return createElement('a', { href, ...props }, children)
  }

  const components = {
    h2: createHeadingComponent(2),
    h3: createHeadingComponent(3),
    h4: createHeadingComponent(4),
    h5: createHeadingComponent(5),
    h6: createHeadingComponent(6),
    a: LinkComponent,
  }

  return (
    <div className="prose prose-lg max-w-none [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-gray-900 [&_h4]:mt-4 [&_h4]:mb-2 [&_h4]:text-lg [&_h4]:font-medium [&_h4]:text-gray-900 [&_p]:mb-4 [&_p]:leading-7 [&_p]:text-gray-700 [&_ul]:mb-4 [&_ul]:ml-6 [&_ul]:list-disc [&_ul]:space-y-2 [&_ol]:mb-4 [&_ol]:ml-6 [&_ol]:list-decimal [&_ol]:space-y-2 [&_li]:text-gray-700 [&_blockquote]:border-l-4 [&_blockquote]:border-blue-500 [&_blockquote]:bg-blue-50 [&_blockquote]:p-4 [&_blockquote]:italic [&_blockquote]:text-blue-900 [&_blockquote]:my-4 [&_a]:text-blue-600 [&_a]:hover:text-blue-800 [&_a]:underline [&_code]:rounded [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-sm [&_code]:font-mono [&_code]:text-gray-800 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-gray-900 [&_pre]:p-4 [&_pre]:text-sm [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-white">
      <Component components={components} />
    </div>
  )
}
