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
