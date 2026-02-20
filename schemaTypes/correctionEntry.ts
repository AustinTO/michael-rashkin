import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'correctionEntry',
  title: 'Correction entry',
  type: 'document',
  fields: [
    defineField({ name: 'date', title: 'Date', type: 'date', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'pageUrl',
      title: 'Page URL',
      type: 'string',
      description: 'Full URL or path like /topics/glp-1-population-health'
    }),
    defineField({
      name: 'pageRef',
      title: 'Page reference (optional)',
      type: 'reference',
      to: [{ type: 'topic' }, { type: 'insight' }, { type: 'policyNote' }, { type: 'mediaEpisode' }]
    }),
    defineField({ name: 'whatChanged', title: 'What changed', type: 'text', rows: 2, validation: (Rule) => Rule.required() }),
    defineField({ name: 'whyChanged', title: 'Why it was changed', type: 'text', rows: 2, validation: (Rule) => Rule.required() })
  ],
  preview: {
    select: {
      title: 'whatChanged',
      subtitle: 'date'
    }
  }
});
