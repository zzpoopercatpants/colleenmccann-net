export default {
  name: 'media',
  title: 'Media',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title / topic',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: ['Keynote', 'Co-presentation', 'Panel', 'Podcast', 'Interview', 'Press'],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'host',
      title: 'Host / publication',
      description: 'e.g. "Cambridge Chamber of Commerce"',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'linkUrl',
      title: 'Recording / writeup link',
      description: 'Leave empty if no recording exists — the site will show a quiet "No recording" note instead.',
      type: 'url',
    },
    {
      name: 'linkLabel',
      title: 'Link label',
      type: 'string',
      options: {
        list: ['Listen', 'Watch', 'Read'],
      },
      hidden: ({document}: any) => !document?.linkUrl,
    },
  ],
  preview: {
    select: {title: 'title', date: 'date', type: 'type', host: 'host'},
    prepare({title, date, type, host}: any) {
      return {title, subtitle: [date, type, host].filter(Boolean).join(' · ')}
    },
  },
}
