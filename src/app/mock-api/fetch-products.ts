import { ProductGrouped } from "@/types/product";

export const mockGroupedProducts: ProductGrouped[] = [
  {
    id: 'product-1',
    ownerId: 1,
    options: [
      {
        label: 'Color',
        type: 'color',
        values: [
          { label: 'Black', color: '#000000', relativeImage: 0 },
          { label: 'White', color: '#FFFFFF', relativeImage: 1 },
        ],
      },
    ],
    specs: [
      { label: 'Material', value: 'Cotton' },
      { label: 'Fit', value: 'Regular' },
    ],
    default: {
      id: 'variant-1a',
      name: 'T-Shirt Black',
      sku: 'TSHIRT-BLK-S-B1',
      price: 19.99,
      discount: 0,
      stock: 10,
      images: ['https://studios-tc.com/wp-content/uploads/2021/10/oversize-hoodie-royal-blue-front-900x1021.jpg'],
      options: { Color: 'Black' },
      avaliations: [
        { star: 5, comment: 'Great quality!' },
        { star: 4, comment: 'Comfortable and soft.' },
      ],
    },
    variants: [
      {
        id: 'variant-1a',
        name: 'T-Shirt Black',
        sku: 'TSHIRT-BLK-S-B1',
        price: 19.99,
        discount: 0,
        stock: 10,
        images: ['https://studios-tc.com/wp-content/uploads/2021/10/oversize-hoodie-royal-blue-front-900x1021.jpg'],
        options: { Color: 'Black' },
        avaliations: [
          { star: 5, comment: 'Great quality!' },
          { star: 4, comment: 'Comfortable and soft.' },
        ],
      },
      {
        id: 'variant-1b',
        name: 'T-Shirt White',
        sku: 'TSHIRT-WHT-S-B1',
        price: 19.99,
        discount: 10,
        stock: 15,
        images: ['https://studios-tc.com/wp-content/uploads/2021/10/oversize-hoodie-royal-blue-front-900x1021.jpg'],
        options: { Color: 'White' },
        avaliations: [
          { star: 4, comment: 'Classic white tee.' },
        ],
      },
    ],
  },
  {
    id: 'product-2',
    ownerId: 2,
    options: [
      {
        label: 'Size',
        type: 'size',
        values: [
          { label: '42' },
          { label: '43' },
        ],
      },
    ],
    default: {
      id: 'variant-2a',
      name: 'Sneakers Size 42',
      sku: 'SNK-WHT-42-B3',
      price: 69.99,
      stock: 8,
      images: ['https://studios-tc.com/wp-content/uploads/2021/10/oversize-hoodie-royal-blue-front-900x1021.jpg'],
      options: { label: '42' },
      avaliations: [
        { star: 5, comment: 'Very comfortable!' },
        { star: 3, comment: 'Runs a bit small.' },
      ],
    },
    variants: [
      {
        id: 'variant-2a',
        name: 'Sneakers Size 42',
        sku: 'SNK-WHT-42-B3',
        price: 69.99,
        stock: 8,
        discount: 0,
        images: ['https://studios-tc.com/wp-content/uploads/2021/10/oversize-hoodie-royal-blue-front-900x1021.jpg'],
        options:  {
          Size: '42'
      },
        avaliations: [
          { star: 5, comment: 'Very comfortable!' },
          { star: 3, comment: 'Runs a bit small.' },
        ],
      },
      {
        id: 'variant-2b',
        name: 'Sneakers Size 43',
        sku: 'SNK-WHT-43-B3',
        price: 69.99,
        discount: 5,
        stock: 5,
        images: ['https://studios-tc.com/wp-content/uploads/2021/10/oversize-hoodie-royal-blue-front-900x1021.jpg'],
        options: { Size: '43',  },
        avaliations: [],
      },
    ],
  },
  {
    id: 'product-3',
    ownerId: 3,
    options: [
      {
        label: 'Color',
        type: 'color',
        values: [
          { label: 'Blue', color: '#0000FF', relativeImage: 0 },
          { label: 'Red', color: '#FF0000', relativeImage: 1 },
        ],
      },
    ],
    default: {
      id: 'variant-3a',
      name: 'Blue Hoodie',
      sku: 'HOODIE-BLU-M-B5',
      price: 49.99,
      stock: 0,
      images: ['https://studios-tc.com/wp-content/uploads/2021/10/oversize-hoodie-royal-blue-front-900x1021.jpg'],
      options: { Color: 'Blue' },
      avaliations: [
        { star: 4, comment: 'Love the color.' },
      ],
    },
    variants: [
      {
        id: 'variant-3a',
        name: 'Blue Hoodie',
        sku: 'HOODIE-BLU-M-B5',
        price: 49.99,
        stock: 0,
        discount: 0,
        images: ['https://studios-tc.com/wp-content/uploads/2021/10/oversize-hoodie-royal-blue-front-900x1021.jpg'],
        options: { Color: 'Blue' },
        avaliations: [
          { star: 4, comment: 'Love the color.' },
        ],
      },
      {
        id: 'variant-3b',
        name: 'Red Hoodie',
        sku: 'HOODIE-RED-M-B5',
        price: 49.99,
        stock: 6,
        discount: 0,
        images: ['https://studios-tc.com/wp-content/uploads/2021/10/oversize-hoodie-royal-blue-front-900x1021.jpg'],
        options: { Color: 'Red' },
        avaliations: [],
      },
    ],
  },
  {
    id: 'product-4',
    ownerId: 4,
    options: [
      {
        label: 'Color',
        type: 'color',
        values: [
          { label: 'Black', color: '#000000', relativeImage: 0 },
          { label: 'Gray', color: '#808080', relativeImage: 1 },
        ],
      },
    ],
    default: {
      id: 'variant-4a',
      name: 'Baseball Cap Black',
      sku: 'CAP-BLK-B6',
      price: 14.99,
      stock: 20,
      images: ['https://studios-tc.com/wp-content/uploads/2021/10/oversize-hoodie-royal-blue-front-900x1021.jpg'],
      options: { Color: 'Black' },
      avaliations: [],
    },
    variants: [
      {
        id: 'variant-4a',
        name: 'Baseball Cap Black',
        sku: 'CAP-BLK-B6',
        price: 14.99,
        stock: 20,
        discount: 0,
        images: ['https://studios-tc.com/wp-content/uploads/2021/10/oversize-hoodie-royal-blue-front-900x1021.jpg'],
        options: { Color: 'Black' },
        avaliations: [],
      },
      {
        id: 'variant-4b',
        name: 'Baseball Cap Gray',
        sku: 'CAP-GRY-B1',
        price: 14.99,
        stock: 10,
        discount: 2,
        images: ['https://studios-tc.com/wp-content/uploads/2021/10/oversize-hoodie-royal-blue-front-900x1021.jpg'],
        options: { Color: 'Gray' },
        avaliations: [
          { star: 4, comment: 'Nice fit.' },
        ],
      },
    ],
  },
  {
    id: 'product-5',
    ownerId: 5,
    options: [
      {
        label: 'Material',
        type: 'material',
        values: [
          { label: 'Leather' },
          { label: 'Canvas' },
        ],
      },
    ],
    specs: [
      { label: 'Waterproof', value: 'Yes' },
      { label: 'Warranty', value: '2 years' },
    ],
    default: {
      id: 'variant-5a',
      name: 'Leather Backpack',
      sku: 'BACKPACK-LTHR-B1',
      price: 120.0,
      stock: 7,
      images: ['https://studios-tc.com/wp-content/uploads/2021/10/oversize-hoodie-royal-blue-front-900x1021.jpg'],
      options: { Material: 'Leather' },
      avaliations: [
        { star: 5, comment: 'Very durable and stylish.' },
      ],
    },
    variants: [
      {
        id: 'variant-5a',
        name: 'Leather Backpack',
        sku: 'BACKPACK-LTHR-B1',
        price: 120.0,
        stock: 7,
        discount: 0,
        images: ['https://studios-tc.com/wp-content/uploads/2021/10/oversize-hoodie-royal-blue-front-900x1021.jpg'],
        options: { Material: 'Leather' },
        avaliations: [
          { star: 5, comment: 'Very durable and stylish.' },
        ],
      },
      {
        id: 'variant-5b',
        name: 'Canvas Backpack',
        sku: 'BACKPACK-CANV-B1',
        price: 85.0,
        stock: 15,
        discount: 10,
        images: ['https://studios-tc.com/wp-content/uploads/2021/10/oversize-hoodie-royal-blue-front-900x1021.jpg'],
        options: { Material: 'Canvas' },
        avaliations: [
          { star: 4, comment: 'Lightweight and practical.' },
        ],
      },
    ],
  },
  {
    id: 'product-6',
    ownerId: 6,
    options: [
      {
        label: 'Capacity',
        type: 'capacity',
        values: [
          { label: '500ml' },
          { label: '1L' },
        ],
      },
    ],
    specs: [
      { label: 'Insulation', value: '12h hot / 24h cold' },
      { label: 'Material', value: 'Stainless steel' },
    ],
    default: {
      id: 'variant-6a',
      name: 'Water Bottle 500ml',
      sku: 'BOTTLE-500ML-B2',
      price: 25.0,
      stock: 30,
      images: ['https://studios-tc.com/wp-content/uploads/2021/10/oversize-hoodie-royal-blue-front-900x1021.jpg'],
      options: { Capacity: '500ml' },
      avaliations: [
        { star: 5, comment: 'Keeps my drinks cold all day!' },
      ],
    },
    variants: [
      {
        id: 'variant-6a',
        name: 'Water Bottle 500ml',
        sku: 'BOTTLE-500ML-B2',
        price: 25.0,
        stock: 30,
        discount: 0,
        images: ['https://studios-tc.com/wp-content/uploads/2021/10/oversize-hoodie-royal-blue-front-900x1021.jpg'],
        options: { Capacity: '500ml' },
        avaliations: [
          { star: 5, comment: 'Keeps my drinks cold all day!' },
        ],
      },
      {
        id: 'variant-6b',
        name: 'Water Bottle 1L',
        sku: 'BOTTLE-1L-B2',
        price: 35.0,
        stock: 20,
        discount: 5,
        images: ['https://studios-tc.com/wp-content/uploads/2021/10/oversize-hoodie-royal-blue-front-900x1021.jpg'],
        options: { Capacity: '1L' },
        avaliations: [
          { star: 4, comment: 'Great size for hiking.' },
        ],
      },
    ],
  },
  {
    id: 'product-7',
    ownerId: 7,
    options: [
      {
        label: 'Flavor',
        type: 'flavor',
        values: [
          { label: 'Vanilla' },
          { label: 'Chocolate' },
        ],
      },
    ],
    specs: [
      { label: 'Sugar Free', value: 'No' },
      { label: 'Calories', value: '200 per serving' },
    ],
    default: {
      id: 'variant-7a',
      name: 'Protein Shake Vanilla',
      sku: 'PROTEIN-VAN-B1',
      price: 29.99,
      stock: 40,
      images: ['https://studios-tc.com/wp-content/uploads/2021/10/oversize-hoodie-royal-blue-front-900x1021.jpg'],
      options: { Flavor: 'Vanilla' },
      avaliations: [
        { star: 5, comment: 'Tastes great and effective.' },
      ],
    },
    variants: [
      {
        id: 'variant-7a',
        name: 'Protein Shake Vanilla',
        sku: 'PROTEIN-VAN-B1',
        price: 29.99,
        stock: 40,
        discount: 0,
        images: ['https://studios-tc.com/wp-content/uploads/2021/10/oversize-hoodie-royal-blue-front-900x1021.jpg'],
        options: { Flavor: 'Vanilla' },
        avaliations: [
          { star: 5, comment: 'Tastes great and effective.' },
        ],
      },
      {
        id: 'variant-7b',
        name: 'Protein Shake Chocolate',
        sku: 'PROTEIN-CHO-B1',
        price: 29.99,
        stock: 35,
        discount: 5,
        images: ['https://studios-tc.com/wp-content/uploads/2021/10/oversize-hoodie-royal-blue-front-900x1021.jpg'],
        options: { Flavor: 'Chocolate' },
        avaliations: [
          { star: 4, comment: 'Chocolate flavor is very smooth.' },
        ],
      },
    ],
  },
  {
    id: 'product-8',
    ownerId: 8,
    options: [
      {
        label: 'Voltage',
        type: 'voltage',
        values: [
          { label: '110V' },
          { label: '220V' },
        ],
      },
    ],
    specs: [
      { label: 'Power', value: '1500W' },
      { label: 'Energy Efficient', value: 'Yes' },
    ],
    default: {
      id: 'variant-8a',
      name: 'Hair Dryer 110V',
      sku: 'HAIRDRY-110-B1',
      price: 55.0,
      stock: 12,
      images: ['https://studios-tc.com/wp-content/uploads/2021/10/oversize-hoodie-royal-blue-front-900x1021.jpg'],
      options: { Voltage: '110V' },
      avaliations: [
        { star: 5, comment: 'Dries hair quickly.' },
      ],
    },
    variants: [
      {
        id: 'variant-8a',
        name: 'Hair Dryer 110V',
        sku: 'HAIRDRY-110-B1',
        price: 55.0,
        stock: 12,
        discount: 0,
        images: ['https://studios-tc.com/wp-content/uploads/2021/10/oversize-hoodie-royal-blue-front-900x1021.jpg'],
        options: { Voltage: '110V' },
        avaliations: [
          { star: 5, comment: 'Dries hair quickly.' },
        ],
      },
      {
        id: 'variant-8b',
        name: 'Hair Dryer 220V',
        sku: 'HAIRDRY-220-B1',
        price: 55.0,
        stock: 18,
        discount: 3,
        images: ['https://studios-tc.com/wp-content/uploads/2021/10/oversize-hoodie-royal-blue-front-900x1021.jpg'],
        options: { Voltage: '220V' },
        avaliations: [
          { star: 4, comment: 'Good performance on high voltage.' },
        ],
      },
    ],
  },
];
