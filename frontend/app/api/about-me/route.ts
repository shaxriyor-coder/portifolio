import { db } from '@/lib/db';
import { validateData, apiResponse, apiError } from '@/lib/api-utils';
import { aboutMeSchema } from '@/lib/validation-schemas';

export const dynamic = 'force-static';

export async function GET() {
  try {
    const aboutMe = db.aboutMe.get();

    if (!aboutMe) {
      return apiResponse({
        id: 1,
        content: '',
        email: '',
        phone_number: '',
        telegram: '',
        yearly_experience: 0,
        projects_completed: 0,
        client_satisfaction: 0,
        technologies: '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    }

    return apiResponse(aboutMe);
  } catch (error) {
    console.error('GET error:', error);
    return apiError('Failed to fetch About Me', 500);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = validateData(aboutMeSchema, body);

    if (!result.success) {
      return apiError('Validation failed', 400, result.errors);
    }

    const data = result.data as {
      content: string;
      email?: string;
      phone_number?: string;
      telegram?: string;
      yearly_experience?: number;
      projects_completed?: number;
      client_satisfaction?: number;
      technologies?: string;
    };

    const existing = db.aboutMe.get();
    if (existing) {
      const updated = db.aboutMe.update(existing.id, data);
      return apiResponse(updated);
    }

    const aboutMe = db.aboutMe.create(data);
    return apiResponse(aboutMe, 201);
  } catch (error) {
    console.error('POST error:', error);
    return apiError('Failed to create About Me', 500);
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const result = validateData(aboutMeSchema, body);

    if (!result.success) {
      return apiError('Validation failed', 400, result.errors);
    }

    const data = result.data as {
      content: string;
      email?: string;
      phone_number?: string;
      telegram?: string;
      yearly_experience?: number;
      projects_completed?: number;
      client_satisfaction?: number;
      technologies?: string;
    };

    const existing = db.aboutMe.get();
    if (!existing) {
      const aboutMe = db.aboutMe.create(data);
      return apiResponse(aboutMe, 201);
    }

    const updated = db.aboutMe.update(existing.id, data);
    return apiResponse(updated);
  } catch (error) {
    console.error('PUT error:', error);
    return apiError('Failed to update About Me', 500);
  }
}
