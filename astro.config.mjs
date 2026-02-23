import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import react from '@astrojs/react';
import dotenv from 'dotenv';
import sanity from '@sanity/astro';

dotenv.config();

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.SANITY_DATASET;
const apiVersion = process.env.SANITY_STUDIO_API_VERSION || process.env.SANITY_API_VERSION || '2025-01-01';

if (!projectId) throw new Error('Missing SANITY_PROJECT_ID (or SANITY_STUDIO_PROJECT_ID)');
if (!dataset) throw new Error('Missing SANITY_DATASET (or SANITY_STUDIO_DATASET)');

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'http://localhost:4321',
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  vite: {
    optimizeDeps: {
      include: [
        'react',
        'react/jsx-runtime',
        'react-dom',
        'react-dom/client',
        'react/compiler-runtime',
        'react-is',
        'styled-components',
        'lodash/startCase.js'
      ],
      needsInterop: ['void-elements'],
      exclude: ['@sanity/vision', 'sanity', '@sanity/presentation']
    },
    define: {
      'import.meta.env.PUBLIC_SANITY_PROJECT_ID': JSON.stringify(projectId),
      'import.meta.env.PUBLIC_SANITY_DATASET': JSON.stringify(dataset),
      'import.meta.env.PUBLIC_SANITY_API_VERSION': JSON.stringify(apiVersion),
      'import.meta.env.PUBLIC_SANITY_STUDIO_PROJECT_ID': JSON.stringify(projectId),
      'import.meta.env.PUBLIC_SANITY_STUDIO_DATASET': JSON.stringify(dataset),
      'import.meta.env.PUBLIC_SANITY_STUDIO_API_VERSION': JSON.stringify(apiVersion)
    }
  },
  integrations: [
    react(),
    sanity({
      projectId,
      dataset,
      apiVersion,
      studioBasePath: '/studio'
    })
  ]
});
