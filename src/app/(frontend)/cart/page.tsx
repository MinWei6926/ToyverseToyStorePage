import Image from 'next/image'
import { redirect } from 'next/navigation'
import StoreHeader from '@/components/StoreHeader'
import { checkoutAction, removeCartItemAction } from '@/app/(frontend)/actions/cart'
import { appAuth } from '@/lib/app-auth'
import { getPayloadClient } from '@/lib/payload'

export default async function CartPage() {
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
  const items = (freshUser.cart ?? []).flatMap((item) => {
    if (!item.product || typeof item.product === 'string') return []
    return [{ product: item.product, quantity: item.quantity }]
  })
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  return (
    <>
      <StoreHeader />
      <main className="cart-page">
        <div className="page-kicker">TÚI ĐỒ CHƠI CỦA BẠN</div>
        <h1>
          Giỏ hàng <span>({items.length})</span>
        </h1>
        {items.length ? (
          <div className="cart-table">
            <div className="cart-head">
              <span>Sản phẩm</span>
              <span>Số lượng</span>
              <span>Đơn giá</span>
              <span></span>
            </div>
            {items.map(({ product, quantity }) => {
              const image = typeof product.image === 'object' ? product.image : null
              return (
                <div className="cart-row" key={product.id}>
                  <div className="cart-product">
                    {image?.url ? (
                      <Image src={image.url} alt={image.alt} width={92} height={92} />
                    ) : null}
                    <div>
                      <small>{product.brand}</small>
                      <strong>{product.name}</strong>
                    </div>
                  </div>
                  <span className="quantity-pill">{quantity}</span>
                  <strong>{product.price.toLocaleString('vi-VN')}₫</strong>
                  <form action={removeCartItemAction}>
                    <input type="hidden" name="productId" value={product.id} />
                    <button className="remove-button" aria-label={`Xóa ${product.name}`}>
                      Xóa
                    </button>
                  </form>
                </div>
              )
            })}
            <div className="cart-total">
              <div>
                <span>Tổng giá trị đơn hàng</span>
                <small>Đã bao gồm thuế, chưa gồm phí vận chuyển</small>
              </div>
              <strong>{total.toLocaleString('vi-VN')}₫</strong>
            </div>
            <form action={checkoutAction} className="checkout-form">
              <button className="checkout-button">Đặt hàng ngay</button>
            </form>
          </div>
        ) : (
          <div className="empty-state">
            Giỏ hàng đang trống. Hãy chọn một người bạn đồ chơi mới nhé!
          </div>
        )}
      </main>
    </>
  )
}
