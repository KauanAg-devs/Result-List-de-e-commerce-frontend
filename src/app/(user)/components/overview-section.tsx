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
  Camera,
  Upload,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { RecentOrder } from "./recent-order";
import { StatCard } from "./stat-card";
import { QuickActionCard } from "./quick-action-cart";
import { OverviewSectionProps } from "../types/overview-section";
import { ChangeEvent, useEffect, useState } from "react";
import { UserRole } from "@/types/user-profile";
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
  const [isLoading, setIsLoading] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isValid, isDirty },
  } = useForm<UserProfileForm>({
    mode: "onChange",
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

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const onSubmit: SubmitHandler<UserProfileForm> = async (data) => {
    setIsLoading(true);
    try {
      const updatedProfile = {
        ...userProfile!,
        name: data.name,
        phone: data.phone,
        publicEmail: data.publicEmail,
        profileImage: data.profileImage || null,
      };      
      await dispatch(updateUserProfile(updatedProfile));
      setIsEditing(false);
      setSuccessMessage("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
    setImageError(null);
  };

  const hasRole = (roles: UserRole[] | undefined, role: UserRole) => {
    return Array.isArray(roles) && roles.includes(role);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setImageError("A imagem deve ter no máximo 5MB");
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setImageError("Por favor, selecione apenas arquivos de imagem");
        return;
      }

      setImageError(null);
      setIsImageUploading(true);

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setValue("profileImage", event.target.result as string, {
            shouldValidate: true,
          });
          setIsImageUploading(false);
        }
      };
      reader.onerror = () => {
        setImageError("Erro ao carregar a imagem");
        setIsImageUploading(false);
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

  const getProfileImageSrc = () => {
    if (!userProfile?.profileImage) return null;
    if (typeof userProfile?.profileImage === "string")
      return userProfile?.profileImage;
    return URL.createObjectURL(new Blob([userProfile?.profileImage]));
  };

  const roleBadge = getRoleBadge(userProfile?.roles);
  const displayEmail =
    userProfile?.email?.publicEmail ?? "Email público não cadastrado";

  const profileImageSrc = watch("profileImage") || getProfileImageSrc();

  return (
    <div className="space-y-8">
      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3 animate-in slide-in-from-top-2">
          <Check className="text-green-600" size={20} />
          <span className="text-green-800 font-medium">{successMessage}</span>
        </div>
      )}

      <div className="bg-white border border-zinc-200 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row items-start gap-6 md:gap-8"
        >
          {/* Profile Image Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <div className="h-32 w-32 border-2 border-zinc-200 rounded-full flex justify-center items-center overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 transition-all duration-200 group-hover:shadow-lg">
                {isImageUploading ? (
                  <Loader2 className="text-zinc-400 animate-spin" size={48} />
                ) : profileImageSrc ? (
                  <img
                    src={profileImageSrc}
                    alt="Profile"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <User className="text-zinc-400" size={48} />
                )}
              </div>
              
              {/* Online Status */}
              <div className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>

              {/* Image Upload Overlay */}
              {isEditing && (
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Camera className="text-white" size={24} />
                </div>
              )}
            </div>

            {/* Upload Button */}
            <div className="relative">
              <button
                disabled={!isEditing || isImageUploading}
                tabIndex={isEditing ? 0 : -1}
                className={`flex gap-2 items-center font-semibold px-6 py-3 text-sm rounded-xl transition-all duration-200
                  ${isEditing ? 
                    "bg-zinc-900 text-white hover:bg-zinc-800 opacity-100 pointer-events-auto" : 
                    "opacity-0 pointer-events-none select-none"
                  }
                  ${isImageUploading ? "opacity-50 cursor-not-allowed" : ""}
                `}
                type="button"
              >
                {isImageUploading ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <Upload size={16} />
                )}
                {isImageUploading ? "Carregando..." : "Alterar Foto"}
              </button>

              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={!isEditing || isImageUploading}
                className={`${
                  !isEditing && "pointer-events-none"
                } absolute inset-0 w-full h-full opacity-0 cursor-pointer`}
              />
            </div>

            {/* Image Error */}
            {imageError && (
              <div className="flex items-center gap-2 text-red-600 text-sm">
                <AlertCircle size={16} />
                <span>{imageError}</span>
              </div>
            )}
          </div>

          {/* Profile Info Section */}
          <div className="flex-1 space-y-6">
            {/* Roles and Rating */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                {roleBadge.map((role) => (
                  <span
                    key={role.color}
                    className={`text-xs px-3 py-1 rounded-full font-medium ${role.color} transition-all duration-200 hover:scale-105`}
                  >
                    {role.label}
                  </span>
                ))}
                <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                  <Star className="text-yellow-500 fill-current" size={16} />
                  <span className="text-sm font-medium text-zinc-700">4.8</span>
                  <span className="text-xs text-zinc-500">
                    (127 avaliações)
                  </span>
                </div>
              </div>

              {/* Name Input/Display */}
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    {...register("name", { 
                      required: "Nome é obrigatório",
                      minLength: { value: 2, message: "Nome deve ter pelo menos 2 caracteres" }
                    })}
                    className={`text-3xl md:text-4xl font-bold text-zinc-900 w-full bg-transparent border-b-2 focus:outline-none transition-colors duration-200 ${
                      errors.name ? "border-red-500" : "border-blue-500"
                    }`}
                    placeholder="Seu nome"
                  />
                  {errors.name && (
                    <div className="flex items-center gap-2 text-red-600 text-sm">
                      <AlertCircle size={16} />
                      <span>{errors.name.message}</span>
                    </div>
                  )}
                </div>
              ) : (
                <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-2">
                  {userProfile?.name || "Nome não informado"}
                </h1>
              )}

              {/* Role Description */}
              <p className="text-xl text-zinc-600 mb-4">
                {hasRole(userProfile?.roles, UserRole.Admin)
                  ? "Administrador"
                  : hasRole(userProfile?.roles, UserRole.Seller)
                  ? "Vendedor"
                  : "Usuário"}
              </p>
            </div>

            {/* Action Buttons */}
            {userProfile && (
              <div className="flex gap-3 mb-4">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex gap-2 items-center font-semibold px-6 py-3 text-sm bg-blue-600 text-white rounded-xl transition-all duration-200 hover:bg-blue-700 hover:scale-105 shadow-sm hover:shadow-md"
                    type="button"
                  >
                    <Edit3 size={16} />
                    Editar Perfil
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={!isValid || !isDirty || isLoading}
                      className={`flex gap-2 items-center font-semibold px-6 py-3 text-sm rounded-xl transition-all duration-200 shadow-sm hover:shadow-md ${
                        isValid && isDirty && !isLoading
                          ? "bg-green-600 text-white hover:bg-green-700 hover:scale-105"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {isLoading ? (
                        <Loader2 className="animate-spin" size={16} />
                      ) : (
                        <Check size={16} />
                      )}
                      {isLoading ? "Salvando..." : "Salvar"}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      disabled={isLoading}
                      className="flex gap-2 items-center font-semibold px-6 py-3 text-sm bg-gray-600 text-white rounded-xl transition-all duration-200 hover:bg-gray-700 hover:scale-105 shadow-sm hover:shadow-md disabled:opacity-50"
                    >
                      <X size={16} />
                      Cancelar
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-3 p-3 bg-zinc-50 rounded-xl hover:bg-zinc-100 transition-colors duration-200">
                <Mail className="text-zinc-400" size={16} />
                {isEditing ? (
                  <div className="flex-1 space-y-1">
                    <input
                      type="email"
                      {...register("publicEmail", {
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Email inválido",
                        },
                      })}
                      className="text-zinc-700 bg-transparent border-b border-zinc-300 focus:outline-none focus:border-blue-500 w-full"
                      placeholder="Email público"
                    />
                    {errors.publicEmail && (
                      <div className="flex items-center gap-1 text-red-600 text-xs">
                        <AlertCircle size={12} />
                        <span>{errors.publicEmail.message}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <span className="text-zinc-700">{displayEmail}</span>
                )}
              </div>

              <div className="flex items-center gap-3 p-3 bg-zinc-50 rounded-xl hover:bg-zinc-100 transition-colors duration-200">
                <Phone className="text-zinc-400" size={16} />
                {isEditing ? (
                  <input
                    type="tel"
                    {...register("phone", {
                      pattern: {
                        value: /^[\d\s\-\(\)\+]+$/,
                        message: "Formato de telefone inválido"
                      }
                    })}
                    className="text-zinc-700 bg-transparent border-b border-zinc-300 focus:outline-none focus:border-blue-500 flex-1"
                    placeholder="Telefone"
                  />
                ) : (
                  <span className="text-zinc-700">
                    {userProfile?.phone || "Telefone não informado"}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 p-3 bg-zinc-50 rounded-xl hover:bg-zinc-100 transition-colors duration-200">
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

      {/* Stats Grid */}
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
            Ações Rápidas
            <div className="h-1 w-8 bg-blue-500 rounded-full"></div>
          </h2>
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

        {/* Recent Activity */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
              Atividade Recente
              <div className="h-1 w-8 bg-green-500 rounded-full"></div>
            </h2>
            <button
              onClick={() => setPickedMethod("orders")}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline transition-colors duration-200"
            >
              Ver todas
            </button>
          </div>
          <div className="space-y-4">
            {userProfile?.purchases?.purchasedVariants.length === 0 ? (
              <div className="text-center py-8 text-zinc-500">
                <Package className="mx-auto mb-4 text-zinc-300" size={48} />
                <p>Nenhuma compra recente</p>
                <p className="text-sm">Comece a explorar nossos produtos!</p>
              </div>
            ) : (
              userProfile?.purchases?.purchasedVariants.map((variant, index) => (
                <RecentOrder
                  key={index}
                  id={variant.variant.sku}
                  date={variant.date}
                  status={variant.status}
                  total={variant.price.toString()}
                  items={variant.quantity.toString()}
                  product={variant.variant.sku}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
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
            <button className="bg-white text-zinc-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200 hover:scale-105 shadow-lg">
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