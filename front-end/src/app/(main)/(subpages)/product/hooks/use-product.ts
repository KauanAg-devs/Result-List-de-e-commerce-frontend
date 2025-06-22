import { useAppDispatch } from "@/app/store";
import { CartItem, addToCartWithValidation } from "@/app/store/cart-slice";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { fetchMockedProducts } from "@/app/api/fetch-products";
import { useCartDrawer } from "@main/contexts/cart-drawer-context";
import { ProductGrouped } from "@/types/product";

function findProductBySku(productSku: string) {
  return (
    fetchMockedProducts.find((product) => product.sku === productSku) || null
  );
}

function findProductAndVariantBySku(variantSku: string) {
  for (const product of fetchMockedProducts) {
    const variant = product.variants.find((v) => v.sku === variantSku);
    if (variant) {
      return { product, variant };
    }
  }
  return null;
}

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
  const [product, setProduct] = useState<ProductGrouped | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const { openCart } = useCartDrawer();

  const variant = product && findVariant(product, selectedOptions);
  const stock = variant?.stock ?? 0;
  const price = variant?.price ?? 0;
  const isOutOfStock = stock === 0;
  const isLowStock = stock > 0 && stock <= 5;

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));

      let foundProduct = findProductBySku(sku);
      let specificVariant = null;

      if (!foundProduct) {
        const result = findProductAndVariantBySku(sku);
        if (result) {
          foundProduct = result.product;
          specificVariant = result.variant;
        }
      }

      if (foundProduct) {
        setProduct(foundProduct);

        const variantToUse = specificVariant || foundProduct.variants[0];
        if (variantToUse) {
          const initialOptions: Record<string, string> = {};
          Object.entries(variantToUse.options).forEach(([key, value]) => {
            initialOptions[key] = value;
          });
          setSelectedOptions(initialOptions);

          const imgIndex = foundProduct.images.findIndex(
            (img) => img === variantToUse.image
          );
          setSelectedImage(imgIndex !== -1 ? imgIndex : 0);
        }
      } else {
        setProduct(null);
      }

      setIsLoading(false);
    };

    loadProduct();
  }, [sku]);

  const handleOptionChange = (label: string, value: string) => {
    setSelectedOptions((prev) => {
      const updated = { ...prev, [label]: value };

      if (product) {
        const variant = findVariant(product, updated);
        if (variant) {
          const imgIndex = product.images.findIndex(
            (img) => img === variant.image
          );
          setSelectedImage(imgIndex !== -1 ? imgIndex : 0);
        }
      }

      return updated;
    });
  };

  const handleAddToCart = async () => {
    if (!product) return;

    const variant = findVariant(product, selectedOptions);
    if (!variant || variant.stock === 0) return;

    const cartItem: CartItem = {
      name: product.name,
      sku: variant.sku,
      price: variant.price,
      options: selectedOptions,
      quantity,
      image: variant.image,
      stock: variant.stock,
      group: product,
      lazy: false,
    };

    try {
      await dispatch(addToCartWithValidation(cartItem)).unwrap();
      openCart();
      toast.success("Product added to shopping cart!");
    } catch (error) {
      toast.error(typeof error === "string" ? error : "Error adding to cart");
    }
  };

  return {
    isLoading,
    product,
    selectedImage,
    selectedOptions,
    handleOptionChange,
    quantity,
    setQuantity,
    variant,
    stock,
    price,
    isOutOfStock,
    isLowStock,
    handleAddToCart,
  };
}
