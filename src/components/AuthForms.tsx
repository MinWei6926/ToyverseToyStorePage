'use client'

import { useActionState, useState } from 'react'
import { loginAction, signupAction, type FormState } from '@/app/(frontend)/actions/auth'

const initialState: FormState = {}

export default function AuthForms() {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [loginState, loginFormAction, loginPending] = useActionState(loginAction, initialState)
  const [signupState, signupFormAction, signupPending] = useActionState(signupAction, initialState)
  const state = mode === 'login' ? loginState : signupState

  return (
    <section className="auth-card">
      <div className="auth-tabs">
        <button className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>
          Đăng nhập
        </button>
        <button className={mode === 'signup' ? 'active' : ''} onClick={() => setMode('signup')}>
          Đăng ký
        </button>
      </div>
      <div className="auth-heading">
        <span>{mode === 'login' ? 'Chào mừng trở lại' : 'Gia nhập Toyverse'}</span>
        <h1>{mode === 'login' ? 'Tiếp tục cuộc vui.' : 'Tạo tài khoản mới.'}</h1>
      </div>
      <form action={mode === 'login' ? loginFormAction : signupFormAction} className="auth-form">
        {mode === 'signup' && (
          <>
            <label>
              Họ và tên
              <input name="fullName" required maxLength={100} />
            </label>
            <div className="form-split">
              <label>
                Số điện thoại
                <input name="phone" type="tel" maxLength={24} />
              </label>
              <label>
                Địa chỉ
                <input name="address" maxLength={240} />
              </label>
            </div>
          </>
        )}
        <label>
          Email
          <input name="email" type="email" required autoComplete="email" />
        </label>
        <label>
          Mật khẩu
          <input
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
          />
        </label>
        {state.error && <p className="form-error">{state.error}</p>}
        <button className="form-submit" disabled={loginPending || signupPending}>
          {loginPending || signupPending
            ? 'Đang xử lý...'
            : mode === 'login'
              ? 'Đăng nhập'
              : 'Tạo tài khoản'}
        </button>
      </form>
    </section>
  )
}
