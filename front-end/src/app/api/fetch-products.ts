import { ProductGrouped } from "@/types/home/product";

export const fetchMockedProducts: ProductGrouped[] = [
  {
    name: "Black T-Shirt",
    sku: "TSHIRT-BLK",
    images: [
      "https://www.skhouston.com/pub/media/catalog/product/cache/249608ba4171d44d21805ed7657a13ae/t/s/tshirt_black.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV8Y6t341TZsJO9sKhyWUF5uqUPLiOMfITvg&s"
    ],
    options: [
      {
        label: "Color",
        type: "color",
        values: [
          { color: "#000000", label: "Black" },
          { color: "#FFFFFF", label: "White" }
        ]
      }
    ],
    specs: [],
    variants: [
      {
        sku: "TSHIRT-BLK-S",
        price: 19.99,
        stock: 10,
        image: "https://www.skhouston.com/pub/media/catalog/product/cache/249608ba4171d44d21805ed7657a13ae/t/s/tshirt_black.jpg",
        options: {
          Color: "Black"  // Chave deve ser igual ao label da opção
        }
      },
      {
        sku: "TSHIRT-WHT-S",
        price: 19.99,
        stock: 5,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV8Y6t341TZsJO9sKhyWUF5uqUPLiOMfITvg&s",
        options: {
          Color: "White"  // Chave deve ser igual ao label da opção
        }
      }
    ]
  },
  {
    name: "Blue Hoodie",
    sku: "HOODIE-BLU",
    images: [
      "https://studios-tc.com/wp-content/uploads/2021/10/oversize-hoodie-royal-blue-front-900x1021.jpg",
      "https://teamheretics.com/en/2326-large_default/color-pack-oversized-fit-hoodie-red-1.jpg"
    ],
    options: [
      {
        label: "Color",
        type: "color",
        values: [
          { color: "#0000FF", label: "Blue" },
          { color: "#FF0000", label: "Red" }
        ]
      }
    ],
    specs: [],
    variants: [
      {
        sku: "HOODIE-BLU-M",
        price: 49.99,
        stock: 7,
        image: "https://studios-tc.com/wp-content/uploads/2021/10/oversize-hoodie-royal-blue-front-900x1021.jpg",
        options: {
          Color: "Blue"  // Chave deve ser igual ao label da opção
        }
      },
      {
        sku: "HOODIE-RED-M",
        price: 49.99,
        stock: 3,
        image: "https://teamheretics.com/en/2326-large_default/color-pack-oversized-fit-hoodie-red-1.jpg",
        options: {
          Color: "Red"  // Chave deve ser igual ao label da opção
        }
      }
    ]
  }
];