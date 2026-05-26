'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { BarChart3, FileText, Settings, Users, LogOut } from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const auth = localStorage.getItem('admin-authenticated') === 'true'
    setAuthenticated(auth)

    if (!auth && !pathname.startsWith('/admin/login')) {
      router.replace('/admin/login')
    }

    if (auth && pathname === '/admin/login') {
      router.replace('/admin')
    }
  }, [pathname, router])

  if (authenticated === null) {
    return null
  }

  if (!authenticated && pathname.startsWith('/admin') && pathname !== '/admin/login') {
    return null
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card/50 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <h1 className="text-xl font-bold">Admin Paneli</h1>
          <p className="text-xs text-muted-foreground mt-1">Portifoliongizni boshqaring</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
          >
            <BarChart3 size={20} />
            <span>Bosh sahifa</span>
          </Link>
          <Link
            href="/admin/projects"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
          >
            <FileText size={20} />
            <span>Loyihalar</span>
          </Link>
          <Link
            href="/admin/skills"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
          >
            <Users size={20} />
            <span>Ko'nikmalar</span>
          </Link>
          <Link
            href="/admin/about"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
          >
            <FileText size={20} />
            <span>Men haqimda</span>
          </Link>
          <Link
            href="/admin/profile"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
          >
            <Settings size={20} />
            <span>Profil</span>
          </Link>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
          >
            <LogOut size={20} />
            <span>Saytga qaytish</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
