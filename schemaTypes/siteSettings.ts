import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site title',
      type: 'string',
      initialValue: 'Michael Rashkin'
    }),
    defineField({
      name: 'featuredTopics',
      title: 'Featured topics (home page)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'topic' }] }]
    }),
    defineField({
      name: 'pinnedContent',
      title: 'Pinned content (Most read)',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'mediaEpisode' }, { type: 'insight' }, { type: 'policyNote' }]
        }
      ]
    })
  ],
  preview: {
    prepare() {
      return { title: 'Site settings' };
    }
  }
});
