import 'server-only'

import { unstable_cache } from 'next/cache'
import { getPayloadClient } from '@/lib/payload'

export const getCachedProducts = unstable_cache(
  async () => {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'products',
      depth: 1,
      limit: 100,
      sort: '-featured',
      overrideAccess: false,
    })
    return result.docs
  },
  ['products-list-collector-catalog-v2'],
  { tags: ['products'] },
)
