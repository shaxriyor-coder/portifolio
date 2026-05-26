# Modern Developer Portfolio + Admin Panel

A full-featured developer portfolio website with an integrated admin panel for managing portfolio content. Built with Next.js 16, React 19, TypeScript, and SQLite.

## Features

### Landing Page
- **Hero Section** - Eye-catching introduction with gradient animations
- **About Section** - Professional bio with contact information and stats
- **Skills Section** - Organized skill showcase by categories
- **Projects Section** - Portfolio showcase with project details
- **Contact Form** - Direct contact form with validation
- **Responsive Design** - Mobile-first approach, works on all devices
- **Dark Mode** - Beautiful dark theme with purple-blue accents

### Admin Panel
- **Dashboard** - Overview of portfolio statistics
- **Projects Management** - CRUD operations for projects
- **Skills Management** - Add, edit, and delete skills
- **Profile Editor** - Edit personal information and contact details
- **Toast Notifications** - Real-time feedback for all actions

## Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - Latest React with new features
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **Framer Motion** - Smooth animations (through CSS)
- **Lucide React** - Beautiful icons
- **Sonner** - Toast notifications
- **React Hook Form + Zod** - Form management and validation

### Backend
- **Next.js API Routes** - Serverless backend
- **SQLite (better-sqlite3)** - Lightweight database
- **Zod** - Schema validation

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Seed Sample Data

To populate the database with sample data:

```bash
pnpm tsx scripts/seed.ts
```

This will add sample profile information, skills, and projects.

## Project Structure

```
app/
├── api/
│   ├── projects/
│   │   ├── route.ts           # GET all, POST new
│   │   └── [id]/route.ts      # GET, PUT, DELETE single
│   ├── skills/
│   │   ├── route.ts           # GET all, POST new
│   │   └── [id]/route.ts      # PUT, DELETE single
│   ├── profile/
│   │   └── route.ts           # GET, PUT
│   └── contact/
│       └── route.ts           # POST, GET submissions
├── admin/
│   ├── layout.tsx             # Admin layout with sidebar
│   ├── page.tsx               # Dashboard
│   ├── projects/
│   │   └── page.tsx           # Projects CRUD
│   ├── skills/
│   │   └── page.tsx           # Skills manager
│   └── profile/
│       └── page.tsx           # Profile editor
├── project/
│   └── [id]/
│       └── page.tsx           # Project detail page
├── page.tsx                   # Landing page
├── layout.tsx                 # Root layout
└── globals.css                # Global styles and animations

components/
├── landing/
│   ├── navigation.tsx         # Top navigation
│   ├── hero-section.tsx       # Hero section
│   ├── about-section.tsx      # About section
│   ├── skills-section.tsx     # Skills section
│   ├── projects-section.tsx   # Projects section
│   ├── contact-section.tsx    # Contact form
│   └── footer.tsx             # Footer

lib/
├── db.ts                      # Database setup and initialization
├── api-utils.ts               # API helper functions
└── validation-schemas.ts      # Zod validation schemas

scripts/
└── seed.ts                    # Database seeding script
```

## Environment Variables

For local development, the frontend uses the default backend URL from `.env.example`:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

For production, set `NEXT_PUBLIC_API_BASE_URL` to your backend domain, for example:

```bash
NEXT_PUBLIC_API_BASE_URL=https://api.your-domain.com
```

## Database Schema

### Profile Table
```sql
CREATE TABLE profile (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  bio TEXT,
  title TEXT,
  email TEXT,
  phone TEXT,
  telegram TEXT,
  github TEXT
)
```

### Projects Table
```sql
CREATE TABLE projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  tech_stack TEXT NOT NULL,
  github_url TEXT,
  live_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

### Skills Table
```sql
CREATE TABLE skills (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  level TEXT DEFAULT 'intermediate'
)
```

### Contact Submissions Table
```sql
CREATE TABLE contact_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

## API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project
- `GET /api/projects/[id]` - Get project details
- `PUT /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project

### Skills
- `GET /api/skills` - Get all skills
- `POST /api/skills` - Create new skill
- `PUT /api/skills/[id]` - Update skill
- `DELETE /api/skills/[id]` - Delete skill

### Profile
- `GET /api/profile` - Get profile information
- `PUT /api/profile` - Update profile

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all submissions

## Customization

### Change Colors
Edit the design tokens in `/app/globals.css`:

```css
:root {
  --background: oklch(0.06 0 0);      /* Dark background */
  --primary: #9333ea;                  /* Purple accent */
  --secondary: #3b82f6;                /* Blue accent */
  --accent: #ec4899;                   /* Pink accent */
}
```

### Change Fonts
Update the font imports in `/app/layout.tsx` and the font configuration in `tailwind.config.ts`.

### Add Authentication
The admin panel currently has no authentication. To add protection:

1. Install an auth library like `next-auth`
2. Add middleware to protect `/admin` routes
3. Implement user login/logout

## Performance Optimizations

- **Code Splitting** - Automatic with Next.js
- **Image Optimization** - Use next/image for images
- **CSS Optimization** - Tailwind CSS purges unused styles
- **Font Optimization** - Geist fonts are optimized for web
- **API Caching** - Implement caching headers as needed

## Security Notes

⚠️ **Important**: The current admin panel has no authentication. For production:

1. Add authentication (Auth.js, NextAuth.js, etc.)
2. Implement CSRF protection
3. Add rate limiting to API endpoints
4. Validate and sanitize all user inputs
5. Use HTTPS only
6. Set proper CORS headers if needed

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables if needed
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Node.js:
- Railway
- Render
- Fly.io
- DigitalOcean
- AWS

Note: For production databases, consider migrating from SQLite to PostgreSQL or MySQL for better scalability.

## Development

### Creating a New Component

```tsx
'use client'

import { useState } from 'react'

export function MyComponent() {
  return (
    <div>
      {/* Component content */}
    </div>
  )
}
```

### Adding New Skills
Use the admin panel Skills section to add new skills, or use the API:

```bash
curl -X POST http://localhost:3000/api/skills \
  -H "Content-Type: application/json" \
  -d '{
    "category": "Frontend",
    "name": "React",
    "level": "advanced"
  }'
```

### Adding New Projects
Use the admin panel Projects section or the API:

```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Project",
    "description": "Project description...",
    "tech_stack": "React, TypeScript, Node.js",
    "github_url": "https://github.com/...",
    "live_url": "https://..."
  }'
```

## Troubleshooting

### Database Not Found
If the database is not created:
```bash
pnpm tsx scripts/seed.ts
```

### Port Already in Use
Change the development port:
```bash
pnpm dev -p 3001
```

### Build Errors
Clear cache and rebuild:
```bash
pnpm install
pnpm build
```

## License

MIT - Feel free to use this project for personal or commercial purposes.

## Support

For issues, questions, or suggestions, please open an issue in the repository.

## Changelog

### v1.0.0
- Initial release
- Landing page with full sections
- Admin panel with CRUD operations
- SQLite database integration
- Contact form
- Dark mode theme
- Responsive design
