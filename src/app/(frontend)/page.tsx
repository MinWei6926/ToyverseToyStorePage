import ToyverseApp, { type HomeProduct } from '@/components/ToyverseApp'
import { getCachedProducts } from '@/lib/products'

export default async function HomePage() {
  const products = await getCachedProducts()
  const catalogProducts: HomeProduct[] = products.flatMap((product) => {
    const image = typeof product.image === 'object' ? product.image : null
    if (!image?.url) return []
    return [
      {
        name: product.name,
        brand: product.brand,
        price: product.price,
        oldPrice: product.oldPrice,
        sale: product.sale,
        image: image.url,
        rating: product.rating ?? 5,
      },
    ]
  })
  return <ToyverseApp catalogProducts={catalogProducts} />
}
