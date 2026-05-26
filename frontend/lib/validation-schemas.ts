import { z } from 'zod';

export const projectSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  project_type: z.enum(['web', 'bot']).default('web'),
  tech_stack: z.string().min(1, 'Tech stack is required'),
  github_url: z.string().url('Invalid GitHub URL').optional().or(z.literal('')),
  live_url: z.string().url('Invalid live URL').optional().or(z.literal('')),
  image_url: z.string().optional(),
  bot_username: z.string().optional(),
}).refine((data) => {
  // If project type is bot, bot_username is required and image_url should be empty
  if (data.project_type === 'bot') {
    return data.bot_username && data.bot_username.trim().length > 0;
  }
  return true;
}, {
  message: "Bot username is required for Telegram bots",
  path: ["bot_username"],
}).refine((data) => {
  // If project type is web, image_url is recommended but not required
  return true;
});

export const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  bio: z.string().min(10, 'Bio must be at least 10 characters').optional(),
  title: z.string().min(2, 'Title is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  telegram: z.string().optional(),
  github: z.string().url('Invalid GitHub URL').optional(),
});

export const skillSchema = z.object({
  category: z.string().min(1, 'Category is required'),
  name: z.string().min(1, 'Skill name is required'),
  level: z.enum(['beginner', 'intermediate', 'advanced']).default('intermediate'),
});

export const contactSchema = z.object({
  email: z.string().email('Invalid email'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const aboutMeSchema = z.object({
  content: z.string().min(10, 'About Me content must be at least 10 characters'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  phone_number: z.string().optional().or(z.literal('')),
  telegram: z.string().optional().or(z.literal('')),
  yearly_experience: z.coerce.number().min(0, 'Experience cannot be negative').default(0),
  projects_completed: z.coerce.number().min(0, 'Projects cannot be negative').default(0),
  client_satisfaction: z.coerce.number().min(0).max(100, 'Satisfaction must be between 0-100').default(0),
  technologies: z.string().optional().or(z.literal('')),
});

export type Project = z.infer<typeof projectSchema> & { id?: number; created_at?: string };
export type Profile = z.infer<typeof profileSchema> & { id?: number };
export type Skill = z.infer<typeof skillSchema> & { id?: number };
export type Contact = z.infer<typeof contactSchema>;
export type AboutMe = z.infer<typeof aboutMeSchema> & { id?: number; created_at?: string; updated_at?: string };

export interface ContactSubmission extends Contact {
  id?: number;
  created_at?: string;
}
