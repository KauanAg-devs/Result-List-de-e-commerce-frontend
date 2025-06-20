'use client';

import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { Trash2, Plus, Minus, ShoppingBag, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useCartDrawer } from "@/app/(main)/contexts/cart-drawer-context";
import { removeFromCart } from "@/app/store/cart-slice";
import Link from "next/link";

export default function ShoppingCart() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch()
  const [isAnimating, setIsAnimating] = useState<string | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const { closeCart } = useCartDrawer();

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleQuantityChange = (sku: string, newQuantity: number) => {
    setIsAnimating(sku);
    setTimeout(() => setIsAnimating(null), 300);
  };

  const handleRemoveItem = (sku: string) => {
    dispatch(removeFromCart(sku));
    setIsAnimating(sku);
    setTimeout(() => setIsAnimating(null), 300);
  };

  useEffect(() => {
    const escHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", escHandler);
    return () => document.removeEventListener("keydown", escHandler);
  }, [closeCart]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        closeCart();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeCart]);

  return (
    <>
      <div className="fixed inset-0 bg-opacity-30 z-40" style={{ pointerEvents: "none" }} />

      <div
        ref={drawerRef}
        className="fixed top-0 right-0 w-full max-w-xl h-full bg-white shadow-2xl z-50 transform transition-transform duration-300 translate-x-0"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Your Cart</h2>
          <button
            onClick={closeCart}
            className="text-gray-400 hover:text-gray-600 transition"
            aria-label="Close cart"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100%-5rem)] p-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-24 h-24 mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-lg font-semibold text-gray-700">Your cart is empty</h2>
              <p className="text-gray-500 mt-1">Add some items to get started</p>
              <button
                onClick={closeCart}
                className="mt-6 bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {cartItems.map((item) => (
                <div
                  key={item.sku}
                  className={`p-4 border-b transition-all duration-300 ${
                    isAnimating === item.sku ? "opacity-50 scale-95" : "opacity-100 scale-100"
                  }`}
                >
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <ShoppingBag className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                          <p className="text-xs text-gray-500">SKU: {item.sku}</p>
                          {Object.entries(item.options).map(([key, value]) => (
                            <div key={key} className="text-xs text-gray-500">
                              {key}: <span className="capitalize">{value}</span>
                            </div>
                          ))}
                        </div>

                        <button
                          onClick={() => handleRemoveItem(item.sku)}
                          className="text-gray-400 hover:text-red-500 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() =>
                              handleQuantityChange(item.sku, Math.max(1, item.quantity - 1))
                            }
                            className="p-1 bg-gray-100 rounded-full hover:bg-gray-200"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-sm px-2">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.sku, item.quantity + 1)}
                            className="p-1 bg-gray-100 rounded-full hover:bg-gray-200"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <p className="text-sm font-bold text-gray-800">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-6 space-y-2 border-t pt-4 flex flex-col">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-md font-semibold text-gray-800">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <Link href={'/checkout'} className="text-center font-bold w-full bg-black text-white py-3 mt-4 rounded-xl hover:bg-gray-800 transition">
                  Checkout
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
