import { db } from '@/lib/db';
import { validateData, apiResponse, apiError } from '@/lib/api-utils';
import { projectSchema, type Project } from '@/lib/validation-schemas';

export async function GET() {
  try {
    const projects = db.projects.all();
    return apiResponse(projects);
  } catch (error) {
    return apiError('Failed to fetch projects', 500);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = validateData<Project>(projectSchema, body);

    if (!result.success) {
      return apiError('Validation failed', 400, result.errors);
    }

    const { title, description, project_type, tech_stack, github_url, live_url, image_url, bot_username } = result.data;
    const project = db.projects.create({
      title,
      description,
      project_type,
      tech_stack,
      github_url: github_url || undefined,
      live_url: live_url || undefined,
      image_url: image_url || undefined,
      bot_username: bot_username || undefined,
    });

    return apiResponse(project, 201);
  } catch (error) {
    return apiError('Failed to create project', 500);
  }
}
