import { UserAddress } from "@/types/user-profile";
import { MouseEventHandler } from "react";

export type AddressCardProps = {
  userAddress: UserAddress;
  isDefault: boolean;
  onEdit: MouseEventHandler<HTMLButtonElement>;
  onDelete: MouseEventHandler<HTMLButtonElement>;
};
