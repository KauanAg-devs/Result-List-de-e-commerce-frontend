import ProductPageClient from '@/components/product/sku/product-page-client'

export default async function ProductPage({ params }: { params: Promise<{ sku: string }> }) {
  const { sku } = await params
  return <ProductPageClient sku={sku} />
}
