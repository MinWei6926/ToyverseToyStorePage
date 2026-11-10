'use client'

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import { addToCartAction } from '@/app/(frontend)/actions/cart'
import type { Product } from '@/payload-types'

export default function ProductCatalog({ products }: { products: Product[] }) {
  const params = useSearchParams()
  const query = (params.get('q') ?? '').trim().toLocaleLowerCase('vi')
  const saleOnly = params.get('sale') === '1'
  const requestedBrand = params.get('brand') ?? 'Tất cả'
  const [category, setCategory] = useState('Tất cả')
  const [brand, setBrand] = useState(requestedBrand)
  const [price, setPrice] = useState('all')
  const [sort, setSort] = useState('featured')

  const categories = useMemo(
    () => ['Tất cả', ...new Set(products.map((product) => product.category))],
    [products],
  )
  const brands = useMemo(
    () => ['Tất cả', ...new Set(products.map((product) => product.brand))],
    [products],
  )
  const filtered = useMemo(() => {
    const matches = products.filter((product) => {
      const matchesQuery = !query || product.name.toLocaleLowerCase('vi').includes(query)
      const matchesSale = !saleOnly || Boolean(product.sale && product.sale > 0)
      const matchesCategory = category === 'Tất cả' || product.category === category
      const matchesBrand = brand === 'Tất cả' || product.brand === brand
      const matchesPrice =
        price === 'all' ||
        (price === 'under500' && product.price < 500000) ||
        (price === '500to2000' && product.price >= 500000 && product.price <= 2000000) ||
        (price === 'over2000' && product.price > 2000000)
      return matchesQuery && matchesSale && matchesCategory && matchesBrand && matchesPrice
    })

    return [...matches].sort((a, b) => {
      if (sort === 'priceAsc') return a.price - b.price
      if (sort === 'priceDesc') return b.price - a.price
      if (sort === 'rating') return Number(b.rating ?? 0) - Number(a.rating ?? 0)
      return Number(b.featured) - Number(a.featured)
    })
  }, [brand, category, price, products, query, saleOnly, sort])

  const clearFilters = () => {
    setCategory('Tất cả')
    setBrand('Tất cả')
    setPrice('all')
    setSort('featured')
  }

  return (
    <>
      <div className="shop-title">
        <p>
          {saleOnly
            ? 'ƯU ĐÃI TOYVERSE'
            : brand !== 'Tất cả'
              ? `THƯƠNG HIỆU ${brand}`
              : 'KHÁM PHÁ TOYVERSE'}
        </p>
        <h1>
          {saleOnly
            ? 'Khuyến mãi giới hạn'
            : brand !== 'Tất cả'
              ? `Sản phẩm ${brand}`
              : 'Catalog sưu tầm'}
        </h1>
        <span>{filtered.length} sản phẩm dành cho cộng đồng sưu tầm</span>
      </div>

      <div className="catalog-layout">
        <aside className="filter-panel">
          <div className="filter-title">
            <strong>Bộ lọc</strong>
            <button type="button" onClick={clearFilters}>
              Xóa lọc
            </button>
          </div>
          <label>
            Thể loại
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            Thương hiệu
            <select value={brand} onChange={(event) => setBrand(event.target.value)}>
              {brands.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <fieldset>
            <legend>Mức giá</legend>
            {[
              ['all', 'Tất cả mức giá'],
              ['under500', 'Dưới 500.000₫'],
              ['500to2000', '500.000₫ – 2.000.000₫'],
              ['over2000', 'Trên 2.000.000₫'],
            ].map(([value, label]) => (
              <label className="radio-row" key={value}>
                <input
                  type="radio"
                  name="price"
                  value={value}
                  checked={price === value}
                  onChange={(event) => setPrice(event.target.value)}
                />
                {label}
              </label>
            ))}
          </fieldset>
          {saleOnly && <div className="sale-filter-note">Chỉ hiển thị sản phẩm đang giảm giá.</div>}
        </aside>

        <section className="catalog-results">
          <div className="results-bar">
            <p>
              <strong>{filtered.length}</strong> sản phẩm
            </p>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              aria-label="Sắp xếp sản phẩm"
            >
              <option value="featured">Nổi bật nhất</option>
              <option value="rating">Đánh giá cao nhất</option>
              <option value="priceAsc">Giá thấp đến cao</option>
              <option value="priceDesc">Giá cao đến thấp</option>
            </select>
          </div>
          {filtered.length ? (
            <div className="shop-grid catalog-product-grid">
              {filtered.map((product) => {
                const image = typeof product.image === 'object' ? product.image : null
                return (
                  <article className="shop-card" key={product.id}>
                    <div className="shop-card-image">
                      {product.sale ? <b>-{product.sale}%</b> : null}
                      {image?.url ? (
                        <Image
                          src={image.url}
                          alt={image.alt}
                          fill
                          sizes="(max-width: 700px) 100vw, 25vw"
                        />
                      ) : null}
                    </div>
                    <small>{product.brand}</small>
                    <h2>{product.name}</h2>
                    <div className="shop-price">
                      <strong>{product.price.toLocaleString('vi-VN')}₫</strong>
                      {product.oldPrice ? (
                        <del>{product.oldPrice.toLocaleString('vi-VN')}₫</del>
                      ) : null}
                    </div>
                    <form action={addToCartAction}>
                      <input type="hidden" name="productId" value={product.id} />
                      <input type="hidden" name="quantity" value="1" />
                      <button>Thêm vào giỏ</button>
                    </form>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className="empty-state">Chưa tìm thấy sản phẩm phù hợp với bộ lọc.</div>
          )}
        </section>
      </div>
    </>
  )
}
