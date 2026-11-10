import { NextResponse } from 'next/server'
import { appAuth } from '@/lib/app-auth'

export async function GET() {
  const user = await appAuth.currentUser()
  if (!user) return NextResponse.json({ user: null, cartCount: 0 })

  const cartCount = (user.cart ?? []).reduce((total, item) => total + (item.quantity ?? 0), 0)
  return NextResponse.json({
    user: { fullName: user.fullName, email: user.email },
    cartCount,
  })
}
