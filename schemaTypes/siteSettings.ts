import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site title',
      type: 'string',
      initialValue: 'Michael Rashkin'
    }),
    defineField({
      name: 'featuredTopics',
      title: 'Featured topics (home page)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'topic' }] }]
    }),
    defineField({
      name: 'pinnedContent',
      title: 'Pinned content (Most read)',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'mediaEpisode' }, { type: 'insight' }, { type: 'policyNote' }]
        }
      ]
    }),
    defineField({
      name: 'featuredTopicsHeading',
      title: 'Featured topics heading',
      type: 'string',
      initialValue: 'Featured Topics'
    }),
    defineField({
      name: 'latestHeading',
      title: 'Latest heading',
      type: 'string',
      initialValue: 'Latest'
    }),
    defineField({
      name: 'mostReadHeading',
      title: 'Most read heading',
      type: 'string',
      initialValue: 'Most read'
    }),
    defineField({
      name: 'heroActions',
      title: 'Hero actions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'href', title: 'Href', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({
              name: 'variant',
              title: 'Variant',
              type: 'string',
              options: { list: ['primary', 'default'] },
              initialValue: 'default'
            })
          ]
        }
      ]
    }),
    defineField({
      name: 'credentialsLine',
      title: 'Credentials line',
      type: 'text',
      rows: 2
    }),
    defineField({
      name: 'credentialsLinkLabel',
      title: 'Credentials link label',
      type: 'string',
      initialValue: 'About'
    }),
    defineField({
      name: 'credentialsLinkHref',
      title: 'Credentials link href',
      type: 'string',
      initialValue: '/about'
    }),
    defineField({
      name: 'homePillars',
      title: 'Home pillars',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
            defineField({ name: 'buttonLabel', title: 'Button label', type: 'string' }),
            defineField({ name: 'buttonHref', title: 'Button href', type: 'string' })
          ]
        }
      ]
    })
  ],
  preview: {
    prepare() {
      return { title: 'Site settings' };
    }
  }
});
