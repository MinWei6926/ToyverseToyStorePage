import type { CollectionConfig } from 'payload'
import { revalidateTag } from 'next/cache'

import { createFolderField, createTagField } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      ({ doc }) => {
        revalidateTag('products', 'max')
        return doc
      },
    ],
    afterDelete: [
      ({ doc }) => {
        revalidateTag('products', 'max')
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    createFolderField({ relationTo: 'folders' }),
    createTagField({ relationTo: 'tags' }),
  ],
  upload: true,
}
