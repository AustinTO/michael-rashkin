import dotenv from 'dotenv';
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';

dotenv.config();

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.SANITY_DATASET;
const apiVersion = process.env.SANITY_STUDIO_API_VERSION || process.env.SANITY_API_VERSION || '2025-01-01';

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
