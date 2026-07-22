import type {StructureResolver} from 'sanity/structure'

// About and Contact are singletons: one document each, edited in place
// rather than a list the user could accidentally add duplicates to.
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('research').title('Research'),
      S.documentTypeListItem('insights').title('Insights'),
      S.documentTypeListItem('media').title('Media'),
      S.divider(),
      S.listItem()
        .title('About')
        .child(S.document().schemaType('about').documentId('about')),
      S.listItem()
        .title('Contact')
        .child(S.document().schemaType('contact').documentId('contact')),
    ])
