import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Header } from "@/components/Header"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-screen bg-background">
          <Header />
          <main className="flex-1">
            <div className="container mx-auto px-4">{children}</div>
          </main>
          <footer className="border-t border-border bg-muted">
            <div className="container mx-auto px-4 py-8">
              <div className="text-center text-sm text-muted-foreground">
                <p>© 2025 Hodgepodge</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
