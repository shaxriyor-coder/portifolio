export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') || 'http://localhost:8000';

export function apiUrl(path: string) {
  if (!path.startsWith('/')) {
    path = `/${path}`;
  }

  const hasQuery = path.includes('?');
  const pathWithoutQuery = hasQuery ? path.slice(0, path.indexOf('?')) : path;
  const query = hasQuery ? path.slice(path.indexOf('?')) : '';
  const normalizedPath = pathWithoutQuery.endsWith('/') ? pathWithoutQuery : `${pathWithoutQuery}/`;

  return `${API_BASE_URL}${normalizedPath}${query}`;
}

/**
 * Server-side data fetch used by the public landing pages.
 *
 * Runs on Vercel (not in the visitor's browser), so slow mobile networks,
 * mixed-content rules and iOS Safari request timeouts can't leave the page
 * stuck on a "Loading…" spinner. The response is cached at the edge for
 * `revalidateSeconds`, so a cold backend is hit at most once per window and
 * every other visitor gets instant HTML. On any failure (timeout, cold start,
 * network error) it returns `fallback` and the page still renders.
 */
export async function fetchApi<T>(
  path: string,
  fallback: T,
  { revalidateSeconds = 60, timeoutMs = 15000 }: { revalidateSeconds?: number; timeoutMs?: number } = {},
): Promise<T> {
  try {
    const res = await fetch(apiUrl(path), {
      signal: AbortSignal.timeout(timeoutMs),
      next: { revalidate: revalidateSeconds },
      headers: { Accept: 'application/json' },
    });

    if (!res.ok) {
      console.error(`fetchApi ${path} -> HTTP ${res.status}`);
      return fallback;
    }

    return (await res.json()) as T;
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    console.error(`fetchApi ${path} failed: ${reason}`);
    return fallback;
  }
}
