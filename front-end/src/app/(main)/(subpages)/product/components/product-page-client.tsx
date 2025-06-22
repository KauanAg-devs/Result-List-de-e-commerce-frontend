"use client";

import { ToastContainer } from "react-toastify";
import { useProductPage } from "@product/hooks/use-product";
import { LoaderCircle } from "lucide-react";
import { PageProps } from "@product/types/page";

export default function ProductPageClient({ sku }: PageProps['params']) {
  const {
    handleAddToCart,
    handleOptionChange,
    isLoading,
    product,
    quantity,
    selectedImage,
    selectedOptions,
    setQuantity,
    variant,
    isLowStock,
    isOutOfStock,
    price,
    stock,
  } = useProductPage(sku);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoaderCircle className="animate-spin h-8 w-8 text-gray-500" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-red-600">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="relative">
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center rounded-lg">
              <div className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold text-lg">
                OUT OF STOCK
              </div>
            </div>
          )}
          <img
            src={variant?.image || product.images[selectedImage]}
            alt={product.name}
            className={`w-full aspect-square object-cover rounded-lg shadow transition-all ${
              isOutOfStock ? "filter grayscale" : ""
            }`}
          />
        </div>

        <div>
          <ToastContainer position="top-right" autoClose={3000} />

          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {product.name}
            {variant && ` - ${Object.values(variant.options).join(", ")}`}
          </h1>

          <p className="text-sm text-gray-500 mb-4">SKU: {variant?.sku}</p>

          <div className="mb-4">
            <div
              className={`flex items-center gap-2 text-sm font-medium ${
                isOutOfStock
                  ? "text-red-600"
                  : isLowStock
                  ? "text-orange-600"
                  : "text-green-600"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  isOutOfStock
                    ? "bg-red-600"
                    : isLowStock
                    ? "bg-orange-600"
                    : "bg-green-600"
                }`}
              />
              {isOutOfStock
                ? "Product out of stock"
                : isLowStock
                ? `Only ${stock} units left`
                : "In stock"}
            </div>
          </div>

          <p
            className={`text-3xl font-semibold mb-6 ${
              isOutOfStock ? "text-gray-500" : "text-gray-900"
            }`}
          >
            R$ {price}
          </p>

          {product.options?.map((opt, i) => (
            <div key={i} className="mb-6">
              <h3 className="text-md font-medium text-gray-700 mb-2">
                {opt.label}
              </h3>
              <div className="flex gap-2 flex-wrap">
                {opt.values.map((val, idx) => {
                  const value = "color" in val ? val.label : String(val);
                  const colorValue = "color" in val ? val.color : undefined;
                  const isSelected = selectedOptions[opt.label] === value;

                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionChange(opt.label, value!)}
                      className={`px-4 py-2 rounded-lg text-sm border transition-all ${
                        isSelected
                          ? "bg-gray-900 text-white"
                          : "bg-white border-gray-300 text-gray-700 hover:border-gray-900"
                      }`}
                      style={
                        opt.type === "color" && colorValue
                          ? {
                              backgroundColor: colorValue,
                              color: "transparent",
                              border:
                                colorValue === "#FFFFFF"
                                  ? "1px solid #ccc"
                                  : undefined,
                              width: "2rem",
                              height: "2rem",
                              padding: 0,
                              borderRadius: "9999px",
                            }
                          : {}
                      }
                    >
                      {opt.type !== "color" && value}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {stock > 0 && (
            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-700 mb-2">
                Quantity
              </h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 text-zinc-700 border border-zinc-700 rounded flex items-center justify-center hover:bg-gray-100"
                >
                  −
                </button>
                <span className="text-lg text-zinc-700 min-w-[2rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(stock, quantity + 1))}
                  className="w-8 h-8 text-zinc-700 border border-zinc-700 rounded flex items-center justify-center hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
          )}

          <button
            onClick={handleAddToCart}
            disabled={
              isOutOfStock ||
              Object.keys(selectedOptions).length <
                (product.options?.length || 0)
            }
            className="w-full bg-gray-900 text-white py-4 rounded-lg font-medium hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isOutOfStock ? "Product Unavailable" : "Add to cart"}
          </button>

          {product.specs && product.specs.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Specifications
              </h3>
              <ul className="grid grid-cols-2 gap-4">
                {product.specs.map((spec, idx) => (
                  <li
                    key={idx}
                    className={`bg-white p-4 rounded border text-sm ${
                      isOutOfStock
                        ? "text-gray-500 opacity-75"
                        : "text-gray-700"
                    }`}
                  >
                    <strong>{spec.label}:</strong> {spec.value}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
