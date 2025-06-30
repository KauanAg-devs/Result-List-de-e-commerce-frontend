import {
  Edit3,
  User,
  Star,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingBag,
  Package,
  TrendingUp,
  CreditCard,
  Shield,
  Check,
  X,
} from "lucide-react";
import { RecentOrder } from "./recent-order";
import { StatCard } from "./stat-card";
import { QuickActionCard } from "./quick-action-cart";
import { OverviewSectionProps } from "../types/overview-section";
import { ChangeEvent, useEffect, useState } from "react";
import { UserAddress, UserRole } from "@/types/user-profile";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { updateUserProfile } from "@/app/store/user-profile-slice";
import { useForm, SubmitHandler } from "react-hook-form";

type UserProfileForm = {
  name: string;
  phone: string;
  publicEmail: string;
  profileImage?: string | null;
};

export default function OverviewSection({
  setPickedMethod,
}: OverviewSectionProps) {
  const userProfile = useSelector(
    (state: RootState) => state.userProfile?.userProfile
  );
  const dispatch = useDispatch<AppDispatch>();
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UserProfileForm>({
    defaultValues: {
      name: userProfile?.name || "",
      phone: userProfile?.phone || "",
      publicEmail: userProfile?.email?.publicEmail || "",
      profileImage:
        typeof userProfile?.profileImage === "string"
          ? userProfile?.profileImage
          : null,
    },
  });

  useEffect(() => {
    reset({
      name: userProfile?.name || "",
      phone: userProfile?.phone || "",
      publicEmail: userProfile?.email?.publicEmail || "",
      profileImage:
        typeof userProfile?.profileImage === "string"
          ? userProfile?.profileImage
          : null,
    });
  }, [userProfile, reset]);

  const onSubmit: SubmitHandler<UserProfileForm> = (data) => {
    const updatedProfile = {
      ...userProfile!,
      name: data.name,
      phone: data.phone,
      publicEmail: data.publicEmail,
      profileImage: data.profileImage || null,
    };

    dispatch(updateUserProfile(updatedProfile));
    setIsEditing(false);
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  const hasRole = (roles: UserRole[] | undefined, role: UserRole) => {
    return Array.isArray(roles) && roles.includes(role);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setValue("profileImage", event.target.result as string, {
            shouldValidate: true,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const getRoleBadge = (roles?: UserRole[]) => {
    const roleLabels: Record<UserRole, { label: string; color: string }> = {
      [UserRole.Admin]: { label: "ADMIN", color: "bg-red-100 text-red-800" },
      [UserRole.Seller]: {
        label: "VENDEDOR",
        color: "bg-green-100 text-green-800",
      },
      [UserRole.User]: { label: "USUÁRIO", color: "bg-blue-100 text-blue-800" },
    };

    if (!roles || !Array.isArray(roles)) {
      return [roleLabels[UserRole.User]];
    }

    return roles
      .filter((role): role is UserRole =>
        Object.values(UserRole).includes(role)
      )
      .map((role) => roleLabels[role]);
  };

  const formatAddress = (addressData?: UserAddress | UserAddress[]) => {
    if (!addressData) return "Endereço não informado";
    if (Array.isArray(addressData)) {
      return `${addressData[0]?.address}, ${addressData[0]?.city} - ${addressData[0]?.state}`;
    }
    return `${addressData.address}, ${addressData.city} - ${addressData.state}`;
  };

  const getProfileImageSrc = () => {
    if (!userProfile?.profileImage) return null;
    if (typeof userProfile?.profileImage === "string")
      return userProfile?.profileImage;
    console.log(userProfile?.profileImage);
    return URL.createObjectURL(new Blob([userProfile?.profileImage]));
  };

  const roleBadge = getRoleBadge(userProfile?.roles);
  const displayEmail =
    userProfile?.email?.publicEmail ?? "Email público não cadastrado";

  const profileImageSrc = watch("profileImage") || getProfileImageSrc();

  return (
    <div className="space-y-8">
      <div className="bg-white border border-zinc-200 rounded-2xl p-6 md:p-8 shadow-sm">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row items-start gap-6 md:gap-8"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="h-32 w-32 border-2 border-zinc-200 rounded-full flex justify-center items-center overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
                {profileImageSrc ? (
                  <img
                    src={profileImageSrc}
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
              <button
                disabled={!isEditing}
                tabIndex={isEditing ? 0 : -1}
                className={`flex gap-2 items-center font-semibold px-6 py-3 text-sm rounded-xl transition-all duration-200
    bg-zinc-900 text-white
    ${
      isEditing
        ? "opacity-100 pointer-events-auto"
        : "opacity-0 pointer-events-none select-none"
    }`}
                type="button"
              >
                <Edit3 size={16} />
                Alterar Foto
              </button>

              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={!isEditing}
                className={`${
                  !isEditing && "pointer-events-none"
                } absolute inset-0 w-full h-full opacity-0 cursor-pointer`}
              />
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                {roleBadge.map((role) => {
                  return (
                    <span
                      key={role.color}
                      className={`text-xs px-3 py-1 rounded-full font-medium ${role.color}`}
                    >
                      {role.label}
                    </span>
                  );
                })}
                <div className="flex items-center gap-1">
                  <Star className="text-yellow-500 fill-current" size={16} />
                  <span className="text-sm font-medium text-zinc-700">4.8</span>
                  <span className="text-xs text-zinc-500">
                    (127 avaliações)
                  </span>
                </div>
              </div>

              {isEditing ? (
                <>
                  <input
                    type="text"
                    {...register("name")}
                    className="text-3xl md:text-4xl font-bold text-zinc-900 mb-2 w-full bg-transparent border-b-2 border-blue-500 focus:outline-none"
                    placeholder="Seu nome"
                  />
                  {errors.name && (
                    <p className="text-red-600 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </>
              ) : (
                <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-2">
                  {userProfile?.name || "Nome não informado"}
                </h1>
              )}

              <p className="text-xl text-zinc-600 mb-4">
                {hasRole(userProfile?.roles, UserRole.Admin)
                  ? "Administrador"
                  : hasRole(userProfile?.roles, UserRole.Seller)
                  ? "Vendedor"
                  : "Usuário"}
              </p>
            </div>

            {userProfile && (
              <div className="flex gap-3 mb-4">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex gap-2 items-center font-semibold px-4 py-2 text-sm bg-blue-600 text-white rounded-lg transition-all duration-200 hover:bg-blue-700"
                    type="button"
                  >
                    <Edit3 size={16} />
                    Editar Perfil
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex gap-2 items-center font-semibold px-4 py-2 text-sm bg-green-600 text-white rounded-lg transition-all duration-200 hover:bg-green-700"
                    >
                      <Check size={16} />
                      Salvar
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex gap-2 items-center font-semibold px-4 py-2 text-sm bg-gray-600 text-white rounded-lg transition-all duration-200 hover:bg-gray-700"
                    >
                      <X size={16} />
                      Cancelar
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-3">
                <Mail className="text-zinc-400" size={16} />
                {isEditing ? (
                  <>
                    <input
                      type="email"
                      {...register("publicEmail", {
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Email inválido",
                        },
                      })}
                      className="text-zinc-700 bg-transparent border-b border-zinc-300 focus:outline-none focus:border-blue-500 flex-1"
                      placeholder="Email público"
                    />
                    {errors.publicEmail && (
                      <p className="text-red-600 text-sm">
                        {errors.publicEmail.message}
                      </p>
                    )}
                  </>
                ) : (
                  <span className="text-zinc-700">{displayEmail}</span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-zinc-400" size={16} />
                {isEditing ? (
                  <input
                    type="tel"
                    {...register("phone")}
                    className="text-zinc-700 bg-transparent border-b border-zinc-300 focus:outline-none focus:border-blue-500 flex-1"
                    placeholder="Telefone"
                  />
                ) : (
                  <span className="text-zinc-700">
                    {userProfile?.phone || "Telefone não informado"}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                {!isEditing && (
                  <>
                    <MapPin className="text-zinc-400" size={16} />
                    <span className="text-zinc-700">
                      {userProfile?.UserAddresses &&
                      userProfile?.UserAddresses.length > 0
                        ? formatAddress(userProfile?.UserAddresses[0])
                        : "Endereço não informado"}
                    </span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="text-zinc-400" size={16} />
                <span className="text-zinc-700">
                  Membro desde{" "}
                  {userProfile && new Date(userProfile.memberSince).toLocaleDateString(
                    "pt-BR",
                    {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    }
                  )}
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <StatCard
          title="Total de Compras"
          value={
            userProfile?.purchases?.purchasedVariants.length.toString() || "0"
          }
          icon={Package}
          color="text-zinc-600"
          trend={12}
        />
        <StatCard
          title="Vendas"
          value={userProfile?.sales?.variants.length.toString() || "0"}
          icon={TrendingUp}
          color="text-green-400"
          trend={23}
        />
        <StatCard
          title="Cartões"
          value={userProfile?.userPaymentMethods?.length.toString() || "0"}
          icon={CreditCard}
          color="text-blue-400"
          trend={5}
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
              title="Minhas Compras"
              description="Acompanhe suas compras"
              icon={Package}
              onClick={() => setPickedMethod("orders")}
              badge={userProfile?.purchases?.purchasedVariants.length.toString()}
            />
            <QuickActionCard
              title="Gerenciar Endereços"
              description="Configure seus endereços"
              icon={MapPin}
              onClick={() => setPickedMethod("addresses")}
            />
            <QuickActionCard
              title="Métodos de Pagamento"
              description="Cartões e formas de pagamento"
              icon={CreditCard}
              onClick={() => setPickedMethod("paymentMethods")}
              badge={userProfile?.userPaymentMethods?.length.toString()}
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
              Atividade Recente
            </h2>
            <button
              onClick={() => setPickedMethod("orders")}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline"
            >
              Ver todas
            </button>
          </div>
          <div className="space-y-4">
            {userProfile?.purchases?.purchasedVariants.map((variant, index) => (
              <RecentOrder
                key={index}
                id={variant.variant.sku}
                date={variant.date}
                status={variant.status}
                total={variant.price.toString()}
                items={variant.quantity.toString()}
                product={variant.variant.sku}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">
              {hasRole(userProfile?.roles, UserRole.Seller)
                ? "Painel do Vendedor"
                : "Produtos Recomendados"}
            </h3>
            <p className="text-blue-100 mb-6">
              {hasRole(userProfile?.roles, UserRole.Seller)
                ? "Gerencie suas vendas e produtos"
                : "Com base no seu histórico de compras"}
            </p>
            <button className="bg-white text-zinc-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200 hover:scale-105">
              {hasRole(userProfile?.roles, UserRole.Seller)
                ? "Acessar Painel"
                : "Ver Recomendações"}
            </button>
          </div>
          <ShoppingBag size={80} className="text-blue-200 opacity-50" />
        </div>
      </div>
    </div>
  );
}
