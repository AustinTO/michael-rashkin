import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'sourceReference',
  title: 'Source reference',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'url',
      title: 'Link',
      type: 'url',
      validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] })
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number'
    }),
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
    defineField({
      name: 'note',
      title: 'Short note',
      type: 'text',
      rows: 2
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'url'
    }
  }
});
