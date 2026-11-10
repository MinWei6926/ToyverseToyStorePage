import type { Access, CollectionConfig } from 'payload'
import { revalidateTag } from 'next/cache'

const isAdmin: Access = ({ req }) => req.user?.collection === 'admins'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'brand', 'category', 'price', 'sale'],
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
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
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'brand', type: 'text', required: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: ['Figure', 'Thẻ bài', 'Mô hình lắp ghép', 'Xe'],
    },
    { name: 'price', type: 'number', required: true, min: 0 },
    { name: 'oldPrice', type: 'number', min: 0 },
    { name: 'sale', type: 'number', min: 0, max: 100 },
    { name: 'rating', type: 'number', min: 0, max: 5, defaultValue: 5 },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    { name: 'featured', type: 'checkbox', defaultValue: false },
  ],
}
