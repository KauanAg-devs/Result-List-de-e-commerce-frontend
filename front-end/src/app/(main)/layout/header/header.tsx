import { ChildrenProps } from "@/types/children";

export default function Header({ children }: ChildrenProps) {
  return <header className="bg-white">{children}</header>;
}
