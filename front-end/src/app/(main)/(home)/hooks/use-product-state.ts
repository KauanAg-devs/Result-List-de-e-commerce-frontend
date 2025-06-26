import { useState, useEffect, useRef, useCallback } from "react";
import { ProductVariant } from "@/types/product";
import { ProductProps } from "@/app/(main)/(home)/types/product";

export const useProductState = ({ group, variant, lazy }: ProductProps) => {
  const [isVisible, setIsVisible] = useState(!lazy);
  const [isLoaded, setIsLoaded] = useState(!lazy);
  const elementRef = useRef<HTMLDivElement>(null);

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    variant || group.variants[0] || null
  );

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    if (!selectedVariant) return {};
    return { ...selectedVariant.options };
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const findMatchingVariant = useCallback(() => {
    return (
      group.variants.find((v) =>
        Object.entries(selectedOptions).every(
          ([key, val]) => v.options[key] === val
        )
      ) || null
    );
  }, [selectedOptions, group.variants]);

  const handleOptionChange = useCallback(
    (optionLabel: string, value: string) => {
      setIsAnimating(true);
      setIsImageLoading(true);
      setIsImageLoaded(false);
      setSelectedOptions((prev) => ({ ...prev, [optionLabel]: value }));
      setTimeout(() => setIsAnimating(false), 200);
    },
    []
  );

  const handleExpand = useCallback(() => {
    if (!isAnimating) {
      setIsExpanded(true);
    }
  }, [isAnimating]);

  const handleCollapse = useCallback(() => {
    setIsExpanded(false);
  }, []);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        setIsExpanded(false);
      }
    },
    []
  );

  return {
    isVisible,
    isLoaded,
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
  };
};