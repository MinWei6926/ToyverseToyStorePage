'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'

type IconName =
  | 'search'
  | 'user'
  | 'bag'
  | 'arrow'
  | 'heart'
  | 'star'
  | 'truck'
  | 'shield'
  | 'refresh'
  | 'pin'
  | 'phone'
  | 'mail'
  | 'giftClosed'
  | 'giftOpen'
  | 'menu'
  | 'close'

const icons: Record<IconName, React.ReactNode> = {
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
    </>
  ),
  bag: (
    <>
      <path d="M5 8h14l-1 13H6L5 8Z" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" />
    </>
  ),
  arrow: (
    <>
      <path d="M5 12h14" />
      <path d="m14 7 5 5-5 5" />
    </>
  ),
  heart: (
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
  ),
  star: (
    <path d="m12 2.5 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5-4.7-4.6 6.5-.9L12 2.5Z" />
  ),
  truck: (
    <>
      <path d="M3 6h11v10H3zM14 10h4l3 3v3h-7z" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
    </>
  ),
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />,
  refresh: (
    <>
      <path d="M20 7h-5V2" />
      <path d="M20 7a9 9 0 1 0 1 7" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  phone: (
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  giftClosed: (
    <>
      <rect x="3" y="9" width="18" height="12" rx="2" />
      <path d="M12 9v12M3 13h18M12 9H8.5A2.5 2.5 0 1 1 11 6.5V9ZM12 9h3.5A2.5 2.5 0 1 0 13 6.5V9Z" />
    </>
  ),
  giftOpen: (
    <>
      <path d="m4 10 8 2 8-2M5 12v8h14v-8M12 12v8" />
      <path d="m3 8 8-4 2 5-8 3-2-4ZM21 8l-8-4-2 5 8 3 2-4Z" />
    </>
  ),
  menu: (
    <>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </>
  ),
  close: (
    <>
      <path d="m6 6 12 12M18 6 6 18" />
    </>
  ),
}

function Icon({
  name,
  size = 20,
  className = '',
}: {
  name: IconName
  size?: number
  className?: string
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  )
}

const imageUrls = {
  blocks:
    'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=900&q=85',
  rainbow:
    'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&w=900&q=85',
  cars: 'https://images.unsplash.com/photo-1560859251-d563a49c5e4a?auto=format&fit=crop&w=900&q=85',
  bear: 'https://images.unsplash.com/photo-1558679908-541bcf1249ff?auto=format&fit=crop&w=900&q=85',
  building:
    'https://images.unsplash.com/photo-1638802538115-041e14d28d6a?auto=format&fit=crop&w=900&q=85',
  lego: 'https://images.unsplash.com/photo-1583437871198-367d5df85c8c?auto=format&fit=crop&w=900&q=85',
}

const categories = [
  {
    name: 'Figure',
    count: '9 sản phẩm',
    text: 'Figure anime, action figure và blindbox dành cho cộng đồng sưu tầm.',
    image: imageUrls.blocks,
    color: '#ffd84d',
  },
  {
    name: 'Thẻ bài',
    count: '9 sản phẩm',
    text: 'Booster pack, thẻ hiếm và phụ kiện bảo quản cho người chơi TCG.',
    image: imageUrls.rainbow,
    color: '#78d6ed',
  },
  {
    name: 'Mô hình lắp ghép',
    count: '9 sản phẩm',
    text: 'Robot mecha, kiến trúc và mô hình kỹ thuật cho người đam mê chế tác.',
    image: imageUrls.lego,
    color: '#ff8b7b',
  },
  {
    name: 'Xe',
    count: '9 sản phẩm',
    text: 'Diecast, xe RC và mô hình tỷ lệ dành cho người chơi từ thanh thiếu niên.',
    image: imageUrls.cars,
    color: '#a9dd76',
  },
]

export type HomeProduct = {
  name: string
  brand: string
  price: number
  oldPrice?: number | null
  sale?: number | null
  image: string
  rating: number
}

const products: HomeProduct[] = [
  {
    name: 'Figure Nendoroid Anh Hùng Huyền Thoại',
    brand: 'GOOD SMILE',
    price: 1250000,
    oldPrice: 1450000,
    sale: 14,
    image: imageUrls.bear,
    rating: 4.9,
  },
  {
    name: 'Bộ Thẻ Bài Khởi Đầu TC-01',
    brand: 'TCG MASTER',
    price: 320000,
    oldPrice: 400000,
    sale: 20,
    image: imageUrls.rainbow,
    rating: 4.8,
  },
  {
    name: 'Mô Hình Lắp Ghép Robot Mech RG 1/144',
    brand: 'BANDAI',
    price: 890000,
    oldPrice: 1050000,
    sale: 15,
    image: imageUrls.lego,
    rating: 4.9,
  },
  {
    name: 'Xe Siêu Xe Diecast 1/18 Italian Sportscar',
    brand: 'AUTOART',
    price: 4250000,
    oldPrice: 4800000,
    sale: 11,
    image: imageUrls.cars,
    rating: 5,
  },
]

const bestSellers: HomeProduct[] = [
  {
    name: 'Figure Tỷ Lệ 1/7 Vũ Công Ánh Sáng',
    brand: 'ALTER',
    price: 3850000,
    image: imageUrls.blocks,
    rating: 5,
  },
  {
    name: 'Thẻ Bài Hiếm Holographic Rồng Lửa Ultimate',
    brand: 'COLLECTOR LAB',
    price: 2500000,
    image: imageUrls.rainbow,
    rating: 5,
  },
  {
    name: 'Mô Hình Lắp Ghép Robot PG 1/60 Perfect Grade',
    brand: 'BANDAI',
    price: 5400000,
    image: imageUrls.lego,
    rating: 5,
  },
  {
    name: 'Xe Điều Khiển Từ Xa RC Off-Road 4WD 1/10',
    brand: 'TRAXXAS',
    price: 3890000,
    image: imageUrls.cars,
    rating: 4.9,
  },
]

const brands = ['BANDAI', 'Good Smile', 'Pop Mart', 'Tamiya', 'AutoArt', 'Ultra Pro', 'Hot Wheels']

function formatPrice(price: number) {
  return new Intl.NumberFormat('vi-VN').format(price) + '₫'
}

function Logo({ light = false, onClick }: { light?: boolean; onClick?: () => void }) {
  return (
    <a href="#home" className="logo" aria-label="Toyverse - Trang chủ" onClick={onClick}>
      <span className="logo-mark">
        <span>T</span>
      </span>
      <span className={light ? 'text-white' : 'text-[#202542]'}>
        toy<span className="text-[#ff625f]">verse</span>
      </span>
    </a>
  )
}

const selectedEffect = {
  boxShadow: 'rgba(0, 0, 0, 0.25) 0px 4px 4px 0px',
  '--figma-make-local-effect-type': 'DROP_SHADOW',
} as React.CSSProperties

function ProductCard({
  product,
  badge,
  selectedEffects = false,
}: {
  product: HomeProduct
  badge?: string
  selectedEffects?: boolean
}) {
  const [liked, setLiked] = useState(false)
  const effect = selectedEffects ? selectedEffect : undefined
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        {product.sale ? (
          <span className="sale-badge">-{product.sale}%</span>
        ) : badge ? (
          <span className="hot-badge">{badge}</span>
        ) : null}
        <button
          className={`heart-btn ${liked ? 'liked' : ''}`}
          onClick={() => setLiked(!liked)}
          aria-label={liked ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
        >
          <Icon name="heart" size={18} />
        </button>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="285px"
          className="product-image"
        />
        <button className="quick-add" style={effect}>
          <Icon name="bag" size={17} /> Thêm nhanh
        </button>
      </div>
      <div className="pt-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <p className="text-[10px] font-extrabold tracking-[0.14em] text-[#9296a8]" style={effect}>
            {product.brand}
          </p>
          <span className="flex items-center gap-1 text-xs font-bold text-[#555b73]" style={effect}>
            <Icon name="star" size={13} className="fill-[#ffc531] stroke-[#ffc531]" />
            {product.rating}
          </span>
        </div>
        <h3 className="min-h-12 text-[15px] font-bold leading-6 text-[#202542]" style={effect}>
          {product.name}
        </h3>
        <div className="mt-3 flex items-end gap-2">
          <strong className="text-lg text-[#ff5f5c]" style={effect}>
            {formatPrice(product.price)}
          </strong>
          {product.oldPrice && (
            <span className="pb-0.5 text-xs text-[#a9acb9] line-through" style={effect}>
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}

type Page = 'home' | 'products' | 'sale' | 'services'

const allProducts = [...products, ...bestSellers] as (typeof products)[number][]

function ProductListing({ saleOnly = false, query }: { saleOnly?: boolean; query: string }) {
  const [category, setCategory] = useState('Tất cả')
  const [brand, setBrand] = useState('Tất cả')
  const [price, setPrice] = useState('all')

  const categoryOf = (product: (typeof products)[number]) => {
    if (product.image === imageUrls.cars) return 'Xe & mô hình'
    if (product.image === imageUrls.rainbow || product.image === imageUrls.building)
      return 'Đồ chơi gỗ'
    if (product.image === imageUrls.lego) return 'Lắp ráp'
    return 'Giáo dục'
  }

  const listing = allProducts.filter((product) => {
    const matchesSale = !saleOnly || Boolean(product.sale)
    const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase())
    const matchesCategory = category === 'Tất cả' || categoryOf(product) === category
    const matchesBrand = brand === 'Tất cả' || product.brand === brand
    const matchesPrice =
      price === 'all' ||
      (price === 'under300' && product.price < 300000) ||
      (price === '300to400' && product.price >= 300000 && product.price <= 400000) ||
      (price === 'over400' && product.price > 400000)
    return matchesSale && matchesQuery && matchesCategory && matchesBrand && matchesPrice
  })

  return (
    <main className="catalog-page">
      <div className="catalog-hero">
        <p className="eyebrow">
          <span></span> {saleOnly ? 'ƯU ĐÃI ĐANG DIỄN RA' : 'KHÁM PHÁ TOYVERSE'}
        </p>
        <h1>{saleOnly ? 'Khuyến mãi rộn ràng' : 'Tất cả đồ chơi'}</h1>
        <p>
          {saleOnly
            ? 'Săn những món đồ chơi yêu thích với mức giá vui nhất.'
            : 'Khám phá figure, thẻ bài, mô hình lắp ghép và xe dành cho người sưu tầm.'}
        </p>
      </div>
      <div className="catalog-layout">
        <aside className="filter-panel">
          <div className="filter-title">
            <strong>Bộ lọc</strong>
            <button
              onClick={() => {
                setCategory('Tất cả')
                setBrand('Tất cả')
                setPrice('all')
              }}
            >
              Xóa lọc
            </button>
          </div>
          <label>
            Thể loại đồ chơi
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option>Tất cả</option>
              <option>Giáo dục</option>
              <option>Lắp ráp</option>
              <option>Xe & mô hình</option>
              <option>Đồ chơi gỗ</option>
            </select>
          </label>
          <label>
            Hãng đồ chơi
            <select value={brand} onChange={(e) => setBrand(e.target.value)}>
              <option>Tất cả</option>
              {[...new Set(allProducts.map((product) => product.brand))].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <fieldset>
            <legend>Mức giá</legend>
            {[
              ['all', 'Tất cả mức giá'],
              ['under300', 'Dưới 300.000₫'],
              ['300to400', '300.000₫ – 400.000₫'],
              ['over400', 'Trên 400.000₫'],
            ].map(([value, label]) => (
              <label className="radio-row" key={value}>
                <input
                  type="radio"
                  name="price"
                  value={value}
                  checked={price === value}
                  onChange={(e) => setPrice(e.target.value)}
                />
                {label}
              </label>
            ))}
          </fieldset>
        </aside>
        <section className="catalog-results">
          <div className="results-bar">
            <p>
              <strong>{listing.length}</strong> sản phẩm
            </p>
            <select aria-label="Sắp xếp">
              <option>Nổi bật nhất</option>
              <option>Giá thấp đến cao</option>
              <option>Giá cao đến thấp</option>
            </select>
          </div>
          <div className="catalog-grid">
            {listing.map((product, index) => (
              <ProductCard
                key={`${product.name}-${index}`}
                product={product}
                badge={!product.sale && index < 2 ? `TOP ${index + 1}` : undefined}
              />
            ))}
          </div>
          {listing.length === 0 && (
            <div className="empty-state">
              <strong>Chưa tìm thấy món đồ chơi phù hợp</strong>
              <p>Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default function App({ catalogProducts = [] }: { catalogProducts?: HomeProduct[] }) {
  const [activeCategory, setActiveCategory] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [account, setAccount] = useState<{ fullName: string } | null>(null)
  const [query, setQuery] = useState('')
  const [page, setPage] = useState<Page>(() => {
    if (typeof window === 'undefined') return 'home'
    const route = window.location.hash.replace('#', '')
    return ['products', 'sale', 'services'].includes(route) ? (route as Page) : 'home'
  })
  const [newsletterOpen, setNewsletterOpen] = useState(true)
  const [saleSlide, setSaleSlide] = useState(0)
  const [bestSlide, setBestSlide] = useState(0)
  const dealProducts = useMemo(() => {
    const deals = catalogProducts.filter((product) => product.sale && product.sale > 0).slice(0, 10)
    return deals.length ? deals : products
  }, [catalogProducts])
  const topProducts = useMemo(() => {
    const top = [...catalogProducts]
      .sort((a, b) => Number(b.rating) - Number(a.rating))
      .slice(0, 10)
    return top.length ? top : bestSellers
  }, [catalogProducts])
  const brandItems = useMemo(() => {
    const catalogBrands = [...new Set(catalogProducts.map((product) => product.brand))]
    return catalogBrands.length ? catalogBrands : brands
  }, [catalogProducts])
  const filteredProducts = useMemo(
    () => dealProducts.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())),
    [dealProducts, query],
  )
  const carouselVisibleItems =
    typeof window !== 'undefined' && window.innerWidth >= 1024
      ? 3
      : typeof window !== 'undefined' && window.innerWidth >= 640
        ? 2
        : 1
  const saleCarouselLength = query ? filteredProducts.length : dealProducts.length
  const saleMaxSlide = Math.max(0, saleCarouselLength - carouselVisibleItems)
  const bestMaxSlide = Math.max(0, topProducts.length - carouselVisibleItems)

  const navigate = (nextPage: Page) => {
    if (nextPage === 'products') {
      window.location.assign('/products')
      return
    }
    if (nextPage === 'sale') {
      window.location.assign('/products?sale=1')
      return
    }
    setPage(nextPage)
    setMenuOpen(false)
    window.location.hash = nextPage
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    fetch('/api/app-session')
      .then((response) => response.json())
      .then((data) => {
        setAccount(data.user ? { fullName: data.user.fullName } : null)
        setCartCount(data.cartCount ?? 0)
      })
      .catch(() => undefined)

    const syncPageWithHash = () => {
      const route = window.location.hash.replace('#', '')
      setPage(['products', 'sale', 'services'].includes(route) ? (route as Page) : 'home')
    }
    window.addEventListener('hashchange', syncPageWithHash)
    return () => window.removeEventListener('hashchange', syncPageWithHash)
  }, [])

  return (
    <div id="top" className="min-h-screen bg-[#fffdf8] text-[#202542]">
      <div className="promo-bar">
        Miễn phí giao hàng cho đơn từ 499K <span>•</span> Đổi trả dễ dàng trong 30 ngày
      </div>
      <header className="site-header">
        <div className="nav-top">
          <Logo onClick={() => navigate('home')} />
          <div className="nav-search">
            <Icon name="search" size={18} className="text-[#787c8d]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-[#989b9f]"
              placeholder="Tìm món đồ chơi..."
            />
          </div>
          <div className="header-actions">
            <a className="account-btn" href={account ? '/profile' : '/auth'}>
              <Icon name="user" />
              <span>
                {account ? (
                  <>
                    {account.fullName}
                    <small> / Hồ sơ cá nhân</small>
                  </>
                ) : (
                  <>
                    Đăng nhập<small> / Đăng ký</small>
                  </>
                )}
              </span>
            </a>
            <a href="/cart" className="icon-button relative" aria-label="Giỏ hàng">
              <Icon name="bag" size={22} />
              <span className="cart-count">{cartCount}</span>
            </a>
            <button
              className="menu-button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Mở menu"
            >
              <Icon name={menuOpen ? 'close' : 'menu'} />
            </button>
          </div>
        </div>
        <div className="nav-bottom">
          <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
            <a
              href="#home"
              className={page === 'home' ? 'active' : ''}
              onClick={() => navigate('home')}
            >
              Trang chủ
            </a>
            <a
              href="#products"
              className={page === 'products' ? 'active' : ''}
              onClick={() => navigate('products')}
            >
              Sản phẩm
            </a>
            <a
              href="#sale"
              className={page === 'sale' ? 'active' : ''}
              onClick={() => navigate('sale')}
            >
              Khuyến mãi
            </a>
            <a
              href="#services"
              className={page === 'services' ? 'active' : ''}
              onClick={() => navigate('services')}
            >
              Dịch vụ
            </a>
          </nav>
        </div>
      </header>

      {page === 'products' && <ProductListing query={query} />}
      {page === 'sale' && <ProductListing query={query} saleOnly />}
      {page === 'services' && (
        <main className="services-page">
          <p className="eyebrow">
            <span></span> DỊCH VỤ TOYVERSE
          </p>
          <h1>
            Chăm sóc niềm vui,
            <br />
            trọn vẹn mỗi ngày.
          </h1>
          <div className="service-cards">
            <div>
              <Icon name="truck" size={30} />
              <h2>Giao hàng tận nơi</h2>
              <p>Nhanh chóng, cẩn thận trên toàn quốc.</p>
            </div>
            <div>
              <Icon name="shield" size={30} />
              <h2>Bảo hành an tâm</h2>
              <p>Hỗ trợ chính hãng cho mọi sản phẩm.</p>
            </div>
            <div>
              <Icon name="refresh" size={30} />
              <h2>Đổi trả dễ dàng</h2>
              <p>Linh hoạt trong vòng 30 ngày.</p>
            </div>
          </div>
        </main>
      )}
      {page === 'home' && (
        <main>
          <section className="hero">
            <div className="hero-copy">
              <p className="eyebrow">
                <span></span> NIỀM VUI TRONG MỖI MÓN QUÀ
              </p>
              <h1>
                Chạm vào thế giới
                <br />
                của <em>trí tưởng tượng.</em>
              </h1>
              <p className="hero-subtitle">
                Từ figure giới hạn đến thẻ bài hiếm và mô hình lắp ghép, Toyverse kết nối bạn với
                những bộ sưu tập đáng tự hào.
              </p>
              <a href="#products" className="primary-button" onClick={() => navigate('products')}>
                Khám phá ngay <Icon name="arrow" />
              </a>
              <div className="hero-proof">
                <div className="avatar-stack">
                  <span>TK</span>
                  <span>AN</span>
                  <span>MY</span>
                </div>
                <p>
                  <strong>12.000+ nhà sưu tầm</strong>
                  <br />
                  đã tin chọn Toyverse
                </p>
              </div>
            </div>

            <div className="category-stage" aria-label="Danh mục đồ chơi nổi bật">
              <div className="category-stack">
                {categories.map((category, index) => (
                  <article
                    key={category.name}
                    className={`category-card ${activeCategory === index ? 'active' : ''}`}
                    style={{ '--card-color': category.color } as React.CSSProperties}
                    onMouseEnter={() => setActiveCategory(index)}
                    onFocus={() => setActiveCategory(index)}
                    tabIndex={0}
                  >
                    <img src={category.image} alt="" />
                    <div className="category-overlay"></div>
                    <div className="category-number">0{index + 1}</div>
                    <h3 className="category-vertical-title">{category.name}</h3>
                    <div className="category-content">
                      <p>{category.count}</p>
                      <h2>{category.name}</h2>
                      <div className="category-reveal">
                        <span>{category.text}</span>
                        <button aria-label={`Xem ${category.name}`}>
                          <Icon name="arrow" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              <p className="hover-hint">
                <span>←</span> Di chuột để khám phá từng thế giới
              </p>
            </div>
          </section>

          <section className="benefits">
            <div>
              <Icon name="truck" />
              <p>
                <strong>Giao hàng siêu tốc</strong>
                <span>Toàn quốc từ 2–4 ngày</span>
              </p>
            </div>
            <div>
              <Icon name="shield" />
              <p>
                <strong>Hàng chính hãng</strong>
                <span>Nguồn gốc rõ ràng, chuẩn sưu tầm</span>
              </p>
            </div>
            <div>
              <Icon name="refresh" />
              <p>
                <strong>Đổi trả 30 ngày</strong>
                <span>Nhanh chóng & đơn giản</span>
              </p>
            </div>
          </section>

          <section id="brands" className="section brands-section">
            <div className="section-heading row-heading">
              <div>
                <p className="eyebrow">
                  <span></span> ĐỒ CHƠI CHÍNH HÃNG
                </p>
                <h2>Thương hiệu giới sưu tầm yêu thích</h2>
              </div>
            </div>
            <div className="brand-marquee">
              <div className="brand-track">
                {[...brandItems, ...brandItems].map((brand, index) => (
                  <a
                    href={`/products?brand=${encodeURIComponent(brand)}`}
                    className={`brand-pill brand-${index % 5}`}
                    key={`${brand}-${index}`}
                    aria-label={`Xem sản phẩm ${brand}`}
                  >
                    <span>
                      {brand
                        .split(' ')
                        .map((word) => word[0])
                        .join('')
                        .slice(0, 2)}
                    </span>
                    <strong>{brand}</strong>
                  </a>
                ))}
              </div>
            </div>
          </section>

          <section id="sale" className="sale-section">
            <div className="sale-deco one"></div>
            <div className="sale-deco two"></div>
            <div className="section">
              <div className="section-heading row-heading">
                <div>
                  <p className="eyebrow light">
                    <span></span> DEAL CHO NHÀ SƯU TẦM
                  </p>
                  <h2>Deal giới hạn, săn ngay</h2>
                  <p className="section-desc">
                    10 lựa chọn figure, TCG và mô hình đang có mức giá đặc biệt.
                  </p>
                </div>
                <a href="#sale" className="text-link light" onClick={() => navigate('sale')}>
                  Xem tất cả <Icon name="arrow" size={17} />
                </a>
              </div>
              <div className="products-carousel" id="products">
                {saleSlide > 0 && (
                  <button
                    className="carousel-arrow prev light"
                    onClick={() => setSaleSlide((current) => Math.max(0, current - 1))}
                    aria-label="Sản phẩm giảm giá trước"
                  >
                    ←
                  </button>
                )}
                <div
                  className="products-row"
                  style={{ transform: `translateX(calc(-${saleSlide} * 305px))` }}
                >
                  {(query ? filteredProducts : dealProducts).map((product, index) => (
                    <ProductCard
                      key={`${product.name}-${index}`}
                      product={product}
                      selectedEffects={index === 2 || index === 3}
                    />
                  ))}
                </div>
                {saleSlide < saleMaxSlide && (
                  <button
                    className="carousel-arrow next light"
                    onClick={() => setSaleSlide((current) => Math.min(saleMaxSlide, current + 1))}
                    aria-label="Sản phẩm giảm giá tiếp theo"
                  >
                    →
                  </button>
                )}
                {query && filteredProducts.length === 0 && (
                  <p className="col-span-full rounded-3xl bg-white p-10 text-center text-[#71758a]">
                    Không tìm thấy sản phẩm phù hợp với “{query}”.
                  </p>
                )}
              </div>
            </div>
          </section>

          <section className="section best-section">
            <div className="section-heading row-heading">
              <div>
                <p className="eyebrow">
                  <span></span> CỘNG ĐỒNG SĂN ĐÓN
                </p>
                <h2>Top sản phẩm bán chạy</h2>
              </div>
              <a href="#products" className="text-link" onClick={() => navigate('products')}>
                Xem tất cả <Icon name="arrow" size={17} />
              </a>
            </div>
            <div className="products-carousel">
              {bestSlide > 0 && (
                <button
                  className="carousel-arrow prev"
                  onClick={() => setBestSlide((current) => Math.max(0, current - 1))}
                  aria-label="Sản phẩm bán chạy trước"
                >
                  ←
                </button>
              )}
              <div
                className="products-row"
                style={{ transform: `translateX(calc(-${bestSlide} * 305px))` }}
              >
                {topProducts.map((product, index) => (
                  <ProductCard
                    key={`${product.name}-${index}`}
                    product={product}
                    badge={index < 3 ? `TOP ${index + 1}` : 'HOT'}
                  />
                ))}
              </div>
              {bestSlide < bestMaxSlide && (
                <button
                  className="carousel-arrow next"
                  onClick={() => setBestSlide((current) => Math.min(bestMaxSlide, current + 1))}
                  aria-label="Sản phẩm bán chạy tiếp theo"
                >
                  →
                </button>
              )}
            </div>
          </section>
        </main>
      )}

      {newsletterOpen && (
        <section className="newsletter">
          <button
            className="newsletter-close"
            onClick={() => setNewsletterOpen(false)}
            aria-label="Đóng đăng ký nhận tin"
          >
            <Icon name="close" size={16} />
          </button>
          <div>
            <p className="eyebrow light">
              <span></span> GIA NHẬP TOYVERSE
            </p>
            <h2>Nhận điều vui vào hộp thư!</h2>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Email của bạn" aria-label="Email" required />
            <button>
              Đăng ký <Icon name="arrow" size={18} />
            </button>
          </form>
        </section>
      )}
      {!newsletterOpen && (
        <button
          className="newsletter-bubble"
          onClick={() => setNewsletterOpen(true)}
          aria-label="Mở đăng ký nhận tin Toyverse"
        >
          <Icon name="giftClosed" size={24} className="gift-closed" />
          <Icon name="giftOpen" size={27} className="gift-open" />
        </button>
      )}

      <footer>
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo light />
            <p>
              Bộ sưu tập chất.
              <br />
              <strong>Niềm vui thật to.</strong>
            </p>
            <div className="socials">
              <a href="#" aria-label="Facebook">
                f
              </a>
              <a href="#" aria-label="Instagram">
                ig
              </a>
              <a href="#" aria-label="Youtube">
                ▶
              </a>
            </div>
          </div>
          <div className="footer-links">
            <div>
              <h3>Hỗ trợ khách hàng</h3>
              <a href="#">Hướng dẫn mua hàng</a>
              <a href="#">Phương thức thanh toán</a>
              <a href="#">Vận chuyển & giao nhận</a>
              <a href="#">Câu hỏi thường gặp</a>
            </div>
            <div>
              <h3>Chính sách</h3>
              <a href="#">Chính sách bảo hành</a>
              <a href="#">Đổi trả & hoàn tiền</a>
              <a href="#">Bảo mật thông tin</a>
              <a href="#">Điều khoản sử dụng</a>
            </div>
          </div>
          <div className="footer-contact">
            <h3>Ghé thăm Toyverse</h3>
            <div className="map-card">
              <div className="map-lines"></div>
              <span>
                <Icon name="pin" size={18} />
              </span>
              <p>
                28 Nguyễn Huệ, Quận 1<br />
                <strong>TP. Hồ Chí Minh</strong>
              </p>
            </div>
            <a href="tel:19001234">
              <Icon name="phone" size={18} /> 1900 1234
            </a>
            <a href="mailto:hello@toyverse.vn">
              <Icon name="mail" size={18} /> hello@toyverse.vn
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 Toyverse. All rights reserved.</span>
          <span>Được tạo nên bằng niềm vui tại Việt Nam</span>
        </div>
      </footer>
    </div>
  )
}
