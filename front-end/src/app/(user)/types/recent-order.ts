import { VariantStatus } from "@/types/product";

export type RecentOrderProps = {
  id: string;
  date: string;
  status: VariantStatus;
  total: string;
  items: string;
  product: string;
};
