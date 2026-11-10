import { Suspense } from 'react'
import ProductCatalog from '@/components/ProductCatalog'
import StoreHeader from '@/components/StoreHeader'
import { getCachedProducts } from '@/lib/products'

export default async function ProductsPage() {
  const products = await getCachedProducts()
  return (
    <>
      <StoreHeader />
      <main className="shop-page">
        <Suspense fallback={<div className="empty-state">Đang tải sản phẩm...</div>}>
          <ProductCatalog products={products} />
        </Suspense>
      </main>
    </>
  )
}
