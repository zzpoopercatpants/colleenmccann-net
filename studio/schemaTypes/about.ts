export default {
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'headshot',
      title: 'Headshot photo',
      type: 'image',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Describe the photo for screen readers and search engines.',
          validation: (Rule: any) => Rule.required(),
        },
      ],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    select: {title: 'name'},
  },
}
