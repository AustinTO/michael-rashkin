import type { SanityClient } from '@sanity/client';

const COOKIE_DRAFT_MODE = 'sanity-draft-mode';
const COOKIE_PREVIEW_PERSPECTIVE = 'sanity-preview-perspective';
const SECRET_TTL_SECONDS = 60 * 60;
const URL_PARAM_SECRET = 'sanity-preview-secret';
const URL_PARAM_PATHNAME = 'sanity-preview-pathname';
const URL_PARAM_PERSPECTIVE = 'sanity-preview-perspective';

type Perspective = 'drafts' | 'published';

function parseCookies(request?: Request): Map<string, string> {
  const map = new Map<string, string>();
  const raw = request?.headers.get('cookie') || '';
  for (const pair of raw.split(';')) {
    const i = pair.indexOf('=');
    if (i === -1) continue;
    const k = pair.slice(0, i).trim();
    const v = pair.slice(i + 1).trim();
    if (k) map.set(k, decodeURIComponent(v));
  }
  return map;
}

function toSetCookie(name: string, value: string, maxAgeSeconds: number): string {
  const isProd = process.env.NODE_ENV === 'production';
  const sameSite = isProd ? 'None' : 'Lax';
  const secure = isProd ? '; Secure' : '';
  const partitioned = isProd ? '; Partitioned' : '';
  return `${name}=${encodeURIComponent(value)}; Path=/; HttpOnly; SameSite=${sameSite}; Max-Age=${maxAgeSeconds}${secure}${partitioned}`;
}

function clearCookie(name: string): string {
  const isProd = process.env.NODE_ENV === 'production';
  const sameSite = isProd ? 'None' : 'Lax';
  const secure = isProd ? '; Secure' : '';
  const partitioned = isProd ? '; Partitioned' : '';
  return `${name}=; Path=/; HttpOnly; SameSite=${sameSite}; Max-Age=0${secure}${partitioned}`;
}

function parsePreviewRequest(unsafeUrl: string): {
  secret: string;
  redirectTo: string;
  studioPreviewPerspective: string | null;
} {
  const url = new URL(unsafeUrl, 'http://localhost');
  const secret = url.searchParams.get(URL_PARAM_SECRET);
  if (!secret) throw new Error('Missing preview secret');

  const studioPreviewPerspective = url.searchParams.get(URL_PARAM_PERSPECTIVE);
  const unsafeRedirect = url.searchParams.get(URL_PARAM_PATHNAME) || '/';
  const redirectUrl = new URL(unsafeRedirect, 'http://localhost');

  // Restrict redirects to same-origin relative paths only.
  const redirectTo = `${redirectUrl.pathname}${redirectUrl.search}${redirectUrl.hash}`;

  return { secret, redirectTo, studioPreviewPerspective };
}

async function isValidPreviewSecret(client: SanityClient, secret: string): Promise<boolean> {
  if (!secret.trim()) return false;
  const query = `{
    "private": *[_type == "sanity.previewUrlSecret" && secret == $secret && dateTime(_updatedAt) > dateTime(now()) - ${SECRET_TTL_SECONDS}][0]{secret},
    "public": *[_id == "sanity-preview-url-secret.share-access" && _type == "sanity.previewUrlShareAccess" && secret == $secret][0]{secret}
  }`;
  const result = await client.fetch<{ private?: { secret?: string }; public?: { secret?: string } }>(
    query,
    { secret },
    { cache: 'no-store' }
  );
  return result?.private?.secret === secret || result?.public?.secret === secret;
}

export function isDraftModeEnabled(request?: Request): boolean {
  const cookies = parseCookies(request);
  return cookies.get(COOKIE_DRAFT_MODE) === '1';
}

export function isPresentationRequest(request?: Request): boolean {
  if (!request) return false;
  const referer = request.headers.get('referer') || '';
  const url = new URL(request.url);
  const hasPreviewPerspective = url.searchParams.has(URL_PARAM_PERSPECTIVE);
  const hasPreviewSecret = url.searchParams.has(URL_PARAM_SECRET);
  return /\/studio(\/|$)/i.test(referer) || hasPreviewPerspective || hasPreviewSecret;
}

export function shouldUseDrafts(request?: Request): boolean {
  const url = request ? new URL(request.url) : null;
  const hasPreviewParams =
    !!url && (url.searchParams.has(URL_PARAM_SECRET) || url.searchParams.has(URL_PARAM_PERSPECTIVE));
  if (hasPreviewParams) return true;
  if (isDraftModeEnabled(request)) {
    // In production we rely on the preview cookie session itself (cross-site cookies are partitioned).
    // In local dev, keep the stricter presentation request heuristic to avoid accidental draft leaks.
    if (process.env.NODE_ENV === 'production') return true;
    return isPresentationRequest(request);
  }

  // Fallback for embedded Sanity-hosted Presentation when third-party cookies are blocked.
  if (process.env.NODE_ENV === 'production' && isPresentationRequest(request)) return true;
  return false;
}

export function getPerspectiveFromRequest(request?: Request): Perspective {
  if (!shouldUseDrafts(request)) return 'published';
  const url = request ? new URL(request.url) : null;
  const queryPerspective = url?.searchParams.get(URL_PARAM_PERSPECTIVE);
  if (queryPerspective?.includes('published')) return 'published';
  if (queryPerspective?.includes('drafts')) return 'drafts';
  const cookies = parseCookies(request);
  const raw = cookies.get(COOKIE_PREVIEW_PERSPECTIVE);
  return raw?.includes('published') ? 'published' : 'drafts';
}

export async function enableDraftMode(request: Request, client: SanityClient): Promise<Response> {
  const parsed = parsePreviewRequest(request.url);
  const valid = await isValidPreviewSecret(client, parsed.secret);
  if (!valid) {
    return new Response('Invalid preview secret', { status: 401 });
  }

  const headers = new Headers();
  headers.append('Set-Cookie', toSetCookie(COOKIE_DRAFT_MODE, '1', SECRET_TTL_SECONDS));
  if (parsed.studioPreviewPerspective) {
    headers.append(
      'Set-Cookie',
      toSetCookie(COOKIE_PREVIEW_PERSPECTIVE, parsed.studioPreviewPerspective, SECRET_TTL_SECONDS)
    );
  }
  headers.set('Location', parsed.redirectTo || '/');

  return new Response(null, { status: 307, headers });
}

export function disableDraftMode(): Response {
  const headers = new Headers();
  headers.append('Set-Cookie', clearCookie(COOKIE_DRAFT_MODE));
  headers.append('Set-Cookie', clearCookie(COOKIE_PREVIEW_PERSPECTIVE));
  headers.set('Location', '/');
  return new Response(null, { status: 307, headers });
}
