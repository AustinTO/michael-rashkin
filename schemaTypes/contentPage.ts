import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'contentPage',
  title: 'Content page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'path',
      title: 'Path',
      type: 'string',
      description: 'Route path starting with /. Example: /about or /evidence/editorial-policy',
      validation: (Rule) =>
        Rule.required()
          .regex(/^\/[a-z0-9\-\/]*$/, { name: 'path', invert: false })
          .error('Use lowercase route paths, e.g. /about or /evidence/editorial-policy')
    }),
    defineField({
      name: 'description',
      title: 'Meta description',
      type: 'text',
      rows: 2
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'heroImageAlt',
      title: 'Hero image alt text',
      type: 'string',
      description: 'Describe the image for screen readers.'
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required()
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'path'
    }
  }
});
