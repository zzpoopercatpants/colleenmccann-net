import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'colleenmccann.net',

  projectId: '8b63jjqf',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool()],

  schema: {
    types: schemaTypes,
  },

  document: {
    // Prevent deleting/duplicating the singleton About and Contact documents
    // from the generic actions menu.
    actions: (input, context) =>
      ['about', 'contact'].includes(context.schemaType)
        ? input.filter(({action}) => action && !['duplicate', 'delete'].includes(action))
        : input,
  },
})
