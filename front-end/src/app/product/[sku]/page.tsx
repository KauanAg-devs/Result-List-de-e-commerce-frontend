import ProductPageClient from '@/components/product/sku/product-page-client'

export default function ProductPage({ params }: { params: { sku: string } }) {
  return <ProductPageClient sku={params.sku} />
}
