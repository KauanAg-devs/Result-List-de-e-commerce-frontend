import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

type OrderResumeProps = {
  total: number 
  tax: number 
  subtotal: number 
  shipping: number
}

export default function OrderResume({total, tax, subtotal, shipping}: OrderResumeProps) {
  const checkoutState = useSelector((state: RootState) => state.checkout);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const { comeFrom, selectedProduct } = checkoutState;
  const isFromProduct = comeFrom === "product";

  const hasValidSelectedProduct = selectedProduct && 
    typeof selectedProduct === 'object' &&
    selectedProduct.name && 
    selectedProduct.price !== undefined && 
    selectedProduct.price !== null;

  const displayItems = (() => {
    if (isFromProduct && hasValidSelectedProduct) {
      return [{
        ...selectedProduct,
        quantity: selectedProduct.quantity,
        id: selectedProduct.id || selectedProduct.sku || `product-${Date.now()}`,
        sku: selectedProduct.sku || selectedProduct.id || 'N/A',
        image: selectedProduct.image || '/placeholder-product.svg',
        name: selectedProduct.name,
        price: selectedProduct.price,
      }];
    }

    return cartItems.filter(item => 
      item && 
      typeof item === 'object' &&
      item.name && 
      item.price !== undefined && 
      item.price !== null
    );
  })();
 
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 h-fit">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Resumo do Pedido
        </h2>
        <div className="mt-2">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            isFromProduct 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-green-100 text-green-800'
          }`}>
            {isFromProduct ? '🛍️ Compra Direta' : '🛒 Do Carrinho'}
          </span>
        </div>
      </div>

     

      <div className="space-y-4 mb-6">
        {displayItems.length > 0 ? (
          displayItems.map((item, index) => {
            const itemKey = item.sku || item.id || `item-${index}`;
            const itemQuantity = item.quantity;
            const itemPrice = item.price || 0;
            const itemTotal = itemPrice * itemQuantity;

            return (
              <div key={itemKey} className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={(isFromProduct ? (item.images?.[0] ?? item.image) : item.image) || '/placeholder-product.svg'}
                    alt={item.name || 'Produto'}
                    className="w-16 h-16 object-cover rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder-product.svg';
                    }}
                  />
                  <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                    {itemQuantity}
                  </span>
                </div>

                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">
                    {item.name || 'Nome não disponível'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    SKU: {item.sku || 'N/A'}
                  </p>

                  {item.options && typeof item.options === 'object' &&
                    Object.entries(item.options).map(([key, value]) => (
                      <p key={key} className="text-sm text-gray-500">
                        {key}: {String(value) || 'N/A'}
                      </p>
                    ))}

                  {isFromProduct && (
                    <p className="text-xs text-blue-600 font-medium">
                      Compra direta
                    </p>
                  )}
                </div>

                <div className="text-right">
                  <p className="font-medium text-gray-900">
                    R$ {itemTotal.toFixed(2)}
                  </p>
                  {itemQuantity > 1 && (
                    <p className="text-sm text-gray-500">
                      R$ {itemPrice.toFixed(2)} cada
                    </p>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 text-gray-500">
            <div className="mb-2">
              <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <p className="text-lg font-medium">Nenhum item encontrado</p>
            {isFromProduct && !hasValidSelectedProduct && (
              <p className="text-sm text-red-500 mt-2">
                Produto selecionado inválido ou não encontrado
              </p>
            )}
            {!isFromProduct && cartItems.length === 0 && (
              <p className="text-sm text-gray-400 mt-2">
                Seu carrinho está vazio
              </p>
            )}
          </div>
        )}
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

      {subtotal < 100 && subtotal > 0 && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <span className="font-medium">Frete grátis</span> para compras acima de R$ 100,00
          </p>
          <p className="text-sm text-blue-600">
            Adicione mais R$ {(100 - subtotal).toFixed(2)} para ganhar frete grátis!
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
          <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Política de devolução em 30 dias
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Checkout seguro
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          {isFromProduct ? 'Entrega individual' : 'Entrega rápida'}
        </div>
      </div>
    </div>
  );
}