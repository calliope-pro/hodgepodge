"use client"

import { Disclosure, Transition } from "@headlessui/react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { Fragment } from "react"

interface MobileMenuProps {
  navigation: Array<{ name: string; href: string }>
}

export function MobileMenu({ navigation }: MobileMenuProps) {
  return (
    <Disclosure as="nav" className="md:hidden">
      {({ open }) => (
        <>
          <div className="flex items-center justify-between px-4 py-3">
            <Link
              href="/"
              className="text-xl font-bold text-foreground hover:text-accent transition-colors"
            >
              Hodgepodge
            </Link>
            <Disclosure.Button className="neu-convex inline-flex items-center justify-center rounded-xl p-3 text-muted-foreground hover:text-foreground focus:outline-none focus:neu-pressed transition-premium">
              <span className="sr-only">メニューを開く</span>
              {open ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </Disclosure.Button>
          </div>

          <Transition
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Disclosure.Panel className="neu-floating mx-4 mb-4 rounded-xl bg-card shadow-lg ring-1 ring-border">
              <div className="space-y-1 p-4">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    href={item.href}
                    className="neu-subtle group flex w-full items-center rounded-lg px-4 py-3 text-base font-medium text-foreground hover:neu-pressed hover:text-accent focus:neu-pressed focus:text-accent focus:outline-none transition-premium"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  )
}

// デスクトップメニュー用コンポーネント
interface DesktopMenuProps {
  navigation: Array<{ name: string; href: string }>
}

export function DesktopMenu({ navigation }: DesktopMenuProps) {
  return (
    <nav className="hidden md:flex items-center justify-between py-6">
      <Link
        href="/"
        className="text-2xl font-bold text-foreground hover:text-accent transition-colors"
      >
        Hodgepodge
      </Link>
      <div className="flex items-center space-x-8">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="neu-convex px-6 py-3 rounded-xl font-medium text-foreground hover:text-accent hover:neu-pressed focus:neu-pressed focus:outline-none transition-premium"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  )
}