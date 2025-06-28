import { ProductGrouped } from "@/types/product";

const baseProducts: ProductGrouped[] = [
  {
    default: {
      name: "Black T-Shirt",
      sku: "TSHIRT-BLK-S",
      price: 19.99,
      stock: 10,
      images: [
        "https://www.skhouston.com/pub/media/catalog/product/cache/249608ba4171d44d21805ed7657a13ae/t/s/tshirt_black.jpg",
      ],
      options: { Color: "Black" },
    },
    ownerId: 1,
    options: [
      {
        label: "Color",
        type: "color",
        values: [
          { color: "#000000", label: "Black" },
          { color: "#FFFFFF", label: "White" },
        ],
      },
    ],
    variants: [
      {
        name: "Black T-Shirt",
        sku: "TSHIRT-BLK-S",
        price: 19.99,
        stock: 10,
        images: [
          "https://www.skhouston.com/pub/media/catalog/product/cache/249608ba4171d44d21805ed7657a13ae/t/s/tshirt_black.jpg",
        ],
        options: { Color: "Black" },
        discount: 50,
      },
      {
        name: "White T-Shirt",
        sku: "TSHIRT-WHT-S",
        price: 19.99,
        stock: 5,
        images: [
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV8Y6t341TZsJO9sKhyWUF5uqUPLiOMfITvg&s",
        ],
        options: { Color: "White" },
      },
    ],
  },
  {
    default: {
      name: "Hoodie Blue",
      sku: "HOODIE-BLU-M",
      price: 49.99,
      stock: 0,
      images: [
        "https://studios-tc.com/wp-content/uploads/2021/10/oversize-hoodie-royal-blue-front-900x1021.jpg",
      ],
      options: { Color: "Blue" },
    },
    ownerId: 2,
    options: [
      {
        label: "Color",
        type: "color",
        values: [
          { color: "#0000FF", label: "Blue" },
          { color: "#FF0000", label: "Red" },
        ],
      },
    ],
    variants: [
      {
        name: "Hoodie Blue",
        sku: "HOODIE-BLU-M",
        price: 49.99,
        stock: 0,
        images: [
          "https://studios-tc.com/wp-content/uploads/2021/10/oversize-hoodie-royal-blue-front-900x1021.jpg",
        ],
        options: { Color: "Blue" },
      },
      {
        name: "Hoodie Red",
        sku: "HOODIE-RED-M",
        price: 49.99,
        stock: 3,
        images: [
          "https://teamheretics.com/en/2326-large_default/color-pack-oversized-fit-hoodie-red-1.jpg",
        ],
        options: { Color: "Red" },
      },
    ],
  },
  {
    default: {
      name: "Sneakers White",
      sku: "SNKR-WHT-42",
      price: 69.99,
      stock: 15,
      images: [
        "https://cdn.shopify.com/s/files/1/0070/7032/products/white-sneaker_600x.jpg?v=1571438332",
      ],
      options: { Size: "42" },
    },
    ownerId: 3,
    options: [
      {
        label: "Size",
        type: "size",
        values: [
          { color: "", label: "40" },
          { color: "", label: "41" },
          { color: "", label: "42" },
          { color: "", label: "43" },
          { color: "", label: "44" },
        ],
      },
    ],
    variants: [
      {
        name: "Sneakers White Size 42",
        sku: "SNKR-WHT-42",
        price: 69.99,
        stock: 15,
        images: [
          "https://hips.hearstapps.com/hmg-prod/images/sneakers-66a1483fbfe6a.jpg?crop=1xw:0.8376768428890543xh;center,top&resize=1200:*",
        ],
        options: { Size: "42" },
      },{
        name: "Sneakers White Size 43",
        sku: "SNKR-WHT-43",
        price: 69.99,
        stock: 15,
        images: [
          "https://teamheretics.com/en/2326-large_default/color-pack-oversized-fit-hoodie-red-1.jpg",
        ],
        options: { Size: "43" },
      },
    ],
  },
];


export const fetchMockedProducts: ProductGrouped[] = [];

for (let i = 0; i < 40; i++) {
  baseProducts.forEach((product) => {
    const clonedProduct = JSON.parse(JSON.stringify(product)) as ProductGrouped;

    // Atualiza sku e nome da default e das variantes
    clonedProduct.default.sku += `-B${i}`;
    clonedProduct.default.name += ` Batch ${i + 1}`;

    clonedProduct.variants.forEach((variant: any) => {
      variant.sku += `-B${i}`;
      variant.name += ` Batch ${i + 1}`;
      if (variant.avaliations) {
        variant.avaliations = variant.avaliations.map((a: any) => ({ ...a }));
      }
    });

    clonedProduct.options = clonedProduct.options.map((option) => {
      const filteredValues = option.values.filter((value) =>
        clonedProduct.variants.some(
          (variant) => variant.options[option.label] === value.label
        )
      );
      return {
        ...option,
        values: filteredValues,
      };
    });

    fetchMockedProducts.push(clonedProduct);
  });
}
