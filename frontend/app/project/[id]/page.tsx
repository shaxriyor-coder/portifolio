import Link from 'next/link'
import { Navigation } from '@/components/landing/navigation'
import { Footer } from '@/components/landing/footer'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'
import { fetchApi } from '@/lib/api-client'

interface Project {
  id: number
  title: string
  description: string
  image_url?: string
  tech_stack: string
  github_url?: string
  live_url?: string
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = await fetchApi<Project | null>(`/api/projects/${id}`, null)

  if (!project || !project.id) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl font-bold mb-4">Project not found</p>
            <Link href="/" className="text-primary hover:text-primary-foreground hover:bg-primary px-4 py-2 rounded-lg transition-all">
              Go back home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 pt-20">
        {/* Back Button */}
        <div className="max-w-6xl mx-auto px-6 py-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-foreground hover:bg-primary/20 px-4 py-2 rounded-lg transition-all mb-8"
          >
            <ArrowLeft size={20} />
            Back to Projects
          </Link>
        </div>

        {/* Project Content */}
        <div className="max-w-6xl mx-auto px-6 pb-20">
          {/* Header */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 break-words">{project.title}</h1>

          {/* Project Image */}
          {project.image_url && (
            <div className="w-full h-56 sm:h-80 md:h-96 rounded-lg overflow-hidden mb-8 md:mb-12 bg-gradient-to-br from-purple-600/20 to-blue-600/20">
              <img src={project.image_url} alt={project.title} loading="lazy" className="w-full h-full object-cover" />
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">Overview</h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-8 leading-relaxed">{project.description}</p>

              <h2 className="text-xl sm:text-2xl font-bold mb-4">Tech Stack</h2>
              <div className="flex flex-wrap gap-3 mb-8">
                {project.tech_stack.split(',').map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-primary font-medium"
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="p-6 rounded-lg bg-card border border-border">
                <h3 className="font-bold mb-4">Project Links</h3>
                <div className="space-y-3">
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg bg-background hover:bg-primary hover:text-primary-foreground transition-all"
                    >
                      <ExternalLink size={20} />
                      <span>View Live</span>
                    </a>
                  )}
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg bg-background hover:bg-primary hover:text-primary-foreground transition-all"
                    >
                      <Github size={20} />
                      <span>View Code</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="p-6 rounded-lg bg-card border border-border">
                <h3 className="font-bold mb-2">Status</h3>
                <p className="text-muted-foreground">Completed</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
