import { PageProps } from "@product/types/page";
import ProductPageClient from "@product/components/product-page-client";

export default async function Page({ params }: PageProps) {
  const { sku } = await params;
  return <ProductPageClient sku={sku} />;
}
