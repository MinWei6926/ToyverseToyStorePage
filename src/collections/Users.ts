import type { Access, CollectionConfig } from 'payload'

const ownProfile: Access = ({ req }) => {
  if (req.user?.collection === 'admins') return true
  if (req.user?.collection === 'users') return { id: { equals: req.user.id } }
  return false
}

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    hidden: true,
    useAsTitle: 'fullName',
  },
  access: {
    create: () => true,
    read: ownProfile,
    update: ownProfile,
    delete: ownProfile,
  },
  fields: [
    { name: 'fullName', type: 'text', required: true },
    { name: 'address', type: 'textarea' },
    { name: 'phone', type: 'text' },
    {
      name: 'cart',
      type: 'array',
      access: {
        create: () => false,
        read: ({ req }) => req.user?.collection === 'users' || req.user?.collection === 'admins',
        update: ({ req }) => req.user?.collection === 'users' || req.user?.collection === 'admins',
      },
      fields: [
        { name: 'product', type: 'relationship', relationTo: 'products', required: true },
        { name: 'quantity', type: 'number', required: true, min: 1, max: 99, defaultValue: 1 },
      ],
    },
  ],
}
