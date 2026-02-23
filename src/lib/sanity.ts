import { createClient } from '@sanity/client';

function requiredAny(names: string[]): string {
  for (const name of names) {
    const value = process.env[name];
    if (value) return value;
  }
  throw new Error(`Missing required env var. Tried: ${names.join(', ')}`);
}

export const sanityConfig = {
  projectId: requiredAny(['PUBLIC_SANITY_PROJECT_ID', 'SANITY_PROJECT_ID']),
  dataset: requiredAny(['PUBLIC_SANITY_DATASET', 'SANITY_DATASET']),
  apiVersion: requiredAny(['PUBLIC_SANITY_API_VERSION', 'SANITY_API_VERSION']),
  useCdn: true as const,
  token: process.env.SANITY_READ_TOKEN,
  studioUrl: '/studio'
};

export const sanityClient = createClient({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  apiVersion: sanityConfig.apiVersion,
  useCdn: sanityConfig.useCdn,
  token: sanityConfig.token,
  stega: {
    enabled: false,
    studioUrl: sanityConfig.studioUrl
  }
});

export async function sanityFetch<T>(query: string, params: Record<string, any> = {}): Promise<T> {
  const visualEditingEnabled =
    import.meta.env.PUBLIC_SANITY_VISUAL_EDITING_ENABLED === 'true' || import.meta.env.DEV;

  if (visualEditingEnabled && !sanityConfig.token) {
    throw new Error('Missing SANITY_READ_TOKEN while visual editing is enabled.');
  }

  return sanityClient.fetch<T>(query, params, {
    perspective: visualEditingEnabled ? 'drafts' : 'published',
    stega: {
      enabled: visualEditingEnabled,
      studioUrl: sanityConfig.studioUrl
    },
    useCdn: !visualEditingEnabled,
    ...(visualEditingEnabled ? { token: sanityConfig.token } : {})
  });
}
