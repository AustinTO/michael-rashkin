import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'policyNote',
  title: 'Policy note',
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
      name: 'policyLens',
      title: 'Policy lens (one line)',
      type: 'string',
      description: 'What policy question this addresses'
    }),
    defineField({
      name: 'primaryTopic',
      title: 'Primary topic (required)',
      type: 'reference',
      to: [{ type: 'topic' }],
      validation: (Rule) => Rule.required()
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
    }),
    defineField({
      name: 'summaryBullets',
      title: 'Summary bullets (3–6)',
      type: 'array',
      of: [{ type: 'string' }]
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image (optional)',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }, { type: 'portableImage' }]
    }),
    defineField({
      name: 'sources',
      title: 'Sources',
      type: 'array',
      of: [{ type: 'sourceReference' }]
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'policyLens'
    }
  }
});
