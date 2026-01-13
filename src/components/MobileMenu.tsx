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
          <div className="flex items-center justify-between px-4 py-4 edit-divider-bottom">
            <Link
              href="/"
              className="text-lg font-bold text-foreground hover:underline decoration-1 underline-offset-2"
            >
              HODGEPODGE
            </Link>
            <Disclosure.Button className="inline-flex items-center justify-center p-2 text-foreground hover:bg-muted focus:outline-none transition-colors">
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
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="duration-150 ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Disclosure.Panel className="edit-divider-bottom">
              <div className="px-4 py-4 space-y-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    href={item.href}
                    className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-muted hover:underline decoration-1 underline-offset-2 focus:outline-none transition-colors"
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

interface DesktopMenuProps {
  navigation: Array<{ name: string; href: string }>
}

export function DesktopMenu({ navigation }: DesktopMenuProps) {
  return (
    <nav className="hidden md:flex items-center justify-between py-6 edit-divider-bottom">
      <Link
        href="/"
        className="text-xl font-bold text-foreground hover:underline decoration-1 underline-offset-2"
      >
        HODGEPODGE
      </Link>
      <div className="flex items-center gap-8">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="text-sm font-medium text-foreground hover:underline decoration-1 underline-offset-2 focus:outline-none transition-colors"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  )
}
