import { Check, Clock, Package, Truck } from "lucide-react";

export const RecentOrder = ({ id, date, status, total, items, product }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case "Entregue":
        return { color: "bg-green-100 text-green-800", icon: Check };
      case "Em trânsito":
        return { color: "bg-blue-100 text-blue-800", icon: Truck };
      case "Processando":
        return { color: "bg-yellow-100 text-yellow-800", icon: Clock };
      default:
        return { color: "bg-gray-100 text-gray-800", icon: AlertCircle };
    }
  };

  const statusConfig = getStatusConfig(status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="flex items-center justify-between p-5 border border-zinc-200 rounded-2xl hover:bg-zinc-50 transition-all duration-200 hover:border-blue-200">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-50 rounded-xl">
          <Package className="text-blue-600" size={20} />
        </div>
        <div>
          <p className="font-semibold text-zinc-900 mb-1">Pedido #{id}</p>
          <p className="text-sm text-zinc-500 mb-1">{product}</p>
          <p className="text-xs text-zinc-400">
            {items} itens • {date}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold text-zinc-900 mb-2">R$ {total}</p>
        <span
          className={`text-xs px-3 py-1 rounded-full flex items-center gap-1 ${statusConfig.color}`}
        >
          <StatusIcon size={12} />
          {status}
        </span>
      </div>
    </div>
  );
};