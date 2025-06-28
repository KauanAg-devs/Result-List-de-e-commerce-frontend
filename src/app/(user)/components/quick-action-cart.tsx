import { ChevronRight } from "lucide-react"
import { QuickActionCartProps } from "../types/quick-action-card";

export const QuickActionCard = ({
  title,
  description,
  icon: Icon,
  onClick,
  badge,
}: QuickActionCartProps) => (
  <div
    onClick={onClick}
    className="bg-white border border-zinc-200 rounded-2xl p-5 hover:shadow-lg transition-all cursor-pointer hover:border-blue-300 hover:scale-105 duration-200"
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-50 rounded-xl">
          <Icon className="text-zinc-500" size={22} />
        </div>
        <div>
          <h3 className="font-semibold text-zinc-900 mb-1">{title}</h3>
          <p className="text-sm text-zinc-500">{description}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {badge && (
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {badge}
          </span>
        )}
        <ChevronRight className="text-zinc-400" size={18} />
      </div>
    </div>
  </div>
);