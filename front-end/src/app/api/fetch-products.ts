import { ProductGrouped } from "@/types/product";

export const fetchMockedProducts: ProductGrouped[] = [
  {
    default: {
      name: "Black T-Shirt",
      sku: "TSHIRT-BLK-S",
      price: 19.99,
      stock: 10,
      images: [
        "https://www.skhouston.com/pub/media/catalog/product/cache/249608ba4171d44d21805ed7657a13ae/t/s/tshirt_black.jpg",
        "https://www.skhouston.com/pub/media/catalog/product/cache/249608ba4171d44d21805ed7657a13ae/t/s/tshirt_black.jpg",
      ],
      options: {
        Color: "Black",
      },
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
          "https://www.skhouston.com/pub/media/catalog/product/cache/249608ba4171d44d21805ed7657a13ae/t/s/tshirt_black.jpg",
        ],
        options: {
          Color: "Black",
        },
        discount: 50,
        avaliations: [
          {
            star: 4.5,
            comment: "muito bom",
          },
          {
            star: 2,
            comment: "um lixo",
          },
        ],
      },
      {
        name: "White T-Shirt",
        sku: "TSHIRT-WHT-S",
        price: 19.99,
        stock: 5,
        images: [
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV8Y6t341TZsJO9sKhyWUF5uqUPLiOMfITvg&s",
        ],
        options: {
          Color: "White",
        },
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
      options: {
        Color: "Blue",
      },
    },
    ownerId: 1,
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
    specs: [],
    variants: [
      {
        name: "Hoodie Blue",
        sku: "HOODIE-BLU-M",
        price: 49.99,
        stock: 0,
        images: [
          "https://studios-tc.com/wp-content/uploads/2021/10/oversize-hoodie-royal-blue-front-900x1021.jpg",
        ],
        options: {
          Color: "Blue",
        },
      },
      {
        name: "Hoodie Red",
        sku: "HOODIE-RED-M",
        price: 49.99,
        stock: 3,
        images: [
          "https://teamheretics.com/en/2326-large_default/color-pack-oversized-fit-hoodie-red-1.jpg",
        ],
        options: {
          Color: "Red",
        },
      },
    ],
  },
];
