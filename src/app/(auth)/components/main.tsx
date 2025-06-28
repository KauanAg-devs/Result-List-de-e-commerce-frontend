import { ChildrenProps } from "@/types/children";

export function Main({ children }: ChildrenProps) {
  return (
    <div className="space-y-6"> 
      {children} 
    </div>
  )
}
