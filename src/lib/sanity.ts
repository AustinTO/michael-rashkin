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
  return sanityClient.fetch<T>(query, params);
}
