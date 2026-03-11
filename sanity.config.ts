import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { presentationTool } from 'sanity/presentation';
import { schemaTypes } from './schemaTypes';

const env = {
  ...(typeof process !== 'undefined' ? (process.env as Record<string, string | undefined>) : {}),
  ...((import.meta.env ?? {}) as Record<string, string | undefined>)
} as Record<string, string | undefined>;

function toAbsoluteOrigin(value?: string): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  const withScheme = /^[a-z][a-z\d+\-.]*:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const url = new URL(withScheme);
    return `${url.protocol}//${url.host}`;
  } catch {
    return undefined;
  }
}

const projectId =
  env.SANITY_STUDIO_PROJECT_ID ||
  env.SANITY_PROJECT_ID ||
  env.PUBLIC_SANITY_STUDIO_PROJECT_ID ||
  env.PUBLIC_SANITY_PROJECT_ID;
const dataset =
  env.SANITY_STUDIO_DATASET ||
  env.SANITY_DATASET ||
  env.PUBLIC_SANITY_STUDIO_DATASET ||
  env.PUBLIC_SANITY_DATASET;
const apiVersion =
  env.SANITY_STUDIO_API_VERSION ||
  env.SANITY_API_VERSION ||
  env.PUBLIC_SANITY_STUDIO_API_VERSION ||
  env.PUBLIC_SANITY_API_VERSION ||
  '2025-01-01';
const netlifyContext = env.CONTEXT;
const viteDev = Boolean((import.meta as ImportMeta & { env?: { DEV?: boolean } }).env?.DEV);
const isDev = netlifyContext ? netlifyContext === 'dev' : env.NODE_ENV === 'development' || viteDev;
const netlifyBranchDeployUrl = toAbsoluteOrigin(env.BRANCH_DEPLOY_URL);
const netlifyBranchUrl = toAbsoluteOrigin(
  env.BRANCH && env.SITE_NAME ? `https://${env.BRANCH}--${env.SITE_NAME}.netlify.app` : undefined
);
const netlifySiteUrl = toAbsoluteOrigin(env.DEPLOY_PRIME_URL || env.URL);
const configuredPreviewOrigin = toAbsoluteOrigin(env.SANITY_STUDIO_PREVIEW_ORIGIN);
const configuredPreviewIsLocalhost =
  !!configuredPreviewOrigin && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(configuredPreviewOrigin);
const netlifyPreviewOrigin = netlifyBranchDeployUrl || netlifyBranchUrl || netlifySiteUrl;
const previewOrigin = isDev
  ? (configuredPreviewOrigin || 'http://localhost:4321')
  : (!configuredPreviewIsLocalhost ? configuredPreviewOrigin : undefined) ||
    netlifyPreviewOrigin ||
    'https://michaelrashkin.com';
const presentationAllowOrigins = Array.from(
  new Set([
    ...(isDev ? ['http://localhost:4321'] : []),
    'https://michaelrashkin.com',
    netlifyBranchDeployUrl,
    netlifyBranchUrl,
    netlifySiteUrl,
    (!configuredPreviewIsLocalhost ? configuredPreviewOrigin : undefined),
    previewOrigin
  ].filter((v): v is string => !!v))
);

if (!projectId) throw new Error('Missing SANITY_STUDIO_PROJECT_ID, PUBLIC_SANITY_PROJECT_ID, or SANITY_PROJECT_ID');
if (!dataset) throw new Error('Missing SANITY_STUDIO_DATASET, PUBLIC_SANITY_DATASET, or SANITY_DATASET');

export default defineConfig({
  name: 'default',
  title: 'MichaelRashkin.com',
  projectId,
  dataset,
  apiVersion,
  plugins: [
    deskTool(),
    visionTool(),
    presentationTool({
      allowOrigins: presentationAllowOrigins,
      previewUrl: {
        origin: previewOrigin,
        previewMode: {
          enable: '/api/draft-mode/enable',
          disable: '/api/draft-mode/disable'
        }
      }
    })
  ],
  schema: {
    types: schemaTypes
  }
});
