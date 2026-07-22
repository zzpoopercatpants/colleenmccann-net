export default {
  name: 'contact',
  title: 'Contact',
  type: 'document',
  fields: [
    {
      name: 'blurb',
      title: 'Short message',
      description: 'e.g. "For speaking inquiries, collaboration, or media requests, reach out directly."',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'email',
      title: 'Email address',
      type: 'string',
      validation: (Rule: any) => Rule.email(),
    },
    {
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    prepare() {
      return {title: 'Contact page'}
    },
  },
}
