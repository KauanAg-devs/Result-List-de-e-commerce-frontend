import { ProductGrouped, ProductVariant } from "@/types/product";

export type ProductProps = {
  group: ProductGrouped;
  variant?: ProductVariant | null;
  lazy?: boolean;
}
