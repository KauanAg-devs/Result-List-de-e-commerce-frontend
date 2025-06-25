import { Edit3, User, Star, Mail, Phone, MapPin, Calendar, ShoppingBag, Package, Heart, TrendingUp, CreditCard, Shield } from "lucide-react";
import { RecentOrder } from "./recent-order";
import { StatCard } from "./stat-card";
import { QuickActionCard } from "./quick-action-cart";
import { OverviewSectionProps } from "../types/overview-section";
import { ChangeEvent } from "react";

export default function OverviewSection({userInfo, setPickedMethod, profileImage, setProfileImage}: OverviewSectionProps) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white border border-zinc-200 rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="h-32 w-32 border-2 border-zinc-200 rounded-full flex justify-center items-center overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <User className="text-zinc-400" size={48} />
                )}
              </div>
              <div className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>

            <div className="relative">
              <button className="flex gap-2 items-center font-semibold px-6 py-3 text-sm bg-zinc-900 text-white rounded-xl transition-all duration-200 hover:scale-105">
                <Edit3 size={16} />
                Alterar Foto
              </button>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="text-xs bg-blue-100 px-3 py-1 text-blue-800 rounded-full font-medium">
                  ADMIN
                </span>
                <div className="flex items-center gap-1">
                  <Star className="text-yellow-500 fill-current" size={16} />
                  <span className="text-sm font-medium text-zinc-700">4.8</span>
                  <span className="text-xs text-zinc-500">
                    (127 avaliações)
                  </span>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-2">
                {userInfo.name}
              </h1>
              <p className="text-xl text-zinc-600 mb-4">{userInfo.role}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-3">
                <Mail className="text-zinc-400" size={16} />
                <span className="text-zinc-700">{userInfo.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-zinc-400" size={16} />
                <span className="text-zinc-700">{userInfo.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-zinc-400" size={16} />
                <span className="text-zinc-700">{userInfo.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="text-zinc-400" size={16} />
                <span className="text-zinc-700">
                  Membro desde {userInfo.memberSince}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <StatCard
          title="Total de Pedidos"
          value="47"
          icon={Package}
          color="text-zinc-600"
          trend={12}
        />
        <StatCard
          title="Favoritos"
          value="23"
          icon={Heart}
          color="text-red-400"
          trend={5}
        />
        <StatCard
          title="Economia Total"
          value="R$ 1.247"
          icon={TrendingUp}
          color="text-green-400"
          trend={23}
        />
        <StatCard
          title="Pontos"
          value="2.340"
          icon={Star}
          color="text-yellow-400"
          trend={15}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-zinc-900">Ações Rápidas</h2>
          <div className="space-y-4">
            <QuickActionCard
              title="Rastrear Pedido"
              description="Acompanhe suas encomendas"
              icon={Package}
              onClick={() => setPickedMethod("orders")}
              badge="3"
            />
            <QuickActionCard
              title="Adicionar Endereço"
              description="Gerencie seus endereços"
              icon={MapPin}
              onClick={() => setPickedMethod("addresses")}
            />
            <QuickActionCard
              title="Métodos de Pagamento"
              description="Cartões e formas de pagamento"
              icon={CreditCard}
              onClick={() => setPickedMethod("paymentMethods")}
            />
            <QuickActionCard
              title="Central de Segurança"
              description="Proteja sua conta"
              icon={Shield}
              onClick={() => setPickedMethod("settings")}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-zinc-900">
              Pedidos Recentes
            </h2>
            <button
              onClick={() => setPickedMethod("orders")}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline"
            >
              Ver todos
            </button>
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
          </div>
        </div>
      </div>

      <div className="bg-[url(/navigation.svg)] rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">
              Produtos Recomendados
            </h3>
            <p className="text-blue-100 mb-6">
              Com base no seu histórico de compras
            </p>
            <button className="bg-white text-zinc-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200 hover:scale-105">
              Ver Recomendações
            </button>
          </div>
          <ShoppingBag size={80} className="text-blue-200 opacity-50" />
        </div>
      </div>
    </div>
  );
}
