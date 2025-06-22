import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

type OrderResumeProps = {
  total: number 
  tax: number 
  subtotal: number 
  shipping: number
}

export default function OrderResume({total, tax, subtotal, shipping}: OrderResumeProps) {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 h-fit">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Resumo do Pedido
      </h2>

      <div className="space-y-4 mb-6">
        {cartItems.map((item) => (
          <div key={item.sku} className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{item.name}</h3>
              <p className="text-sm text-gray-500">SKU: {item.sku}</p>
              {item.options &&
                Object.entries(item.options).map(([key, value]) => (
                  <p key={key} className="text-sm text-gray-500">
                    {key}: {value}
                  </p>
                ))}
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-900">
                R$ {(item.price * item.quantity).toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">
                R$ {item.price.toFixed(2)} cada
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>R$ {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Entrega</span>
          <span>{shipping === 0 ? "Grátis" : `R$ ${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Impostos</span>
          <span>R$ {tax.toFixed(2)}</span>
        </div>
        <div className="border-t pt-2 flex justify-between text-lg font-semibold text-gray-900">
          <span>Total</span>
          <span>R$ {total.toFixed(2)}</span>
        </div>
      </div>

      {subtotal < 100 && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <span className="font-medium">Frete grátis</span> para compras acima
            de R$ 100,00
          </p>
          <p className="text-sm text-blue-600">
            Adicione mais R$ {(100 - subtotal).toFixed(2)} para ganhar frete!
          </p>
        </div>
      )}

      {subtotal >= 100 && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800 font-medium">
            🎉 Você ganhou frete grátis!
          </p>
        </div>
      )}

      <div className="mt-6 space-y-3">
        <div className="flex items-center text-sm text-gray-600">
          <svg
            className="w-5 h-5 text-green-500 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Política de devolução em 30 dias
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <svg
            className="w-5 h-5 text-green-500 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          Checkout seguro
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <svg
            className="w-5 h-5 text-green-500 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          Entrega rápida
        </div>
      </div>
    </div>
  );
}
