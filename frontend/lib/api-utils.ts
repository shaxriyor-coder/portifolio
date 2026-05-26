import { z, ZodError, ZodSchema } from 'zod';

export function validateData<TSchema extends ZodSchema>(
  schema: TSchema,
  data: unknown,
): { success: true; data: z.infer<TSchema> } | { success: false; errors: Record<string, string> };

export function validateData<TData>(
  schema: ZodSchema,
  data: unknown,
): { success: true; data: TData } | { success: false; errors: Record<string, string> };

export function validateData<TData = unknown, TSchema extends ZodSchema = ZodSchema>(
  schema: TSchema,
  data: unknown,
): { success: true; data: TData } | { success: false; errors: Record<string, string> } {
  try {
    const validated = schema.parse(data);
    return { success: true, data: validated as TData };
  } catch (error) {
    if (error instanceof ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach((err) => {
        const path = err.path.join('.');
        errors[path] = err.message;
      });
      return { success: false, errors };
    }
    return { success: false, errors: { general: 'Validation failed' } };
  }
}

export function apiResponse<T>(data: T, status: number = 200) {
  return Response.json(data, { status });
}

export function apiError(message: string, status: number = 400, errors?: Record<string, string>) {
  return Response.json(
    { error: message, ...(errors && { errors }) },
    { status }
  );
}
