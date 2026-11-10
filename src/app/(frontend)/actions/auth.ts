'use server'

import { redirect } from 'next/navigation'
import { appAuth } from '@/lib/app-auth'
import { getPayloadClient } from '@/lib/payload'

export type FormState = { error?: string; success?: string }

const text = (value: FormDataEntryValue | null, max: number) =>
  typeof value === 'string' ? value.trim().slice(0, max) : ''

export async function loginAction(_: FormState, formData: FormData): Promise<FormState> {
  const email = text(formData.get('email'), 160).toLowerCase()
  const password = text(formData.get('password'), 128)
  if (!email || !password) return { error: 'Vui lòng nhập đầy đủ email và mật khẩu.' }

  try {
    await appAuth.login(email, password)
  } catch {
    return { error: 'Email hoặc mật khẩu không chính xác.' }
  }
  redirect('/profile')
}

export async function signupAction(_: FormState, formData: FormData): Promise<FormState> {
  const fullName = text(formData.get('fullName'), 100)
  const email = text(formData.get('email'), 160).toLowerCase()
  const password = text(formData.get('password'), 128)
  const phone = text(formData.get('phone'), 24)
  const address = text(formData.get('address'), 240)

  if (!fullName || !email || password.length < 8) {
    return { error: 'Nhập họ tên, email và mật khẩu tối thiểu 8 ký tự.' }
  }

  try {
    await appAuth.signup({ fullName, email, password, phone, address })
  } catch {
    return { error: 'Không thể tạo tài khoản. Email có thể đã được sử dụng.' }
  }
  redirect('/profile')
}

export async function logoutAction() {
  await appAuth.logout()
  redirect('/')
}

export async function updateProfileAction(_: FormState, formData: FormData): Promise<FormState> {
  const user = await appAuth.currentUser()
  if (!user) return { error: 'Phiên đăng nhập đã hết hạn.' }

  const fullName = text(formData.get('fullName'), 100)
  const phone = text(formData.get('phone'), 24)
  const address = text(formData.get('address'), 240)
  if (!fullName) return { error: 'Họ tên không được để trống.' }

  const payload = await getPayloadClient()
  await payload.update({
    collection: 'users',
    id: user.id,
    data: { fullName, phone, address },
    user,
    overrideAccess: false,
  })
  return { success: 'Thông tin cá nhân đã được cập nhật.' }
}
