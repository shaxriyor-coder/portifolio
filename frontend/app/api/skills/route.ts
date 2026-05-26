const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') || 'http://localhost:8000';

export async function GET() {
  return fetch(`${BACKEND_API_URL}/api/skills/`, {
    method: 'GET',
    cache: 'no-store',
  });
}

export async function POST(request: Request) {
  const body = await request.text();
  return fetch(`${BACKEND_API_URL}/api/skills/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
}
