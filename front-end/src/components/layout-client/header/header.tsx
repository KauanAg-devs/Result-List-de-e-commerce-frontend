import { HeaderProps } from "@/types/main/layout-client/header";

export default function Header({ children }: HeaderProps) {
  return <header className="bg-white">{children}</header>;
}
