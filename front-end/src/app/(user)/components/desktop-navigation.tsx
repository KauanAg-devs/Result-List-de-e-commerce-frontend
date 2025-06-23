import { SectionButton } from "./section-button";
import {
  User,
  Package,
  MapPin,
  CreditCard,
  Bell,
  Settings,
  MessageSquare,
} from "lucide-react";

export const DesktopNavigation = ({ pickedMethod, setPickedMethod }) => {
  return (
    <div className="bg-[url(/navigation.svg)] backdrop-blur-2xl hidden md:block bg-white border border-zinc-200 rounded-2xl p-6 mb-8 shadow-sm">
      <div className="absolute backdrop-blur-3xl inset-0 -z-10"/>
      <div className="flex flex-wrap gap-4">
        <SectionButton
          message="Visão Geral"
          option="overview"
          icon={User}
          pickedMethod={pickedMethod}
          setPickedMethod={setPickedMethod}
        />
        <SectionButton
          message="Meus Pedidos"
          option="orders"
          icon={Package}
          pickedMethod={pickedMethod}
          setPickedMethod={setPickedMethod}
        />
        <SectionButton
          message="Endereços"
          option="addresses"
          icon={MapPin}
          pickedMethod={pickedMethod}
          setPickedMethod={setPickedMethod}
        />
        <SectionButton
          message="Pagamento"
          option="paymentMethods"
          icon={CreditCard}
          pickedMethod={pickedMethod}
          setPickedMethod={setPickedMethod}
        />
        <SectionButton
          message="Notificações"
          option="notifications"
          icon={Bell}
          pickedMethod={pickedMethod}
          setPickedMethod={setPickedMethod}
        />
        <SectionButton
          message="Configurações"
          option="settings"
          icon={Settings}
          pickedMethod={pickedMethod}
          setPickedMethod={setPickedMethod}
        />
        <SectionButton
          message="Chat com IA"
          option="chatWithAI"
          icon={MessageSquare}
          pickedMethod={pickedMethod}
          setPickedMethod={setPickedMethod}
        />
      </div>
    </div>
  );
};
