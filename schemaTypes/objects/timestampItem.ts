import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'timestampItem',
  title: 'Timestamp item',
  type: 'object',
  fields: [
    defineField({
      name: 'time',
      title: 'Time',
      type: 'string',
      description: 'Format like 00:00 or 1:23:45'
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string'
    })
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'time'
    }
  }
});
