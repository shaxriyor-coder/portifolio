import { db } from '@/lib/db';
import { validateData, apiResponse, apiError } from '@/lib/api-utils';
import { contactSchema } from '@/lib/validation-schemas';

export const dynamic = 'force-static';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = validateData(contactSchema, body);

    if (!result.success) {
      return apiError('Validation failed', 400, result.errors);
    }

    const submission = db.contactSubmissions.create(result.data);
    return apiResponse(submission, 201);
  } catch (error) {
    return apiError('Failed to submit contact form', 500);
  }
}

export async function GET() {
  try {
    const submissions = db.contactSubmissions.all();
    return apiResponse(submissions);
  } catch (error) {
    return apiError('Failed to fetch submissions', 500);
  }
}
