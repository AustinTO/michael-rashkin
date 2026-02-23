import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';

const env = (
  import.meta.env ?? (typeof process !== 'undefined' ? process.env : {})
) as Record<string, string | undefined>;

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

if (!projectId) throw new Error('Missing SANITY_STUDIO_PROJECT_ID (or SANITY_PROJECT_ID)');
if (!dataset) throw new Error('Missing SANITY_STUDIO_DATASET (or SANITY_DATASET)');

export default defineConfig({
  name: 'default',
  title: 'MichaelRashkin.com',
  projectId,
  dataset,
  apiVersion,
  basePath: '/studio',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes
  }
});
