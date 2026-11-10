'use client'

import { useActionState } from 'react'
import { updateProfileAction, type FormState } from '@/app/(frontend)/actions/auth'

const initialState: FormState = {}

export default function ProfileForm({
  user,
}: {
  user: { fullName: string; email: string; phone?: string | null; address?: string | null }
}) {
  const [state, action, pending] = useActionState(updateProfileAction, initialState)
  return (
    <form action={action} className="profile-form">
      <label>
        Họ và tên
        <input name="fullName" defaultValue={user.fullName} required />
      </label>
      <label>
        Email
        <input value={user.email} disabled />
      </label>
      <label>
        Số điện thoại
        <input name="phone" defaultValue={user.phone ?? ''} />
      </label>
      <label>
        Địa chỉ
        <textarea name="address" defaultValue={user.address ?? ''} rows={3} />
      </label>
      {state.error && <p className="form-error">{state.error}</p>}
      {state.success && <p className="form-success">{state.success}</p>}
      <button className="form-submit" disabled={pending}>
        {pending ? 'Đang lưu...' : 'Lưu thay đổi'}
      </button>
    </form>
  )
}
