import { db, initializeDatabase } from '../lib/db';

// Initialize database tables
initializeDatabase();

// Seed profile
const profileStmt = db.prepare(`
  INSERT OR REPLACE INTO profile (id, name, bio, title, email, phone, telegram, github)
  VALUES (1, ?, ?, ?, ?, ?, ?, ?)
`);

profileStmt.run(
  'John Developer',
  'I am a passionate full-stack developer with a keen eye for building beautiful, performant, and accessible web experiences. With expertise in modern technologies and a commitment to clean code, I create solutions that stand the test of time.',
  'Senior Full Stack Developer',
  'john@example.com',
  '+1 (555) 123-4567',
  'johndeveloper',
  'https://github.com/johndeveloper'
);

// Seed skills
const skillsStmt = db.prepare(`
  INSERT INTO skills (category, name, level) VALUES (?, ?, ?)
`);

const skills = [
  // Frontend
  ['Frontend', 'React', 'advanced'],
  ['Frontend', 'Next.js', 'advanced'],
  ['Frontend', 'TypeScript', 'advanced'],
  ['Frontend', 'Tailwind CSS', 'advanced'],
  ['Frontend', 'Vue.js', 'intermediate'],
  
  // Backend
  ['Backend', 'Node.js', 'advanced'],
  ['Backend', 'Express', 'advanced'],
  ['Backend', 'Python', 'intermediate'],
  ['Backend', 'PostgreSQL', 'advanced'],
  ['Backend', 'MongoDB', 'advanced'],
  
  // Tools
  ['Tools', 'Git', 'advanced'],
  ['Tools', 'Docker', 'intermediate'],
  ['Tools', 'CI/CD', 'intermediate'],
  ['Tools', 'AWS', 'intermediate'],
  ['Tools', 'Vercel', 'advanced'],
];

skills.forEach(([category, name, level]) => {
  skillsStmt.run(category, name, level);
});

// Seed projects
const projectsStmt = db.prepare(`
  INSERT INTO projects (title, description, tech_stack, github_url, live_url, image_url)
  VALUES (?, ?, ?, ?, ?, ?)
`);

projectsStmt.run(
  'E-Commerce Platform',
  'A full-featured e-commerce platform with product catalog, shopping cart, payment integration, and admin dashboard. Built with modern technologies for high performance and scalability.',
  'React, Next.js, TypeScript, Tailwind CSS, Stripe, PostgreSQL, Node.js',
  'https://github.com/example/ecommerce',
  'https://ecommerce-demo.example.com',
  null
);

projectsStmt.run(
  'Task Management App',
  'A collaborative task management application with real-time updates, team collaboration features, and progress tracking. Designed for teams to organize and prioritize their work effectively.',
  'React, WebSocket, Express, MongoDB, Redux',
  'https://github.com/example/taskapp',
  'https://taskapp-demo.example.com',
  null
);

projectsStmt.run(
  'Portfolio Website',
  'A modern, responsive portfolio website showcasing projects and skills. Features smooth animations, dark mode, and a fully functional admin panel for content management.',
  'Next.js, React, TypeScript, Tailwind CSS, SQLite',
  'https://github.com/example/portfolio',
  'https://portfolio.example.com',
  null
);

console.log('Database seeded successfully!');
