import 'server-only'

import { cookies } from 'next/headers'
import { getPayloadClient } from '@/lib/payload'

const SESSION_COOKIE = 'app-session'
const WEEK = 60 * 60 * 24 * 7

type SignupData = {
  email: string
  password: string
  fullName: string
  phone?: string
  address?: string
}

export function createAppAuth(appUserCollection: 'users') {
  async function setSession(token: string) {
    const store = await cookies()
    store.set(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: WEEK,
    })
  }

  async function login(email: string, password: string) {
    const payload = await getPayloadClient()
    const result = await payload.login({
      collection: appUserCollection,
      data: { email, password },
    })
    if (!result.token) throw new Error('Không thể tạo phiên đăng nhập.')
    await setSession(result.token)
    return result.user
  }

  return {
    async currentUser() {
      const token = (await cookies()).get(SESSION_COOKIE)?.value
      if (!token) return null
      const payload = await getPayloadClient()
      const authHeaders = new Headers({ Authorization: `JWT ${token}` })
      const { user } = await payload.auth({ headers: authHeaders })
      if (!user || user.collection !== appUserCollection) return null
      return user
    },

    login,

    async signup(data: SignupData) {
      const payload = await getPayloadClient()
      await payload.create({
        collection: appUserCollection,
        data,
        overrideAccess: false,
      })
      return login(data.email, data.password)
    },

    async logout() {
      const store = await cookies()
      store.delete(SESSION_COOKIE)
    },
  }
}

export const appAuth = createAppAuth('users')
