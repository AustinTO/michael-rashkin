import { createClient } from '@sanity/client';

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

export const sanityConfig = {
  projectId: required('SANITY_PROJECT_ID'),
  dataset: required('SANITY_DATASET'),
  apiVersion: required('SANITY_API_VERSION'),
  useCdn: true as const,
  token: process.env.SANITY_READ_TOKEN
};

export const sanityClient = createClient({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  apiVersion: sanityConfig.apiVersion,
  useCdn: sanityConfig.useCdn,
  token: sanityConfig.token
});

export async function sanityFetch<T>(query: string, params: Record<string, any> = {}): Promise<T> {
  const visualEditingEnabled =
    import.meta.env.PUBLIC_SANITY_VISUAL_EDITING_ENABLED === 'true' || import.meta.env.DEV;

  if (visualEditingEnabled && !sanityConfig.token) {
    throw new Error('Missing SANITY_READ_TOKEN while visual editing is enabled.');
  }

  return sanityClient.fetch<T>(query, params, {
    perspective: visualEditingEnabled ? 'drafts' : 'published',
    stega: visualEditingEnabled,
    useCdn: !visualEditingEnabled,
    ...(visualEditingEnabled ? { token: sanityConfig.token } : {})
  });
}
