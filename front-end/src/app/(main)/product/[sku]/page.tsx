import ProductPageClient from '@/components/product/sku/product-page-client'
import { PageProps } from '@/types/main/product/sku/page'

export default async function Page({ params }: PageProps) {
  const { sku } = await params
  return <ProductPageClient sku={sku} />
}
