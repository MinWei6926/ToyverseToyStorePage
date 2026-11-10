'use server'

import { redirect } from 'next/navigation'
import { appAuth } from '@/lib/app-auth'
import { getPayloadClient } from '@/lib/payload'

const relationshipID = (value: string | { id: string }) =>
  typeof value === 'string' ? value : value.id

export async function addToCartAction(formData: FormData) {
  const user = await appAuth.currentUser()
  if (!user) redirect('/auth')

  const productID = String(formData.get('productId') ?? '')
  const quantity = Math.min(99, Math.max(1, Number(formData.get('quantity') ?? 1)))
  if (!productID || !Number.isInteger(quantity)) return

  const payload = await getPayloadClient()
  const product = await payload.findByID({
    collection: 'products',
    id: productID,
    overrideAccess: false,
  })
  if (!product) return

  const cart = [...(user.cart ?? [])].map((item) => ({
    product: relationshipID(item.product as string | { id: string }),
    quantity: item.quantity,
  }))
  const existing = cart.find((item) => item.product === productID)
  if (existing) existing.quantity = Math.min(99, existing.quantity + quantity)
  else cart.push({ product: productID, quantity })

  await payload.update({
    collection: 'users',
    id: user.id,
    data: { cart },
    user,
    overrideAccess: false,
  })
  redirect('/cart')
}

export async function removeCartItemAction(formData: FormData) {
  const user = await appAuth.currentUser()
  if (!user) redirect('/auth')
  const productID = String(formData.get('productId') ?? '')
  if (!productID) return

  const payload = await getPayloadClient()
  const cart = (user.cart ?? [])
    .filter((item) => relationshipID(item.product as string | { id: string }) !== productID)
    .map((item) => ({
      product: relationshipID(item.product as string | { id: string }),
      quantity: item.quantity,
    }))

  await payload.update({
    collection: 'users',
    id: user.id,
    data: { cart },
    user,
    overrideAccess: false,
  })
  redirect('/cart')
}

export async function checkoutAction() {
  const user = await appAuth.currentUser()
  if (!user) redirect('/auth')
  const payload = await getPayloadClient()
  const freshUser = await payload.findByID({
    collection: 'users',
    id: user.id,
    depth: 2,
    user,
    overrideAccess: false,
  })
  const cart = freshUser.cart ?? []
  if (!cart.length) return

  const items = cart.flatMap((item) => {
    if (!item.product || typeof item.product === 'string') return []
    return [
      {
        product: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        unitPrice: item.product.price,
      },
    ]
  })
  const total = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
  await payload.create({
    collection: 'orders',
    data: {
      orderNumber: `TV-${Date.now().toString(36).toUpperCase()}`,
      owner: user.id,
      status: 'pending',
      items,
      total,
    },
    user,
    overrideAccess: false,
  })
  await payload.update({
    collection: 'users',
    id: user.id,
    data: { cart: [] },
    user,
    overrideAccess: false,
  })
  redirect('/profile')
}
