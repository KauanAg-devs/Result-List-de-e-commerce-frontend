"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/app/store";
import { addToCartWithValidation, CartItem } from "@/app/store/cart-slice";
import { setBuyNowProduct } from "@/app/store/checkout-slice";
import { useAuth } from "@/app/contexts/auth-context";
import { useCartDrawer } from "@/app/contexts/cart-drawer-context";
import { ProductGrouped } from "@/types/product";

function findVariant(
  product: ProductGrouped,
  selectedOptions: Record<string, string>
) {
  return product.variants.find((variant) =>
    Object.entries(selectedOptions).every(
      ([key, value]) => variant.options[key] === value
    )
  );
}

export function useProductPage(sku: string) {
  const { isAuthenticated } = useAuth();
  const userProfile = useSelector((state: RootState) => state.userProfile.userProfile);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { openCart } = useCartDrawer();

  const [product, setProduct] = useState<ProductGrouped | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!sku) return;

    const loadProduct = async () => {
      setIsLoading(true);
      setProduct(null);
      setSelectedOptions({});
      setSelectedImage(0);
      setQuantity(1);

      try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/products/findVariantBySKU`, {
          sku
        });
        const productData: ProductGrouped = res.data.product;

        setProduct(productData);

        const variant = productData.variants.find((v) => v.sku === sku) || productData.variants[0];

        const initialOptions: Record<string, string> = {};
        Object.entries(variant.options).forEach(([key, value]) => {
          initialOptions[key] = value;
        });
        setSelectedOptions(initialOptions);

        const imgIndex = productData.default.images.findIndex(
          (img) => img === variant.images[0]
        );
        setSelectedImage(imgIndex !== -1 ? imgIndex : 0);

      } catch (error) {
        console.error("Erro ao carregar produto:", error);
        setProduct(null);
      }

      setIsLoading(false);
    };

    loadProduct();
  }, [sku]);

  const variant = product ? findVariant(product, selectedOptions) : null;
  const stock = variant?.stock ?? 0;
  const price = variant?.price ?? 0;
  const isOutOfStock = stock === 0;
  const isLowStock = stock > 0 && stock <= 5;

  const handleOptionChange = (label: string, value: string) => {
    setSelectedOptions((prev) => {
      const updated = { ...prev, [label]: value };

      if (product) {
        const foundVariant = findVariant(product, updated);
        if (foundVariant && foundVariant.images.length > 0) {
          setSelectedImage(0);
        }
      }

      return updated;
    });
  };

  const handleAddToCart = async () => {
    if (!product) return;

    if (!variant || variant.stock === 0) {
      toast.error("Produto fora de estoque ou variante inválida");
      return;
    }

    const cartItem: CartItem = {
      name: variant.name,
      sku: variant.sku,
      price: variant.price,
      options: selectedOptions,
      quantity,
      image: variant.images[0] ?? "",
      stock: variant.stock,
      group: product,
      lazy: false,
    };

    try {
      await dispatch(addToCartWithValidation(cartItem)).unwrap();
      openCart();
      toast.success("Produto adicionado ao carrinho!");
    } catch (error) {
      toast.error(typeof error === "string" ? error : "Erro ao adicionar ao carrinho");
    }
  };

  const handleBuyNow = () => {
    if (isAuthenticated && userProfile) {
      if (!variant || !product) {
        toast.error("Variante inválida para compra");
        return;
      }
      dispatch(setBuyNowProduct({ ...variant, quantity, image: variant.images[0], group: product }));
      router.push("/checkout");
    } else {
      router.push("/signin");
    }
  };

  return {
    product,
    isLoading,
    selectedImage,
    selectedOptions,
    quantity,
    setQuantity,
    variant,
    stock,
    price,
    isOutOfStock,
    isLowStock,
    handleOptionChange,
    handleAddToCart,
    handleBuyNow,
    setSelectedImage,
  };
}
