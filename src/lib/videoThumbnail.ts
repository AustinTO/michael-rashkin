export function getVideoThumbnailFromEmbedUrl(embedUrl?: string): string | null {
  if (!embedUrl) return null;

  const youtubeId = extractYoutubeVideoId(embedUrl);
  if (youtubeId) return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;

  return null;
}

function extractYoutubeVideoId(input: string): string | null {
  let url: URL;
  try {
    url = new URL(input);
  } catch {
    return null;
  }

  const host = url.hostname.replace(/^www\./i, '').toLowerCase();

  if (host === 'youtu.be') {
    const id = url.pathname.split('/').filter(Boolean)[0];
    return isLikelyYoutubeId(id) ? id : null;
  }

  if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'music.youtube.com') {
    if (url.pathname === '/watch') {
      const id = url.searchParams.get('v');
      return isLikelyYoutubeId(id) ? id : null;
    }

    const segments = url.pathname.split('/').filter(Boolean);
    if (segments.length >= 2 && (segments[0] === 'embed' || segments[0] === 'shorts' || segments[0] === 'live')) {
      const id = segments[1];
      return isLikelyYoutubeId(id) ? id : null;
    }
  }

  return null;
}

function isLikelyYoutubeId(value: string | null | undefined): value is string {
  return !!value && /^[A-Za-z0-9_-]{11}$/.test(value);
}
