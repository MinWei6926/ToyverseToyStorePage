import type { Access, CollectionConfig } from 'payload'

const ownOrders: Access = ({ req }) => {
  if (req.user?.collection === 'admins') return true
  if (req.user?.collection === 'users') return { owner: { equals: req.user.id } }
  return false
}

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'orderNumber',
    defaultColumns: ['orderNumber', 'owner', 'total', 'status', 'createdAt'],
  },
  access: {
    create: ({ req }) => req.user?.collection === 'users' || req.user?.collection === 'admins',
    read: ownOrders,
    update: ({ req }) => req.user?.collection === 'admins',
    delete: ({ req }) => req.user?.collection === 'admins',
  },
  hooks: {
    beforeValidate: [
      ({ data, req, operation }) => {
        if (operation === 'create' && req.user?.collection === 'users') {
          return { ...data, owner: req.user.id }
        }
        return data
      },
    ],
  },
  fields: [
    { name: 'orderNumber', type: 'text', required: true, unique: true, index: true },
    { name: 'owner', type: 'relationship', relationTo: 'users', required: true, index: true },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Chờ xác nhận', value: 'pending' },
        { label: 'Đang giao', value: 'shipping' },
        { label: 'Hoàn thành', value: 'completed' },
        { label: 'Đã hủy', value: 'cancelled' },
      ],
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        { name: 'product', type: 'relationship', relationTo: 'products', required: true },
        { name: 'productName', type: 'text', required: true },
        { name: 'quantity', type: 'number', required: true, min: 1 },
        { name: 'unitPrice', type: 'number', required: true, min: 0 },
      ],
    },
    { name: 'total', type: 'number', required: true, min: 0 },
  ],
}
