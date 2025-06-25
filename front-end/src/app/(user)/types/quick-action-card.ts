import { LucideProps } from "lucide-react"
import { ForwardRefExoticComponent, MouseEventHandler, RefAttributes } from "react"

export type QuickActionCartProps = {
  title: string 
  description: string 
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
  onClick: MouseEventHandler<HTMLDivElement>
  badge?: string
}