import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'portableImage',
  title: 'Inline image',
  type: 'image',
  options: { hotspot: true },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
      description: 'Describe this image for screen readers.'
    }),
    defineField({
      name: 'caption',
      title: 'Caption (optional)',
      type: 'string'
    })
  ],
  preview: {
    select: {
      title: 'caption',
      subtitle: 'alt',
      media: 'asset'
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Inline image',
        subtitle: subtitle || 'No alt text',
        media
      };
    }
  }
});
