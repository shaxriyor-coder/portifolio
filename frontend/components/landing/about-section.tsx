import { fetchApi } from '@/lib/api-client'

interface AboutMe {
  id?: number
  content: string
  email?: string
  phone_number?: string
  telegram?: string
  yearly_experience?: number
  projects_completed?: number
  client_satisfaction?: number
  technologies?: string
  created_at?: string
  updated_at?: string
}

export async function AboutSection() {
  const data = await fetchApi<AboutMe | AboutMe[] | null>('/api/about-me', null)
  const aboutMe = Array.isArray(data) ? data[0] ?? null : data

  const techArray = aboutMe?.technologies
    ? aboutMe.technologies.split(',').map(t => t.trim()).filter(t => t)
    : []

  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="grid items-start gap-10 md:grid-cols-2 md:gap-12">
        {/* Left side - Content */}
        <div className="animate-slide-up space-y-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">About Me</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {aboutMe?.content || "A developer specializing in modern web technologies."}
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <div className="space-y-3">
              {aboutMe?.email && (
                <div className="flex items-center gap-3">
                  <span className="text-primary font-medium">Email:</span>
                  <a href={`mailto:${aboutMe.email}`} className="text-muted-foreground hover:text-foreground transition-colors">
                    {aboutMe.email}
                  </a>
                </div>
              )}
              {aboutMe?.phone_number && (
                <div className="flex items-center gap-3">
                  <span className="text-primary font-medium">Phone:</span>
                  <a href={`tel:${aboutMe.phone_number}`} className="text-muted-foreground hover:text-foreground transition-colors">
                    {aboutMe.phone_number}
                  </a>
                </div>
              )}
              {aboutMe?.telegram && (
                <div className="flex items-center gap-3">
                  <span className="text-primary font-medium">Telegram:</span>
                  <a
                    href={`https://t.me/${aboutMe.telegram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {aboutMe.telegram}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Technologies */}
          {techArray.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {techArray.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right side - Stats */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          <div className="p-4 sm:p-6 rounded-lg bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-border hover:border-primary transition-colors">
            <div className="text-2xl sm:text-3xl font-bold mb-2">{aboutMe?.yearly_experience || 0}+</div>
            <p className="text-sm text-muted-foreground">Years of Experience</p>
          </div>
          <div className="p-4 sm:p-6 rounded-lg bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-border hover:border-primary transition-colors">
            <div className="text-2xl sm:text-3xl font-bold mb-2">{aboutMe?.projects_completed || 0}+</div>
            <p className="text-sm text-muted-foreground">Projects Completed</p>
          </div>
          <div className="p-4 sm:p-6 rounded-lg bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-border hover:border-primary transition-colors">
            <div className="text-2xl sm:text-3xl font-bold mb-2">{aboutMe?.client_satisfaction || 0}%</div>
            <p className="text-sm text-muted-foreground">Client Satisfaction</p>
          </div>
          <div className="p-4 sm:p-6 rounded-lg bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-border hover:border-primary transition-colors">
            <div className="text-2xl sm:text-3xl font-bold mb-2">{techArray.length}+</div>
            <p className="text-sm text-muted-foreground">Technologies Used</p>
          </div>
        </div>
      </div>
    </section>
  )
}
