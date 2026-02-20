export function absoluteUrl(path: string): string {
  const base = (process.env.PUBLIC_SITE_URL || 'http://localhost:4321').replace(/\/$/, '');
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}
