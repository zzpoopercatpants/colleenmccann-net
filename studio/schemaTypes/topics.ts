// Shared topic taxonomy used by both Research and Insights, so cross-content
// search/filter (site brief section 9) works against one consistent tag list.
export const topicOptions = [
  'AI & Robotics',
  'Leadership',
  'Communication',
  'Manufacturing',
  'Business',
]

export const topicsField = {
  name: 'topics',
  title: 'Topic tags',
  type: 'array',
  of: [{type: 'string'}],
  options: {
    layout: 'tags',
    list: topicOptions,
  },
  validation: (Rule: any) => Rule.min(1),
}
