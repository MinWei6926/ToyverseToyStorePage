'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function StoreHeader() {
  const [session, setSession] = useState<{ fullName: string; cartCount: number } | null>(null)

  useEffect(() => {
    fetch('/api/app-session')
      .then((response) => response.json())
      .then((data) => {
        if (data.user) setSession({ fullName: data.user.fullName, cartCount: data.cartCount ?? 0 })
      })
      .catch(() => undefined)
  }, [])

  return (
    <>
      <div className="promo-bar">Miễn phí giao hàng cho đơn từ 499K • Đổi trả trong 30 ngày</div>
      <header className="store-header">
        <div className="store-header-top">
          <Link href="/" className="logo">
            <span className="logo-mark">
              <span>T</span>
            </span>
            <span>
              toy<span className="text-[#ff625f]">verse</span>
            </span>
          </Link>
          <form action="/products" className="store-search">
            <span>⌕</span>
            <input name="q" placeholder="Tìm món đồ chơi..." />
          </form>
          <div className="store-actions">
            <Link href={session ? '/profile' : '/auth'} className="store-account">
              <span className="account-avatar">{session ? session.fullName.charAt(0) : '◯'}</span>
              <span>{session ? session.fullName : 'Đăng nhập / Đăng ký'}</span>
            </Link>
            <Link href="/cart" className="store-cart">
              Túi hàng <b>{session?.cartCount ?? 0}</b>
            </Link>
          </div>
        </div>
        <nav className="store-nav">
          <Link href="/">Trang chủ</Link>
          <Link href="/products">Sản phẩm</Link>
          <Link href="/products?sale=1">Khuyến mãi</Link>
          <Link href="/#services">Dịch vụ</Link>
        </nav>
      </header>
    </>
  )
}
