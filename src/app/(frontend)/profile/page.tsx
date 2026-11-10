import { redirect } from 'next/navigation'
import StoreHeader from '@/components/StoreHeader'
import ProfileForm from '@/components/ProfileForm'
import { logoutAction } from '@/app/(frontend)/actions/auth'
import { appAuth } from '@/lib/app-auth'
import { getPayloadClient } from '@/lib/payload'

const statusLabels: Record<string, string> = {
  pending: 'Chờ xác nhận',
  shipping: 'Đang giao',
  completed: 'Hoàn thành',
  cancelled: 'Đã hủy',
}

export default async function ProfilePage() {
  const user = await appAuth.currentUser()
  if (!user) redirect('/auth')
  const payload = await getPayloadClient()
  const orders = await payload.find({
    collection: 'orders',
    where: { owner: { equals: user.id } },
    sort: '-createdAt',
    limit: 20,
    user,
    overrideAccess: false,
  })

  return (
    <>
      <StoreHeader />
      <main className="profile-page">
        <aside className="profile-sidebar">
          <div className="profile-avatar">{user.fullName.charAt(0)}</div>
          <h1>{user.fullName}</h1>
          <p>{user.email}</p>
          <nav>
            <a href="#profile">Thông tin cá nhân</a>
            <a href="#orders">Lịch sử mua hàng</a>
          </nav>
          <form action={logoutAction}>
            <button>Đăng xuất</button>
          </form>
        </aside>
        <div className="profile-content">
          <section id="profile" className="profile-panel">
            <p className="page-kicker">HỒ SƠ CÁ NHÂN</p>
            <h2>Thông tin của bạn</h2>
            <ProfileForm user={user} />
          </section>
          <section id="orders" className="profile-panel">
            <p className="page-kicker">ĐƠN HÀNG GẦN ĐÂY</p>
            <h2>Lịch sử mua hàng</h2>
            {orders.docs.length ? (
              <div className="order-list">
                {orders.docs.map((order) => (
                  <article key={order.id}>
                    <div>
                      <strong>{order.orderNumber}</strong>
                      <span>{new Date(order.createdAt).toLocaleDateString('vi-VN')}</span>
                    </div>
                    <div>
                      <span>{statusLabels[order.status]}</span>
                      <strong>{order.total.toLocaleString('vi-VN')}₫</strong>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-state small">Bạn chưa có đơn hàng nào.</div>
            )}
          </section>
        </div>
      </main>
    </>
  )
}
