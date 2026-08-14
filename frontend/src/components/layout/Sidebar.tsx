'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, User, Settings, Users } from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/team', label: 'Team', icon: Users },
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/settings', label: 'Settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex w-[72px] shrink-0 flex-col border-r border-zinc-200 bg-white min-[1024px]:w-60 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex h-14 items-center justify-center border-b border-zinc-200 px-3 min-[1024px]:justify-start dark:border-zinc-800">
        <div aria-hidden="true" className="h-5 w-5 shrink-0 rounded-[6px] bg-[#3D4EAE]" />

        <span className="ml-3 hidden text-sm font-semibold min-[1024px]:inline">Group 6</span>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href

          return (
            <Link
              key={href}
              href={href}
              className={`flex min-h-11 items-center justify-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors min-[1024px]:justify-start ${
                active
                  ? 'bg-[#D6DEFA] text-[#3D4EAE]'
                  : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="hidden min-[1024px]:inline">{label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
