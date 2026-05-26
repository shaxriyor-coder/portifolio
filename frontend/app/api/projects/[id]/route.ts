import { db } from '@/lib/db';
import { validateData, apiResponse, apiError } from '@/lib/api-utils';
import { projectSchema, type Project } from '@/lib/validation-schemas';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return db.projects.all().map((project) => ({ id: String(project.id) }));
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const projectId = parseInt(id);
    const project = db.projects.get(projectId);

    if (!project) {
      return apiError('Project not found', 404);
    }

    return apiResponse(project);
  } catch (error) {
    return apiError('Failed to fetch project', 500);
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const projectId = parseInt(id);
    const body = await request.json();
    const result = validateData<Project>(projectSchema, body);

    if (!result.success) {
      return apiError('Validation failed', 400, result.errors);
    }

    const { title, description, project_type, tech_stack, github_url, live_url, image_url, bot_username } = result.data;
    const project = db.projects.update(projectId, {
      title,
      description,
      project_type,
      tech_stack,
      github_url: github_url || undefined,
      live_url: live_url || undefined,
      image_url: image_url || undefined,
      bot_username: bot_username || undefined,
    });

    if (!project) {
      return apiError('Project not found', 404);
    }

    return apiResponse(project);
  } catch (error) {
    return apiError('Failed to update project', 500);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const projectId = parseInt(id);
    const deleted = db.projects.delete(projectId);

    if (!deleted) {
      return apiError('Project not found', 404);
    }

    return apiResponse({ success: true });
  } catch (error) {
    return apiError('Failed to delete project', 500);
  }
}
