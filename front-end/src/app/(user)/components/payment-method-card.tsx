import { CreditCard } from "lucide-react"
import { PaymentMethodCartProps } from "../types/payment-method-cart";

export const PaymentMethodCard = ({ type, number, expiry, isDefault }: PaymentMethodCartProps) => (
  <div className="bg-gradient-to-r from-gray-900 to-gray-700 rounded-2xl p-6 text-white relative overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16"></div>
    <div className="flex justify-between items-start mb-6">
      <div>
        <p className="text-sm opacity-75 mb-1">{type}</p>
        <p className="text-lg font-mono">•••• •••• •••• {number}</p>
      </div>
      {isDefault && (
        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
          Principal
        </span>
      )}
    </div>
    <div className="flex justify-between items-end">
      <div>
        <p className="text-xs opacity-75">Válido até</p>
        <p className="font-mono">{expiry}</p>
      </div>
      <CreditCard size={32} className="opacity-75" />
    </div>
  </div>
);
