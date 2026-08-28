'use client'

import { Github, Instagram, Send } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          {/* About */}
          <div className="flex-1">
            <h3 className="mb-4 font-bold">Portoflio</h3>
            <p className="text-sm text-muted-foreground">Zamonaviy texnologiyalar bilan chiroyli va foydali veb tajribalarni yaratish.</p>
          </div>

          {/* Quick Links */}
          <div className="sm:flex-shrink-0">
            <h3 className="mb-4 font-bold">Tez Havolalar</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="text-muted-foreground transition-colors hover:text-foreground">
                  Men haqimda
                </a>
              </li>
              <li>
                <a href="#skills" className="text-muted-foreground transition-colors hover:text-foreground">
                  Ko'nikmalar
                </a>
              </li>
              <li>
                <a href="#projects" className="text-muted-foreground transition-colors hover:text-foreground">
                  Loyihalar
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="sm:flex-shrink-0">
            <h3 className="mb-4 font-bold">Bog'lanish</h3>
            <div className="flex gap-4">
              <a
                href="https://t.me/Shaxriyor_Egamberdiyev"
                className="rounded-lg bg-background p-3 transition-all hover:bg-primary hover:text-primary-foreground"
                aria-label="Telegram"
                target="_blank"
                rel="noreferrer"
              >
                <Send size={20} />
              </a>
              <a
                href="https://github.com/shaxriyor-coder"
                className="rounded-lg bg-background p-3 transition-all hover:bg-primary hover:text-primary-foreground"
                aria-label="GitHub"
                target="_blank"
                rel="noreferrer"
              >
                <Github size={20} />
              </a>
              <a
                href="https://instagram.com/shaxriyore1gg"
                className="rounded-lg bg-background p-3 transition-all hover:bg-primary hover:text-primary-foreground"
                aria-label="Instagram"
                target="_blank"
                rel="noreferrer"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
