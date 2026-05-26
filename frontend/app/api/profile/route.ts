import { db } from '@/lib/db';
import { validateData, apiResponse, apiError } from '@/lib/api-utils';
import { profileSchema } from '@/lib/validation-schemas';

export const dynamic = 'force-static';

export async function GET() {
  try {
    const profile = db.profile.get();

    if (!profile) {
      return apiResponse({
        id: 1,
        name: '',
        bio: '',
        title: '',
        email: '',
        phone: '',
        telegram: '',
        github: '',
      });
    }

    return apiResponse(profile);
  } catch (error) {
    return apiError('Failed to fetch profile', 500);
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const result = validateData(profileSchema, body);

    if (!result.success) {
      return apiError('Validation failed', 400, result.errors);
    }

    const profile = db.profile.update(result.data);
    return apiResponse(profile);
  } catch (error) {
    return apiError('Failed to update profile', 500);
  }
}
