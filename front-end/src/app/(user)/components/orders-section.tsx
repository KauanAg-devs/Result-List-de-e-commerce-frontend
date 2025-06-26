import { Check, Clock, Filter, Package, Search } from "lucide-react";
import { RecentOrder } from "./recent-order";
import { StatCard } from "./stat-card";
import { useUserProfile } from "@/app/contexts/user-profile-context";
import { VariantStatus } from "@/types/product";

export const OrdersSection = () => {
  const { userProfile } = useUserProfile();

  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-6 md:p-8 shadow-sm">
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <h2 className="text-2xl font-bold text-zinc-900">Meus Pedidos</h2>
        <div className="flex gap-3">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Buscar pedidos..."
              className="text-zinc-600 pl-10 w-54 pr-4 py-2 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="text-zinc-400 flex items-center gap-2 px-4 py-2 border border-zinc-200 rounded-lg hover:bg-zinc-50">
            <Filter size={16} />
            Filtrar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard
          title="Total de Pedidos"
          value={
            userProfile.purchases?.purchasedVariants.length.toString() || "0"
          }
          icon={Package}
          color="text-zinc-400"
          trend={12}
        />
        <StatCard
          title="Em Trânsito"
          value={
            userProfile.purchases?.purchasedVariants
              .filter((variants) => variants.status === VariantStatus.InTransit)
              .length.toString() || "0"
          }
          icon={Clock}
          color="text-yellow-400"
        />
        <StatCard
          title="Entregues"
          value={
            userProfile.purchases?.purchasedVariants
              .filter((variants) => variants.status === VariantStatus.Delivered)
              .length.toString() || "0"
          }
          icon={Check}
          color="text-green-400"
          trend={8}
        />
      </div>

      <div className="space-y-4">
        {userProfile.purchases?.purchasedVariants.map((variant, index) => {
          return (
            <RecentOrder
              key={index}
              id={variant.variant.sku}
              date={variant.date}
              status={variant.status}
              total={variant.price.toString()}
              items={variant.quantity.toString()}
              product={variant.variant.sku}
            />
          );
        })}
      </div>
    </div>
    </div>
  );
};
