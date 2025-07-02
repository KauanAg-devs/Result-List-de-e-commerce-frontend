"use client";
import { User } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ProductProps } from "@/app/(main)/(home)/types/product";
import { fetchMockedUsers } from "@/app/api/fetch-users";
import Image from "next/image";
import { useProductState } from "../hooks/use-product-state";
import { useIntersectionObserver } from "../hooks/use-intersection-observer";
import { arrayBufferToBase64 } from "@/utils/image-utils";

export default function Product({
  group,
  variant = null,
  lazy = false,
}: ProductProps) {
  const {
    elementRef,
    selectedVariant,
    setSelectedVariant,
    selectedOptions,
    setSelectedOptions,
    isExpanded,
    isImageLoaded,
    setIsImageLoaded,
    isImageLoading,
    setIsImageLoading,
    showTooltip,
    setShowTooltip,
    isAnimating,
    findMatchingVariant,
    handleOptionChange,
    handleExpand,
    handleCollapse,
    handleBackdropClick,
    setIsVisible,
    setIsLoaded,
  } = useProductState({ group, variant, lazy });

  const [startIndex, setStartIndex] = useState<Record<string, number>>({});
  const [imageError, setImageError] = useState(false);
  const VISIBLE_BUTTONS = 2;

  useIntersectionObserver(elementRef, lazy, setIsVisible, setIsLoaded);

  useEffect(() => {
    if (variant) {
      setSelectedVariant(variant);
      setSelectedOptions({ ...variant.options });
    }
  }, [variant, setSelectedVariant, setSelectedOptions]);

  useEffect(() => {
    const match = findMatchingVariant();
    if (match !== selectedVariant) {
      setSelectedVariant(match);
    }
  }, [
    selectedOptions,
    findMatchingVariant,
    selectedVariant,
    setSelectedVariant,
  ]);

  useEffect(() => {
    if (isExpanded) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isExpanded]);

  useEffect(() => {
    setImageError(false);
    setIsImageLoaded(false);
    setIsImageLoading(true);
  }, [selectedVariant?.images?.[0], group.default.images?.[0]]);

  const scrollOptions = (optionLabel: string, direction: "prev" | "next") => {
    const currentStart = startIndex[optionLabel] || 0;
    const totalOptions =
      group.options.find((opt) => opt.label === optionLabel)?.values.length ||
      0;

    let newStart;
    if (direction === "next") {
      newStart = Math.min(currentStart + 1, totalOptions - VISIBLE_BUTTONS);
    } else {
      newStart = Math.max(currentStart - 1, 0);
    }

    setStartIndex((prev) => ({ ...prev, [optionLabel]: newStart }));
  };

  const canScrollPrev = (optionLabel: string) =>
    (startIndex[optionLabel] || 0) > 0;

  const canScrollNext = (optionLabel: string) => {
    const currentStart = startIndex[optionLabel] || 0;
    const totalOptions =
      group.options.find((opt) => opt.label === optionLabel)?.values.length ||
      0;
    return currentStart < totalOptions - VISIBLE_BUTTONS;
  };

  const imageToShow =
    selectedVariant?.images?.[0]?.trim() || group.default.images?.[0]?.trim();

  const isOutOfStock = !selectedVariant?.stock || selectedVariant.stock === 0;
  const owner = fetchMockedUsers.find((user) => user.id === group.ownerId);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
    setIsImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setIsImageLoading(false);
    setIsImageLoaded(false);
    setImageError(true);
  };

  return (
    <>
      <div
        ref={elementRef}
        className={`group bg-white relative overflow-hidden transition-all duration-300 ease-out ${
          isExpanded ? "scale-105 z-20" : "hover:scale-[1.01] hover:z-10"
        } ${isAnimating ? "pointer-events-none" : ""} 
        scale-90 sm:scale-95 md:scale-100 lg:scale-105 xl:scale-110`}
        onClick={handleExpand}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-label={`Ver detalhes de ${variant?.name}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleExpand();
          }
        }}
      >
        <div className="relative bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-500 ease-out cursor-pointer overflow-hidden">
          {isImageLoading && (
            <div className="absolute top-1 right-1 z-10">
              <div className="w-3 h-3 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          )}

          {isOutOfStock && (
            <div className="absolute top-1 left-1 z-10 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-medium">
              Esgotado
            </div>
          )}

          <div className="relative overflow-hidden rounded-t-xl">
            <div className="w-full aspect-[4/3] relative">
              {(isImageLoading || (!isImageLoaded && !imageError)) && (
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-10 h-10 border-3 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                  </div>
                </div>
              )}

              {imageError && (
                <div className="absolute inset-0 bg-gray-100 flex flex-col items-center justify-center text-gray-400">
                  <svg
                    className="w-12 h-12 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-xs font-medium">
                    Imagem não disponível
                  </span>
                </div>
              )}

              {imageToShow && (
                <Image
                  width={1000}
                  height={1000}
                  src={imageToShow}
                  alt={`${variant?.name} - ${Object.values(
                    selectedOptions
                  ).join(", ")}`}
                  className={`absolute inset-0 w-full h-full object-contain transition-all duration-700 ${
                    isImageLoaded ? "opacity-100" : "opacity-0"
                  } ${!isExpanded ? "group-hover:scale-105" : ""} ${
                    isOutOfStock ? "grayscale" : ""
                  }`}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  loading={lazy ? "lazy" : "eager"}
                />
              )}

              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </div>
          </div>

          <div className="p-3">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 mb-1 truncate">
                  {selectedVariant?.name}
                </h3>
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                  SKU: {selectedVariant?.sku ?? "—"}
                </p>
              </div>
              <div className="text-right ml-2">
                <p className="text-lg font-bold text-gray-900">
                  {selectedVariant?.price
                    ? `$${selectedVariant.price.toFixed(2)}`
                    : "--"}
                </p>
                <p
                  className={`text-xs font-medium transition-colors ${
                    selectedVariant?.stock && selectedVariant.stock > 0
                      ? "text-emerald-600"
                      : "text-red-500"
                  }`}
                >
                  {selectedVariant?.stock && selectedVariant.stock > 0
                    ? `In stock (${selectedVariant.stock})`
                    : "Sold out"}
                </p>
              </div>
            </div>

            {group.options.map((opt) => {
              
              return (
                <div className="mb-2" key={opt.label}>
                  <p className="text-xs font-medium text-gray-700 mb-1">
                    {opt.label}:{" "}
                    <span className="capitalize font-semibold">
                      {selectedOptions[opt.label]}
                    </span>
                  </p>

                  <div className="flex items-center justify-between gap-1">
                    <div className="flex items-center gap-1">
                      {opt.values.length > VISIBLE_BUTTONS && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            scrollOptions(opt.label, "prev");
                          }}
                          disabled={!canScrollPrev(opt.label)}
                          className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200 ${
                            canScrollPrev(opt.label)
                              ? "bg-gray-100 hover:bg-gray-200 border border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-800"
                              : "bg-gray-50 border border-gray-200 text-gray-300 cursor-not-allowed"
                          }`}
                          aria-label="Opções anteriores"
                        >
                          <svg
                            className="w-2 h-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 19l-7-7 7-7"
                            />
                          </svg>
                        </button>
                      )}

                      <div className="flex gap-1">
                        {opt.values
                          .slice(
                            opt.values.length > VISIBLE_BUTTONS
                              ? startIndex[opt.label] || 0
                              : 0,
                            opt.values.length > VISIBLE_BUTTONS
                              ? (startIndex[opt.label] || 0) + VISIBLE_BUTTONS
                              : opt.values.length
                          )
                          .map((value, i) => {
                            const actualIndex =
                              opt.values.length > VISIBLE_BUTTONS
                                ? (startIndex[opt.label] || 0) + i
                                : i;
                            const valStr = value.label ?? "";
                            const isSelected =
                              selectedOptions[opt.label] === valStr;

                            return (
                              <div
                                key={actualIndex}
                                className="relative"
                                onMouseEnter={() =>
                                  setShowTooltip(`${opt.label}-${valStr}`)
                                }
                                onMouseLeave={() => setShowTooltip(null)}
                              >
                                <button
                                  title={valStr}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleOptionChange(opt.label, valStr);
                                  }}
                                  disabled={isAnimating}
                                  className={`relative h-6 min-w-6 px-1 rounded text-xs border transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1 ${
                                    isSelected
                                      ? "bg-gray-900 text-white border-gray-900 shadow-sm scale-105"
                                      : "bg-white border-gray-300 text-gray-700 hover:border-gray-900 hover:shadow-sm hover:scale-102"
                                  } ${
                                    isAnimating
                                      ? "opacity-50 cursor-not-allowed"
                                      : ""
                                  }`}
                                  style={
                                    opt.type === "color"
                                      ? {
                                          backgroundColor: value.color,
                                          color: "transparent",
                                          border:
                                            valStr.toLowerCase() === "white"
                                              ? "2px solid #e5e7eb"
                                              : isSelected
                                              ? "2px solid #374151"
                                              : "2px solid transparent",
                                        }
                                      : {}
                                  }
                                >
                                  {opt.type !== "color" && valStr}
                                  {isSelected && opt.type === "color" && (
                                    <div className="absolute inset-0 rounded border-2 border-gray-900"></div>
                                  )}
                                </button>

                                {showTooltip === `${opt.label}-${valStr}` && (
                                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap z-30 pointer-events-none">
                                    {valStr}
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-2 border-transparent border-t-gray-900"></div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                      </div>

                      {opt.values.length > VISIBLE_BUTTONS && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            scrollOptions(opt.label, "next");
                          }}
                          disabled={!canScrollNext(opt.label)}
                          className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200 ${
                            canScrollNext(opt.label)
                              ? "bg-gray-100 hover:bg-gray-200 border border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-800"
                              : "bg-gray-50 border border-gray-200 text-gray-300 cursor-not-allowed"
                          }`}
                          aria-label="Próximas opções"
                        >
                          <svg
                            className="w-2 h-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-1 flex-shrink-0">
                      <p className="whitespace-nowrap text-xs mr-2]">
                        {owner?.name}
                      </p>
                      {owner?.profileImage &&
                      owner.profileImage !== null &&
                      owner.profileImage !== "null" &&
                      owner.profileImage !== "" ? (
                        <Image
                          className="rounded-full h-6 w-6 border border-black p-0.5 flex-shrink-0"
                          src={
                            typeof owner.profileImage === "string"
                              ? owner.profileImage
                              : `data:image/jpeg;base64,${arrayBufferToBase64(
                                  owner.profileImage
                                )}`
                          }
                          width={8}
                          height={8}
                          alt="Profile"
                        />
                      ) : (
                        <User
                          className="text-zinc-400 rounded-full border border-black p-0.5 flex-shrink-0"
                          size={24}
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {(group.specs ?? []).length > 0 && (
              <div className="mt-2 p-2 bg-gray-50 rounded">
                <h4 className="text-xs font-medium text-gray-700 mb-1">
                  Especificações:
                </h4>
                <div className="space-y-0.5 max-h-20 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 pr-1">
                  {group.specs?.map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex justify-between text-xs gap-2"
                    >
                      <span className="font-medium text-gray-600 flex-shrink-0">
                        {label}:
                      </span>
                      <span className="text-gray-900 text-right break-words">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {isExpanded && (
              <div className="mt-3 border-t border-gray-200 pt-2 space-y-2">
                <div className="flex gap-2">
                  <Link
                    href={`/product/${group?.default.sku ?? ""}`}
                    className="flex-1"
                  >
                    <button
                      className={`${
                        !isOutOfStock && "cursor-pointer"
                      } w-full bg-gray-900 text-white py-2 px-3 rounded text-sm font-semibold hover:bg-gray-800 transition-colors focus:outline-none focus:ring-1 focus:ring-gray-500 focus:ring-offset-1`}
                      disabled={isOutOfStock}
                    >
                      {isOutOfStock ? "Produto Esgotado" : "Ver Detalhes"}
                    </button>
                  </Link>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCollapse();
                    }}
                    className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors focus:outline-none focus:ring-1 focus:ring-gray-500 focus:ring-offset-1 flex-shrink-0 text-sm"
                    aria-label="Fechar detalhes"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-10 transition-opacity duration-300"
          onClick={handleBackdropClick}
          role="button"
          tabIndex={0}
          aria-label="Fechar detalhes do produto"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              handleCollapse();
            }
          }}
        />
      )}
    </>
  );
}
