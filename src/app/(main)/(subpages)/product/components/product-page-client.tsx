"use client";

import { ToastContainer } from "react-toastify";
import { useProductPage } from "@product/hooks/use-product";
import {
  LoaderCircle,
  User,
  Heart,
  Share2,
  ShoppingCart,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Star,
  Shield,
  Truck,
  RotateCcw,
} from "lucide-react";
import Image from "next/image";
import { PageProps } from "@product/types/page";
import { arrayBufferToBase64 } from "@/utils/image-utils";
import { useState, useEffect } from "react";
import { UserProfile } from "@/types/user-profile";
import axios from "axios";

export default function ProductPageClient({ sku }: PageProps["params"]) {
  const {
    handleBuyNow,
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

  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const [owner, setOwner] = useState<UserProfile | null>(null);

  const getAvailableImages = () => {
    if (variant && Array.isArray(variant.images) && variant.images.length > 0) {
      return variant.images;
    }

    if (
      product &&
      product.default &&
      Array.isArray(product.default.images) &&
      product.default.images.length > 0
    ) {
      return product.default.images;
    }

    return [];
  };
  
  const getCurrentDisplayImage = () => {
    const availableImages = getAvailableImages();
    if (availableImages!.length === 0) return null;

    const safeIndex = Math.max(
      0,
      Math.min(currentImageIndex, availableImages!.length - 1)
    );
    return availableImages![safeIndex];
  };

  const hasMultipleImages = () => {
    return getAvailableImages().length > 1;
  };

  const nextImage = () => {
    const availableImages = getAvailableImages();
    if (availableImages.length <= 1) return;

    setCurrentImageIndex((prev) => {
      const newIndex = (prev + 1) % availableImages.length;
      return newIndex;
    });
  };

  const prevImage = () => {
    const availableImages = getAvailableImages();
    if (availableImages.length <= 1) return;

    setCurrentImageIndex((prev) => {
      const newIndex = prev === 0 ? availableImages.length - 1 : prev - 1;
      return newIndex;
    });
  };

  const selectImage = (index: number) => {
    const availableImages = getAvailableImages();
    if (index >= 0 && index < availableImages.length) {
      setCurrentImageIndex(index);
    }
  };

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [product?.default.sku, variant?.sku]);

  useEffect(() => {
    if (selectedImage !== undefined && selectedImage !== currentImageIndex) {
      setCurrentImageIndex(selectedImage);
    }
  }, [selectedImage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        e.stopPropagation();
        prevImage();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        e.stopPropagation();
        nextImage();
      } else if (e.key === "Escape" && isFullscreenOpen) {
        setIsFullscreenOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreenOpen]);

  useEffect(() => {
    if (product?.ownerId) {
      const fetchOwner = async () => {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URI}/users/findById/`,
            { id: product.ownerId }
          );
          setOwner(response.data);
        } catch (error) {
          console.error("Erro ao carregar dono do produto:", error);
          setOwner(null);
        }
      };

      fetchOwner();
    }
  }, [product?.ownerId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="flex flex-col items-center gap-4">
          <LoaderCircle className="animate-spin h-12 w-12 text-gray-600" />
          <p className="text-gray-600 text-base sm:text-lg text-center">
            Carregando produto...
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-md">
          <div className="text-4xl sm:text-6xl mb-4">😕</div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Produto não encontrado
          </h2>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            O produto que você está procurando não existe ou foi removido.
          </p>
          <button className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors w-full sm:w-auto">
            Voltar à loja
          </button>
        </div>
      </div>
    );
  }

  const openFullscreen = () => {
    setIsFullscreenOpen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreenOpen(false);
  };

  const displayImage = getCurrentDisplayImage();
  const availableImages = getAvailableImages();
  const multipleImages = hasMultipleImages();

  let avaliationMedia = 0;

  if (variant?.avaliations) {
    avaliationMedia =
      variant!.avaliations!.reduce(
        (acc, avaliation) => acc + avaliation.star,
        0
      ) / variant!.avaliations!.length;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {isFullscreenOpen && displayImage && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-60 p-2"
          >
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="relative max-w-4xl max-h-full">
            <img
              src={displayImage}
              alt={variant?.name}
              className="max-w-full max-h-full object-contain"
            />

            {multipleImages && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 sm:p-3 rounded-full transition-all"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 sm:p-3 rounded-full transition-all"
                >
                  <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </button>
              </>
            )}

            {multipleImages && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-xs sm:text-sm">
                {currentImageIndex + 1} / {availableImages.length}
                {variant && (
                  <span className="ml-2 text-blue-300 hidden sm:inline">
                    ({Object.values(variant.options).join(", ")})
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          <div className="space-y-4">
            <div className="relative group">
              {isOutOfStock && (
                <div className="absolute inset-0 bg-black bg-opacity-60 z-20 flex items-center justify-center rounded-xl">
                  <div className="bg-red-600 text-white px-4 sm:px-8 py-2 sm:py-4 rounded-xl font-bold text-sm sm:text-xl shadow-lg text-center">
                    PRODUTO ESGOTADO
                  </div>
                </div>
              )}

              <div
                className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
                onClick={openFullscreen}
              >
                {displayImage ? (
                  <img
                    src={displayImage}
                    alt={variant?.name}
                    className={`w-full aspect-square object-cover transition-all duration-300 ${
                      isOutOfStock
                        ? "filter grayscale"
                        : "group-hover:scale-105"
                    }`}
                  />
                ) : (
                  <div className="w-full aspect-square bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 text-sm sm:text-base">
                      Sem imagem disponível
                    </span>
                  </div>
                )}

                {displayImage && (
                  <div className="absolute top-4 right-4 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      />
                    </svg>
                  </div>
                )}

                {multipleImages && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                      }}
                      className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 sm:p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 sm:p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </>
                )}

                {variant?.images && (
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-medium">
                    <span className="hidden sm:inline">
                      {Object.values(variant.options).join(", ")}
                    </span>
                    <span className="sm:hidden">Variante</span>
                  </div>
                )}
              </div>
            </div>

            {multipleImages && (
              <div className="flex justify-center gap-2">
                {availableImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => selectImage(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentImageIndex === idx
                        ? "bg-gray-900"
                        : "bg-gray-300 hover:bg-gray-500"
                    }`}
                  />
                ))}
              </div>
            )}

            {multipleImages && (
              <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2">
                {availableImages.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => selectImage(idx)}
                    className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      currentImageIndex === idx
                        ? "border-gray-900 shadow-lg"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${variant?.name} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {variant!.images.length > 0 && variant!.stock > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <p className="text-xs sm:text-sm text-blue-800 font-medium">
                    Mostrando imagem{availableImages.length > 1 ? "s" : ""} da
                    variante: {Object.values(variant?.options!).join(", ")}
                  </p>
                </div>
                {availableImages.length > 1 && (
                  <p className="text-xs text-blue-600 mt-1">
                    Use as setas ou clique nas miniaturas para navegar
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="space-y-4 sm:space-y-6">
            <ToastContainer
              position="top-right"
              autoClose={3000}
              className="mt-16 !text-sm"
            />

            <div>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-3">
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                    {variant?.name}
                    {variant && (
                      <span className="text-gray-600 font-normal block sm:inline">
                        {" - " + Object.values(variant.options).join(", ")}
                      </span>
                    )}
                  </h1>
                  <p className="text-gray-500 mt-2 text-sm">
                    SKU: {variant?.sku}
                  </p>
                </div>

                <div className="flex gap-2 justify-end sm:ml-4">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`p-2 sm:p-3 rounded-full border transition-all ${
                      isFavorite
                        ? "bg-red-50 border-red-200 text-red-600"
                        : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${
                        isFavorite ? "fill-current" : ""
                      }`}
                    />
                  </button>
                  <button className="p-2 sm:p-3 rounded-full border bg-white border-gray-200 text-gray-600 hover:border-gray-300 transition-all">
                    <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {...Array.from({ length: avaliationMedia }, (_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">
                    ({avaliationMedia})
                  </span>
                </div>
                <span className="text-sm text-gray-400 hidden sm:inline">
                  •
                </span>
                <span className="text-sm text-gray-600">
                  {variant?.avaliations?.length ?? 0} avaliações
                </span>
              </div>
            </div>

            <div className="bg-white rounded-lg p-3 sm:p-4 border">
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full ${
                    isOutOfStock
                      ? "bg-red-500"
                      : isLowStock
                      ? "bg-orange-500"
                      : "bg-green-500"
                  }`}
                />
                <span
                  className={`font-medium text-sm sm:text-base ${
                    isOutOfStock
                      ? "text-red-700"
                      : isLowStock
                      ? "text-orange-700"
                      : "text-green-700"
                  }`}
                >
                  {isOutOfStock
                    ? "Produto esgotado"
                    : isLowStock
                    ? `Apenas ${stock} unidades restantes`
                    : "Em estoque"}
                </span>
              </div>
              {isLowStock && !isOutOfStock && (
                <p className="text-xs sm:text-sm text-orange-600 mt-1">
                  ⚡ Estoque baixo - garante já o seu!
                </p>
              )}
            </div>

            <div className="bg-white rounded-lg p-4 sm:p-6 border">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
                <span
                  className={`text-3xl sm:text-4xl font-bold ${
                    isOutOfStock ? "text-gray-500" : "text-gray-900"
                  }`}
                >
                  R${" "}
                  {variant?.discount
                    ? (price * (variant?.discount! / 100)).toFixed(2)
                    : variant?.price}
                </span>
                <div className="flex items-center gap-2 sm:gap-4">
                  {variant?.discount && (
                    <span className="text-base sm:text-lg text-gray-500 line-through">
                      R$ {price.toFixed(2)}
                    </span>
                  )}

                  {variant?.discount && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs sm:text-sm font-medium">
                      {variant.discount}% OFF
                    </span>
                  )}
                </div>
              </div>
              {/*<p className="text-xs sm:text-sm text-gray-600 mt-2">
                ou 12x de R$ {(parseFloat(price) / variant?.discount).toFixed(2)} sem juros
              </p>*/}
            </div>

            {product.options?.map((opt, i) => (
              <div key={i} className="bg-white rounded-lg p-3 sm:p-4 border">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
                  {opt.label}
                </h3>
                <div className="flex gap-2 sm:gap-3 flex-wrap">
                  {opt.values.map((val, idx) => {
                    const value = "color" in val ? val.label : String(val);
                    const colorValue = "color" in val ? val.color : undefined;
                    const isSelected = selectedOptions[opt.label] === value;

                    return (
                      <button
                        key={idx}
                        onClick={() => handleOptionChange(opt.label, value!)}
                        className={`relative transition-all duration-200 ${
                          opt.type === "color"
                            ? "w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2"
                            : "px-3 py-2 sm:px-4 sm:py-3 rounded-lg text-xs sm:text-sm font-medium border-2"
                        } ${
                          isSelected
                            ? opt.type === "color"
                              ? "border-gray-900 shadow-lg"
                              : "bg-gray-900 text-white border-gray-900"
                            : opt.type === "color"
                            ? "border-gray-300 hover:border-gray-500"
                            : "bg-white border-gray-300 text-gray-700 hover:border-gray-900 hover:shadow-md"
                        }`}
                        style={
                          opt.type === "color" && colorValue
                            ? {
                                backgroundColor: colorValue,
                                border:
                                  colorValue === "#FFFFFF"
                                    ? "2px solid #ccc"
                                    : undefined,
                              }
                            : {}
                        }
                      >
                        {opt.type !== "color" && value}
                        {isSelected && opt.type === "color" && (
                          <div className="absolute inset-0 rounded-full border-2 border-gray-900 border-offset-2" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {stock > 0 && (
              <div className="bg-white rounded-lg p-3 sm:p-4 border">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
                  Quantidade
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded-l-lg transition-colors"
                    >
                      −
                    </button>
                    <span className="w-12 sm:w-16 h-10 sm:h-12 flex items-center justify-center text-base sm:text-lg font-semibold border-x border-gray-300">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(stock, quantity + 1))}
                      className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded-r-lg transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-gray-600 text-sm sm:text-base">
                    {stock} disponíve{stock > 1 ? "is" : "l"}
                  </span>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={
                  isOutOfStock ||
                  Object.keys(selectedOptions).length <
                    (product.options?.length || 0)
                }
                className="w-full bg-gray-900 text-white py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
              >
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">
                  {isOutOfStock
                    ? "Produto Indisponível"
                    : "Adicionar ao Carrinho"}
                </span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={
                  isOutOfStock ||
                  Object.keys(selectedOptions).length <
                    (product.options?.length || 0)
                }
                className="w-full bg-white text-gray-900 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg border-2 border-gray-900 hover:bg-gray-50 transition-all duration-200"
              >
                Comprar Agora
              </button>
            </div>

            <div className="bg-white rounded-lg p-4 sm:p-6 border">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  {owner?.profileImage &&
                  owner.profileImage !== null &&
                  owner.profileImage !== "null" &&
                  owner.profileImage !== "" ? (
                    <Image
                      className="rounded-full h-10 w-10 sm:h-12 sm:w-12 border-2 border-gray-200"
                      src={
                        typeof owner.profileImage === "string"
                          ? owner.profileImage
                          : `data:image/jpeg;base64,${arrayBufferToBase64(
                              owner.profileImage
                            )}`
                      }
                      width={48}
                      height={48}
                      alt="Profile"
                    />
                  ) : (
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">
                      {owner?.name}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Vendedor verificado
                    </p>
                  </div>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors flex items-center justify-center gap-2 w-full sm:w-auto">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm sm:text-base">Conversar</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 sm:p-6 border">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                Garantias e Benefícios
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">
                    Garantia de 12 meses
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">
                    Frete grátis para sua região
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">
                    7 dias para trocas e devoluções
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {product.specs && product.specs.length > 0 && (
          <div className="mt-8 sm:mt-12 bg-white rounded-lg p-4 sm:p-6 border">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
              Especificações Técnicas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {product.specs.map((spec, idx) => (
                <div
                  key={idx}
                  className={`p-3 sm:p-4 bg-gray-50 rounded-lg border-l-4 border-gray-900 ${
                    isOutOfStock ? "opacity-75" : ""
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2">
                    <span className="font-semibold text-gray-900 text-sm sm:text-base">
                      {spec.label}
                    </span>
                    <span className="text-gray-700 text-sm sm:text-base">
                      {spec.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
