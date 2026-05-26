import fs from 'fs'
import path from 'path'

// File-backed database storage for local development
// Persists data across server restarts in frontend/data/db.json

export interface Profile {
  id: number;
  name: string;
  bio?: string;
  title?: string;
  email?: string;
  phone?: string;
  telegram?: string;
  github?: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  project_type?: 'web' | 'bot';
  image_url?: string;
  bot_username?: string;
  tech_stack: string;
  github_url?: string;
  live_url?: string;
  created_at?: string;
}

export interface Skill {
  id: number;
  category: string;
  name: string;
  level?: string;
}

export interface ContactSubmission {
  id: number;
  email: string;
  message: string;
  created_at?: string;
}

export interface AboutMe {
  id: number;
  content: string;
  email?: string;
  phone_number?: string;
  telegram?: string;
  yearly_experience?: number;
  projects_completed?: number;
  client_satisfaction?: number;
  technologies?: string;
  created_at?: string;
  updated_at?: string;
}

const DB_FILE_PATH = path.join(process.cwd(), 'data', 'db.json')

interface StorageSchema {
  profile: Profile[]
  aboutMe: AboutMe[]
  projects: Project[]
  skills: Skill[]
  contactSubmissions: ContactSubmission[]
}

interface DbFileSchema {
  storage: StorageSchema
  idCounters: {
    projects: number
    skills: number
    contactSubmissions: number
  }
}

const defaultStorage: StorageSchema = {
  profile: [
    {
      id: 1,
      name: 'Alex Johnson',
      title: 'Senior Full Stack Developer',
      bio: 'Passionate about building scalable web applications with modern technologies.',
      email: 'alex@example.com',
      phone: '+1 (555) 123-4567',
      telegram: '@Shaxriyor_Egamberdiyev',
      github: 'https://github.com/shaxriyor-coder',
    },
  ],
  aboutMe: [
    {
      id: 1,
      content: 'Passionate about building scalable web applications with modern technologies. I love solving complex problems and creating user-friendly interfaces.',
      email: 'alex@example.com',
      phone_number: '+1 (555) 123-4567',
      telegram: '@Shaxriyor_Egamberdiyev',
      yearly_experience: 5,
      projects_completed: 25,
      client_satisfaction: 95,
      technologies: 'React, Next.js, TypeScript, Node.js, PostgreSQL, Docker',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  projects: [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with real-time inventory',
      project_type: 'web',
      image_url: '/projects/ecommerce.jpg',
      tech_stack: 'Next.js, Node.js, PostgreSQL, Stripe',
      github_url: 'https://github.com/shaxriyor-coder/ecommerce',
      live_url: 'https://ecommerce-demo.com',
      created_at: new Date().toISOString(),
    },
  ],
  skills: [
    { id: 1, category: 'Frontend', name: 'React', level: 'expert' },
    { id: 2, category: 'Frontend', name: 'TypeScript', level: 'expert' },
    { id: 3, category: 'Backend', name: 'Node.js', level: 'expert' },
    { id: 4, category: 'Backend', name: 'PostgreSQL', level: 'intermediate' },
    { id: 5, category: 'Tools', name: 'Docker', level: 'intermediate' },
  ],
  contactSubmissions: [],
}

const defaultIdCounters = {
  projects: 2,
  skills: 6,
  contactSubmissions: 1,
}

function saveDbFile(data: DbFileSchema) {
  try {
    fs.mkdirSync(path.dirname(DB_FILE_PATH), { recursive: true })
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8')
  } catch (error) {
    console.error('Failed to save DB file:', error)
  }
}

function loadDbFile(): DbFileSchema {
  try {
    if (fs.existsSync(DB_FILE_PATH)) {
      const raw = fs.readFileSync(DB_FILE_PATH, 'utf-8')
      return JSON.parse(raw) as DbFileSchema
    }
  } catch (error) {
    console.error('Failed to load DB file:', error)
  }

  const data: DbFileSchema = {
    storage: defaultStorage,
    idCounters: defaultIdCounters,
  }
  saveDbFile(data)
  return data
}

const dbFile = loadDbFile()
const storage: StorageSchema = dbFile.storage
let idCounters = dbFile.idCounters

function persist() {
  saveDbFile({ storage, idCounters })
}

export function initializeDatabase() {
  // File-backed storage is initialized lazily on first access.
  // This function exists for compatibility with legacy seed scripts.
  return true
}

export const db = {
  profile: {
    get(): Profile | null {
      return storage.profile[0] || null;
    },
    update(data: Partial<Profile>): Profile {
      const existing = storage.profile[0];
      if (!existing) {
        const newProfile: Profile = { id: 1, name: 'Default', ...data };
        storage.profile.push(newProfile);
        persist();
        return newProfile;
      }
      const updated = { ...existing, ...data };
      storage.profile[0] = updated;
      persist();
      return updated;
    },
  },
  aboutMe: {
    get(): AboutMe | null {
      return storage.aboutMe[0] || null;
    },
    create(data: Omit<AboutMe, 'id' | 'created_at' | 'updated_at'>): AboutMe {
      const aboutMe: AboutMe = {
        id: 1,
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      storage.aboutMe[0] = aboutMe;
      persist();
      return aboutMe;
    },
    update(id: number, data: Partial<AboutMe>): AboutMe {
      const existing = storage.aboutMe[0];
      const updated: AboutMe = {
        ...existing,
        ...data,
        id,
        updated_at: new Date().toISOString(),
      } as AboutMe;
      storage.aboutMe[0] = updated;
      persist();
      return updated;
    },
  },
  projects: {
    all(): Project[] {
      return storage.projects;
    },
    get(id: number): Project | null {
      return storage.projects.find(p => p.id === id) || null;
    },
    create(data: Omit<Project, 'id' | 'created_at'>): Project {
      const project: Project = {
        id: idCounters.projects++,
        ...data,
        created_at: new Date().toISOString(),
      };
      storage.projects.push(project);
      persist();
      return project;
    },
    update(id: number, data: Partial<Project>): Project | null {
      const index = storage.projects.findIndex(p => p.id === id);
      if (index === -1) return null;
      storage.projects[index] = { ...storage.projects[index], ...data };
      persist();
      return storage.projects[index];
    },
    delete(id: number): boolean {
      const index = storage.projects.findIndex(p => p.id === id);
      if (index === -1) return false;
      storage.projects.splice(index, 1);
      persist();
      return true;
    },
  },
  skills: {
    all(): Skill[] {
      return storage.skills;
    },
    get(id: number): Skill | null {
      return storage.skills.find(s => s.id === id) || null;
    },
    create(data: Omit<Skill, 'id'>): Skill {
      const skill: Skill = {
        id: idCounters.skills++,
        ...data,
      };
      storage.skills.push(skill);
      persist();
      return skill;
    },
    update(id: number, data: Partial<Skill>): Skill | null {
      const index = storage.skills.findIndex(s => s.id === id);
      if (index === -1) return null;
      storage.skills[index] = { ...storage.skills[index], ...data };
      persist();
      return storage.skills[index];
    },
    delete(id: number): boolean {
      const index = storage.skills.findIndex(s => s.id === id);
      if (index === -1) return false;
      storage.skills.splice(index, 1);
      persist();
      return true;
    },
  },
  contactSubmissions: {
    all(): ContactSubmission[] {
      return storage.contactSubmissions;
    },
    create(data: Omit<ContactSubmission, 'id' | 'created_at'>): ContactSubmission {
      const submission: ContactSubmission = {
        id: idCounters.contactSubmissions++,
        ...data,
        created_at: new Date().toISOString(),
      };
      storage.contactSubmissions.push(submission);
      persist();
      return submission;
    },
  },
};
