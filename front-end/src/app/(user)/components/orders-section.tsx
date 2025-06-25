import { Check, Clock, Filter, Package, Search } from "lucide-react";
import { RecentOrder } from "./recent-order";
import { StatCard } from "./stat-card";

export const OrdersSection = () => (
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
        value="47"
        icon={Package}
        color="text-zinc-400"
        trend={12}
      />
      <StatCard title="Em Andamento" value="3" icon={Clock} color="text-yellow-400" />
      <StatCard
        title="Entregues"
        value="44"
        icon={Check}
        color="text-green-400"
        trend={8}
      />
    </div>

    <div className="space-y-4">
      <RecentOrder
        id="2024001"
        date="23 Jun 2025"
        status="Em trânsito"
        total="189,90"
        items="3"
        product="Smartphone Galaxy S24"
      />
      <RecentOrder
        id="2024002"
        date="20 Jun 2025"
        status="Entregue"
        total="299,99"
        items="1"
        product="Fone Bluetooth Premium"
      />
      <RecentOrder
        id="2024003"
        date="15 Jun 2025"
        status="Processando"
        total="89,90"
        items="2"
        product="Carregador Wireless"
      />
      <RecentOrder
        id="2024004"
        date="10 Jun 2025"
        status="Entregue"
        total="459,99"
        items="1"
        product="Tablet Android 10'"
      />
    </div>
  </div>
);