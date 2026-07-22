import {topicsField} from './topics'

export default {
  name: 'research',
  title: 'Research',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'publishDate',
      title: 'Publish date',
      type: 'date',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'abstract',
      title: 'Abstract',
      description: 'One to two sentences. Shown on the Research listing card and used as the page description.',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.required(),
    },
    topicsField,
    {
      name: 'hostingType',
      title: 'Where does this paper live?',
      type: 'string',
      options: {
        list: [
          {title: 'Hosted on this site (full document)', value: 'onsite'},
          {title: 'External source (e.g. ResearchGate)', value: 'external'},
        ],
        layout: 'radio',
      },
      initialValue: 'onsite',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'body',
      title: 'Full paper',
      description: 'Only used when hosted on this site.',
      type: 'array',
      of: [
        {type: 'block'},
        {
          type: 'image',
          options: {hotspot: true},
          fields: [{name: 'alt', title: 'Alt text', type: 'string', validation: (Rule: any) => Rule.required()}],
        },
        {type: 'calloutBox'},
        {type: 'iconTextCard'},
        {type: 'richTableBlock'},
      ],
      hidden: ({document}: any) => document?.hostingType !== 'onsite',
    },
    {
      name: 'pdfFile',
      title: 'Downloadable PDF (optional)',
      description: 'Shown as a secondary "Download PDF" link next to "Read the paper".',
      type: 'file',
      options: {accept: 'application/pdf'},
      hidden: ({document}: any) => document?.hostingType !== 'onsite',
    },
    {
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      hidden: ({document}: any) => document?.hostingType !== 'external',
      validation: (Rule: any) =>
        Rule.custom((value: string, context: any) =>
          context.document?.hostingType === 'external' && !value
            ? 'Required when hosted externally'
            : true
        ),
    },
    {
      name: 'externalSourceName',
      title: 'External source name',
      description: 'e.g. "ResearchGate" — used in the link label "Read on ResearchGate".',
      type: 'string',
      hidden: ({document}: any) => document?.hostingType !== 'external',
    },
  ],
  preview: {
    select: {title: 'title', date: 'publishDate', hostingType: 'hostingType'},
    prepare({title, date, hostingType}: any) {
      return {
        title,
        subtitle: [date, hostingType === 'external' ? 'External' : 'On-site'].filter(Boolean).join(' · '),
      }
    },
  },
}
