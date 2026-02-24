const YOUTUBE_HOSTS = new Set([
  'youtube.com',
  'www.youtube.com',
  'm.youtube.com',
  'youtu.be',
  'www.youtu.be'
]);

const YOUTUBE_NOCOOKIE_HOSTS = new Set([
  'youtube-nocookie.com',
  'www.youtube-nocookie.com'
]);

function toUrl(input: string): URL | null {
  try {
    return new URL(input);
  } catch {
    return null;
  }
}

function youtubeEmbedFromUrl(url: URL): string | null {
  const host = url.hostname.toLowerCase();

  if (!YOUTUBE_HOSTS.has(host) && !YOUTUBE_NOCOOKIE_HOSTS.has(host)) {
    return null;
  }

  if (host.includes('youtu.be')) {
    const id = url.pathname.replace(/^\//, '').split('/')[0];
    return id ? `https://www.youtube.com/embed/${id}` : null;
  }

  if (url.pathname.startsWith('/embed/')) {
    const id = url.pathname.split('/')[2];
    return id ? `https://www.youtube.com/embed/${id}` : null;
  }

  if (url.pathname === '/watch') {
    const id = url.searchParams.get('v');
    return id ? `https://www.youtube.com/embed/${id}` : null;
  }

  if (url.pathname.startsWith('/shorts/')) {
    const id = url.pathname.split('/')[2];
    return id ? `https://www.youtube.com/embed/${id}` : null;
  }

  return null;
}

export function normalizeEmbedUrl(rawUrl: string): string {
  const parsed = toUrl(rawUrl);
  if (!parsed) return rawUrl;

  const youtube = youtubeEmbedFromUrl(parsed);
  if (youtube) return youtube;

  return rawUrl;
}
