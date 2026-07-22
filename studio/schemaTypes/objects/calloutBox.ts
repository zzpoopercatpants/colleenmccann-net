export default {
  name: 'calloutBox',
  title: 'Callout box',
  type: 'object',
  fields: [
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    select: {content: 'content'},
    prepare({content}: any) {
      const block = (content || []).find((b: any) => b._type === 'block')
      return {
        title: 'Callout box',
        subtitle: block ? block.children?.map((c: any) => c.text).join('') : '',
      }
    },
  },
}
