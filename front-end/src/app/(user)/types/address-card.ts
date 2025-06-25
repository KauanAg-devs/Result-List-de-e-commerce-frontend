import { MouseEventHandler } from "react";

export type AddressCardProps = {
  title: string;
  address: string;
  isDefault: boolean;
  onEdit: MouseEventHandler<HTMLButtonElement>;
  onDelete: MouseEventHandler<HTMLButtonElement>;
};
