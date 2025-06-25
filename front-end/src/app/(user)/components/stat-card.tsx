import { StatCardProps } from "../types/stat-card";

export const StatCard = ({ title, value, icon: Icon, color = "blue", trend }: StatCardProps) => (
  <div className="bg-white border border-zinc-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-200 hover:border-blue-200">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 bg-${color}-100 rounded-xl`}>
        <Icon className={`${color}`} size={24} />
      </div>
      {trend && (
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            trend > 0
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {trend > 0 ? "+" : ""}
          {trend}%
        </span>
      )}
    </div>
    <p className="text-sm text-zinc-500 font-medium mb-1">{title}</p>
    <p className="text-3xl font-bold text-zinc-900">{value}</p>
  </div>
);