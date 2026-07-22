import {topicsField} from './topics'

export default {
  name: 'insights',
  title: 'Insights',
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
      name: 'summary',
      title: 'One-line summary',
      description: 'Shown on the Insights listing card.',
      type: 'text',
      rows: 2,
      validation: (Rule: any) => Rule.required(),
    },
    topicsField,
    {
      name: 'format',
      title: 'Format',
      type: 'string',
      options: {
        list: [
          {title: 'Text / article', value: 'article'},
          {title: 'Video', value: 'video'},
          {title: 'Audio', value: 'audio'},
        ],
        layout: 'radio',
      },
      initialValue: 'article',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'body',
      title: 'Article body',
      description: 'Only used for the text/article format.',
      type: 'array',
      of: [
        {type: 'block'},
        {
          type: 'image',
          options: {hotspot: true},
          fields: [{name: 'alt', title: 'Alt text', type: 'string', validation: (Rule: any) => Rule.required()}],
        },
      ],
      hidden: ({document}: any) => document?.format !== 'article',
    },
    {
      name: 'mediaUrl',
      title: 'Video/audio link',
      description: 'YouTube/Vimeo link for video, or a podcast/host link for audio. Do not upload the file directly.',
      type: 'url',
      hidden: ({document}: any) => document?.format === 'article',
      validation: (Rule: any) =>
        Rule.custom((value: string, context: any) =>
          context.document?.format !== 'article' && !value ? 'Required for video/audio' : true
        ),
    },
    {
      name: 'duration',
      title: 'Duration label',
      description: 'e.g. "6 min watch" or "18 min listen".',
      type: 'string',
      hidden: ({document}: any) => document?.format === 'article',
    },
  ],
  preview: {
    select: {title: 'title', date: 'publishDate', format: 'format'},
    prepare({title, date, format}: any) {
      return {title, subtitle: [date, format].filter(Boolean).join(' · ')}
    },
  },
}
