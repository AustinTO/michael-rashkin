import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'mediaEpisode',
  title: 'Media episode',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          { title: 'YouTube', value: 'YouTube' },
          { title: 'Podcast', value: 'Podcast' },
          { title: 'Interview', value: 'Interview' }
        ],
        layout: 'radio'
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'embedUrl',
      title: 'Embed URL',
      type: 'url',
      description: 'Use an embeddable URL (e.g., YouTube embed link).',
      validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] })
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short description (2–3 sentences)',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'keyPoints',
      title: 'Key points (5–10 bullets)',
      type: 'array',
      of: [{ type: 'string' }]
    }),
    defineField({
      name: 'timestampOutline',
      title: 'Timestamp outline (optional)',
      type: 'array',
      of: [{ type: 'timestampItem' }]
    }),
    defineField({
      name: 'transcript',
      title: 'Transcript (rich text)',
      type: 'array',
      of: [{ type: 'block' }]
    }),
    defineField({
      name: 'sources',
      title: 'Sources',
      type: 'array',
      of: [{ type: 'sourceReference' }]
    }),
    defineField({
      name: 'primaryTopic',
      title: 'Primary topic',
      type: 'reference',
      to: [{ type: 'topic' }]
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }]
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publish date',
      type: 'datetime'
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated date (optional)',
      type: 'datetime'
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'platform'
    }
  }
});
