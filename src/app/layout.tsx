import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"
import { Header } from "@/components/Header"
import "./globals.css"

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Hodgepodge",
  description: "日々の記録と小さな覚え書きを気ままにまとめる個人ブログ。暮らしの気づきや考えごとを、無理のない分量でゆっくり更新します。",
  keywords: ["ブログ", "日記", "暮らし", "メモ"],
  authors: [{ name: "calliope" }],
  openGraph: {
    title: "Hodgepodge",
    description: "日々の記録と小さな覚え書きを気ままにまとめる個人ブログ。暮らしの気づきや考えごとを、無理のない分量でゆっくり更新します。",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hodgepodge",
    description: "日々の記録と小さな覚え書きを気ままにまとめる個人ブログ。暮らしの気づきや考えごとを、無理のない分量でゆっくり更新します。",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`${jetbrainsMono.variable} antialiased`}>
        <div className="min-h-screen bg-background flex flex-col">
          <Header />

          <main className="flex-1">
            {children}
          </main>

          {/* Editorial Footer */}
          <footer className="edit-footer">
            <div className="edit-container">
              <div className="edit-grid-2 gap-12 mb-8">
                {/* About */}
                <div>
                  <div className="edit-byline mb-4">HODGEPODGE</div>
                  <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
                    日々の記録と小さな覚え書きを気ままにまとめる個人ブログ。
                    無理のない分量で、ゆっくり更新します。
                  </p>
                </div>

                {/* Links */}
                <div className="text-right">
                  <div className="edit-byline mb-4">LINKS</div>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a
                        href="/"
                        className="text-muted-foreground hover:text-foreground hover:underline decoration-1 underline-offset-2 transition-colors"
                      >
                        ホーム
                      </a>
                    </li>
                    <li>
                      <a
                        href="/blogs"
                        className="text-muted-foreground hover:text-foreground hover:underline decoration-1 underline-offset-2 transition-colors"
                      >
                        記事一覧
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="edit-divider-top pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="text-xs text-muted-foreground">
                  © 2025 Hodgepodge. All rights reserved.
                </div>
                <div className="edit-meta text-xs">
                  <span className="edit-line" />
                  <span className="mx-2">MADE WITH NEXT.JS</span>
                  <span className="edit-line" />
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
