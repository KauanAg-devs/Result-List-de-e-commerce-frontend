import { ProductGrouped } from "@/types/home/product";

export const fetchMockedProducts: ProductGrouped[] = [
  {
    name: 'Black T-Shirt',
    sku: 'CMP-BLK',
    images: [
      'https://www.skhouston.com/pub/media/catalog/product/cache/249608ba4171d44d21805ed7657a13ae/t/s/tshirt_black.jpg',
    ],
    options: [
      {
        label: 'Color',
        type: 'color',
        values: [{ color: 'black', relativeImage: 0 }],
      },
    ],
    variants: [
      {
        sku: 'CMP-BLK',
        price: 45,
        stock: 10,
        image: 'https://www.skhouston.com/pub/media/catalog/product/cache/249608ba4171d44d21805ed7657a13ae/t/s/tshirt_black.jpg',
        options: {
          Color: 'black',
        },
      },
    ],
  },
];
