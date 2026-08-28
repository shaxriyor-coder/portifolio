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

  const isLoginPage = pathname.startsWith('/admin/login')

  useEffect(() => {
    const auth = localStorage.getItem('admin-authenticated') === 'true'
    setAuthenticated(auth)

    if (!auth && !isLoginPage) {
      router.replace('/admin/login')
    }

    if (auth && isLoginPage) {
      router.replace('/admin')
    }
  }, [pathname, router, isLoginPage])

  if (isLoginPage) {
    return <>{children}</>
  }

  if (authenticated === null) {
    return null
  }

  if (!authenticated) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col bg-background md:h-screen md:flex-row">
      {/* Sidebar */}
      <aside className="w-full border-b border-border bg-card/50 flex flex-col md:w-64 md:border-b-0 md:border-r">
        {/* Logo */}
        <div className="p-4 border-b border-border md:p-6">
          <h1 className="text-lg font-bold md:text-xl">Admin Paneli</h1>
          <p className="text-xs text-muted-foreground mt-1">Portifoliongizni boshqaring</p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-row flex-wrap gap-2 p-3 md:flex-1 md:flex-col md:flex-nowrap md:space-y-2 md:gap-0 md:p-4 md:overflow-y-auto">
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
      <main className="flex-1 min-w-0 overflow-x-hidden overflow-y-auto">
        <div className="p-4 sm:p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}