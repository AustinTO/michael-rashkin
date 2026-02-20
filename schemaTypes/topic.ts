import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'topic',
  title: 'Topic',
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
      name: 'intro',
      title: 'Intro (1–2 sentences)',
      type: 'text',
      rows: 2
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated date (optional)',
      type: 'datetime'
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image (optional)',
      type: 'image',
      options: { hotspot: true }
    }),

    defineField({
      name: 'body',
      title: 'Pillar body (optional intro content)',
      type: 'array',
      of: [{ type: 'block' }]
    }),

    defineField({
      name: 'evidenceSnapshot',
      title: 'Evidence snapshot',
      type: 'evidenceSnapshot'
    }),

    defineField({
      name: 'whatWeKnow',
      title: 'What we know',
      type: 'array',
      of: [{ type: 'block' }]
    }),
    defineField({
      name: 'whatWeDontKnowYet',
      title: 'What we don’t know yet',
      type: 'array',
      of: [{ type: 'block' }]
    }),
    defineField({
      name: 'myInterpretation',
      title: 'My interpretation (labeled opinion)',
      type: 'array',
      of: [{ type: 'block' }]
    }),

    defineField({
      name: 'keyTakeaways',
      title: 'Key takeaways (3–6 bullets)',
      type: 'array',
      of: [{ type: 'string' }]
    }),

    defineField({
      name: 'bestReferences',
      title: 'Best references',
      type: 'array',
      of: [{ type: 'sourceReference' }]
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      media: 'heroImage'
    }
  }
});
