import { User, Package, MapPin, CreditCard, Bell, Settings, MessageSquare } from "lucide-react";
import { NavigationProps } from "../types/navigation";
import SectionButton from "./section-button";


export const DesktopNavigation = ({ pickedMethod = 'overview', setPickedMethod = () => {} }: NavigationProps) => {
  const sections = [
    { message: "Visão Geral", option: "overview", icon: User },
    { message: "Meus Pedidos", option: "orders", icon: Package },
    { message: "Endereços", option: "addresses", icon: MapPin },
    { message: "Pagamento", option: "paymentMethods", icon: CreditCard },
    { message: "Notificações", option: "notifications", icon: Bell },
    { message: "Configurações", option: "settings", icon: Settings },
    { message: "Chat com IA", option: "chatWithAI", icon: MessageSquare },
  ];

  return (
    <div className="hidden md:block mb-8">
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex flex-wrap gap-3">
          {sections.map((section) => (
            <SectionButton
              key={section.option}
              message={section.message}
              option={section.option}
              icon={section.icon}
              pickedMethod={pickedMethod}
              setPickedMethod={setPickedMethod}
            />
          ))}
        </div>
      </div>
    </div>
  );
};