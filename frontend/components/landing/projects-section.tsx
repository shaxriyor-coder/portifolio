'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ExternalLink, Github } from 'lucide-react'
import { apiUrl } from '@/lib/api-client'

interface Project {
  id: number
  title: string
  description: string
  project_type: 'web' | 'bot'
  image_url?: string
  bot_username?: string
  tech_stack: string
  github_url?: string
  live_url?: string
}

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch(apiUrl('/api/projects'))
        const data = await res.json()
        setProjects(data)
      } catch (error) {
        console.error('Failed to fetch projects:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return (
    <section id="projects" className="py-20 px-6 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold mb-12 text-center animate-slide-up">Tanlangan Loyihalar</h2>

      {loading ? (
        <div className="text-center text-muted-foreground">Loyihalar yuklanmoqda...</div>
      ) : projects.length === 0 ? (
        <div className="text-center text-muted-foreground py-12">Hali loyiha qo'shilmagan</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="rounded-lg overflow-hidden bg-card border border-border hover:border-primary hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 group"
              style={{
                animation: `slideUp 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              {/* Project Image or Bot Info */}
              {project.project_type === 'web' && project.image_url ? (
                <div className="w-full h-48 bg-gradient-to-br from-purple-600/20 to-blue-600/20 overflow-hidden">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ) : project.project_type === 'bot' ? (
                <div className="w-full h-48 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🤖</div>
                    <div className="text-sm font-medium text-muted-foreground">
                      Telegram Bot
                    </div>
                    {project.bot_username && (
                      <div className="text-sm font-bold text-primary mt-1">
                        {project.bot_username}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">💻</div>
                    <div className="text-sm font-medium text-muted-foreground">
                      Veb loyiha
                    </div>
                  </div>
                </div>
              )}

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech_stack.split(',').map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-primary"
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:text-primary-foreground hover:bg-primary px-3 py-2 rounded-lg transition-all"
                    >
                      <ExternalLink size={16} />
                      Jonli
                    </a>
                  )}
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:text-primary-foreground hover:bg-primary px-3 py-2 rounded-lg transition-all"
                    >
                      <Github size={16} />
                      Kod
                    </a>
                  )}
                  <Link
                    href={`/project/${project.id}`}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg transition-all"
                  >
                    Batafsil →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
