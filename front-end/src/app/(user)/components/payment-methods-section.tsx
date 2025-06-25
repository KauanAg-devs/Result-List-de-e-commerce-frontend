import { Plus } from "lucide-react";
import { PaymentMethodCard } from "./payment-method-card";  

export const PaymentMethodsSection = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-zinc-900">
        Métodos de Pagamento
      </h2>
      <button className="flex items-center gap-2 px-4 py-2 bg-zinc-600 text-white rounded-lg hover:bg-zinc-700">
        <Plus size={16} />
        Adicionar Cartão
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <PaymentMethodCard
        type="Visa"
        number="1234"
        expiry="12/28"
        isDefault={true}
      />
      <PaymentMethodCard
        type="Mastercard"
        number="5678"
        expiry="09/27"
        isDefault={false}
      />
    </div>
  </div>
);