import { MobileMenu, DesktopMenu } from "@/components/MobileMenu"

const navigation = [
  { name: "記事一覧", href: "/blogs" },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 glass border-b border-border/30 transition-premium animate-float">
      <div className="container mx-auto px-4">
        {/* デスクトップメニュー */}
        <DesktopMenu navigation={navigation} />
        
        {/* モバイルメニュー */}
        <MobileMenu navigation={navigation} />
      </div>
    </header>
  )
}
