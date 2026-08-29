'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ExternalLink, Github } from 'lucide-react'
import { apiUrl } from '@/lib/api-client'

interface Project {
  id: number
  title: string
  description: string
  project_type: 'web' | 'bot' | 'mobile'
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
    <section id="projects" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <h2 className="mb-10 text-center text-3xl font-bold animate-slide-up sm:mb-12 sm:text-4xl">Featured Projects</h2>

      {loading ? (
        <div className="text-center text-muted-foreground">Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground">No projects added yet</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-purple-500/20"
              style={{
                animation: `slideUp 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              {/* Project Image or Bot Info */}
              {(project.project_type === 'web' || project.project_type === 'mobile') && project.image_url ? (
                <div className="w-full h-48 bg-gradient-to-br from-purple-600/20 to-blue-600/20 overflow-hidden">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    loading="lazy"
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
              ) : project.project_type === 'mobile' ? (
                <div className="w-full h-48 bg-gradient-to-br from-green-600/20 to-emerald-600/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📱</div>
                    <div className="text-sm font-medium text-muted-foreground">
                      Mobile App
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">💻</div>
                    <div className="text-sm font-medium text-muted-foreground">
                      Web Project
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
                <div className="flex flex-wrap gap-2">
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-lg px-3 py-2.5 text-primary transition-all hover:bg-primary hover:text-primary-foreground"
                    >
                      <ExternalLink size={16} />
                      Live
                    </a>
                  )}
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-lg px-3 py-2.5 text-primary transition-all hover:bg-primary hover:text-primary-foreground"
                    >
                      <Github size={16} />
                      Code
                    </a>
                  )}
                  <Link
                    href={`/project/${project.id}`}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:text-foreground"
                  >
                    Details →
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
