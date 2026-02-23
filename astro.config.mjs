import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import react from '@astrojs/react';
import dotenv from 'dotenv';
import sanity from '@sanity/astro';

dotenv.config();

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_PROJECT_ID;
const dataset =
  process.env.SANITY_STUDIO_DATASET ||
  process.env.PUBLIC_SANITY_DATASET ||
  process.env.SANITY_DATASET;
const apiVersion =
  process.env.SANITY_STUDIO_API_VERSION ||
  process.env.PUBLIC_SANITY_API_VERSION ||
  process.env.SANITY_API_VERSION ||
  '2025-01-01';

const studioProjectId = projectId;
const studioDataset = dataset;
const studioApiVersion = apiVersion;

if (!projectId) throw new Error('Missing PUBLIC_SANITY_PROJECT_ID (or SANITY_PROJECT_ID / SANITY_STUDIO_PROJECT_ID)');
if (!dataset) throw new Error('Missing PUBLIC_SANITY_DATASET (or SANITY_DATASET / SANITY_STUDIO_DATASET)');

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'http://localhost:4321',
  output: 'server',
  adapter: netlify(),
  vite: {
    define: {
      'import.meta.env.SANITY_STUDIO_PROJECT_ID': JSON.stringify(studioProjectId),
      'import.meta.env.SANITY_STUDIO_DATASET': JSON.stringify(studioDataset),
      'import.meta.env.SANITY_STUDIO_API_VERSION': JSON.stringify(studioApiVersion),
      'import.meta.env.SANITY_PROJECT_ID': JSON.stringify(studioProjectId),
      'import.meta.env.SANITY_DATASET': JSON.stringify(studioDataset),
      'import.meta.env.SANITY_API_VERSION': JSON.stringify(studioApiVersion)
    },
    optimizeDeps: {
      include: [
        'react',
        'react/jsx-runtime',
        'react-dom',
        'react-dom/client',
        'react/compiler-runtime',
        'react-is',
        'styled-components',
        'lodash/startCase.js',
        'sanity',
        '@sanity/vision'
      ],
      needsInterop: ['void-elements']
    }
  },
  integrations: [
    react(),
    sanity({
      projectId,
      dataset,
      apiVersion,
      studioBasePath: '/studio',
      stega: {
        studioUrl: '/studio'
      }
    })
  ]
});
