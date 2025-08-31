import { MobileMenu, DesktopMenu } from "@/components/MobileMenu"

const navigation = [
  { name: "記事一覧", href: "/blogs" },
]

export function Header() {
  return (
    <header className="glass border-b border-border/30">
      <div className="container mx-auto px-4">
        {/* デスクトップメニュー */}
        <DesktopMenu navigation={navigation} />
        
        {/* モバイルメニュー */}
        <MobileMenu navigation={navigation} />
      </div>
    </header>
  )
}
