import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'evidenceSnapshot',
  title: 'Evidence snapshot',
  type: 'object',
  fields: [
    defineField({
      name: 'claimSummary',
      title: 'Claim summary',
      type: 'text',
      rows: 2
    }),
    defineField({
      name: 'evidenceStrength',
      title: 'Evidence strength',
      type: 'string',
      options: {
        list: [
          { title: 'High', value: 'High' },
          { title: 'Moderate', value: 'Moderate' },
          { title: 'Low', value: 'Low' },
          { title: 'Unclear', value: 'Unclear' }
        ],
        layout: 'radio'
      }
    }),
    defineField({
      name: 'whatWouldChangeMyMind',
      title: 'What would change my mind',
      type: 'array',
      of: [{ type: 'string' }]
    }),
    defineField({
      name: 'lastReviewedDate',
      title: 'Last reviewed date',
      type: 'date'
    })
  ]
});
