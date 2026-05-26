const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') || 'http://localhost:8000';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.text();

  return fetch(`${BACKEND_API_URL}/api/skills/${encodeURIComponent(id)}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  return fetch(`${BACKEND_API_URL}/api/skills/${encodeURIComponent(id)}/`, {
    method: 'DELETE',
  });
}
