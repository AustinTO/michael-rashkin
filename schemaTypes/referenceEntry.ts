import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'referenceEntry',
  title: 'Reference entry',
  type: 'document',
  fields: [
    defineField({ name: 'citationTitle', title: 'Citation title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'year', title: 'Year', type: 'number' }),
    defineField({
      name: 'sourceType',
      title: 'Source type',
      type: 'string',
      options: {
        list: [
          { title: 'RCT', value: 'RCT' },
          { title: 'Observational', value: 'observational' },
          { title: 'Meta-analysis', value: 'meta-analysis' },
          { title: 'Guideline', value: 'guideline' },
          { title: 'Mechanistic', value: 'mechanistic' },
          { title: 'Review', value: 'review' }
        ]
      }
    }),
    defineField({ name: 'link', title: 'Link', type: 'url', validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }) }),
    defineField({ name: 'shortNote', title: 'Short note (1–2 sentences)', type: 'text', rows: 2 }),
    defineField({
      name: 'topicTags',
      title: 'Topic tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'topic' }] }]
    })
  ],
  preview: {
    select: {
      title: 'citationTitle',
      subtitle: 'year'
    }
  }
});
