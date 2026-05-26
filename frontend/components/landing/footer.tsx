'use client'

import { Github, Instagram, Send } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex justify-between items-start gap-8">
          {/* About */}
          <div className="flex-1">
            <h3 className="font-bold mb-4">Portoflio</h3>
            <p className="text-muted-foreground text-sm">Zamonaviy texnologiyalar bilan chiroyli va foydali veb tajribalarni yaratish.</p>
          </div>

          {/* Quick Links */}
          <div className="flex-shrink-0">
            <h3 className="font-bold mb-4">Tez Havolalar</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                  Men haqimda
                </a>
              </li>
              <li>
                <a href="#skills" className="text-muted-foreground hover:text-foreground transition-colors">
                  Ko'nikmalar
                </a>
              </li>
              <li>
                <a href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">
                  Loyihalar
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="flex-shrink-0">
            <h3 className="font-bold mb-4">Bog'lanish</h3>
            <div className="flex gap-4">
              <a
                href="https://t.me/Shaxriyor_Egamberdiyev"
                className="p-2 rounded-lg bg-background hover:bg-primary hover:text-primary-foreground transition-all"
                aria-label="Telegram"
                target="_blank"
                rel="noreferrer"
              >
                <Send size={20} />
              </a>
              <a
                href="https://github.com/shaxriyor-coder"
                className="p-2 rounded-lg bg-background hover:bg-primary hover:text-primary-foreground transition-all"
                aria-label="GitHub"
                target="_blank"
                rel="noreferrer"
              >
                <Github size={20} />
              </a>
              <a
                href="https://instagram.com/shaxriyore1gg"
                className="p-2 rounded-lg bg-background hover:bg-primary hover:text-primary-foreground transition-all"
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
