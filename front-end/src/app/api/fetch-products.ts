export const fetchMockedProducts = [
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
          Color: "Black"
        }
      },
      {
        sku: "TSHIRT-WHT-S",
        price: 19.99,
        stock: 5,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV8Y6t341TZsJO9sKhyWUF5uqUPLiOMfITvg&s",
        options: {
          Color: "White"
        }
      }
    ]
  },
  {
    name: "Hoodie",
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
        stock: 0,
        image: "https://studios-tc.com/wp-content/uploads/2021/10/oversize-hoodie-royal-blue-front-900x1021.jpg",
        options: {
          Color: "Blue"
        }
      },
      {
        sku: "HOODIE-RED-M",
        price: 49.99,
        stock: 3,
        image: "https://teamheretics.com/en/2326-large_default/color-pack-oversized-fit-hoodie-red-1.jpg",
        options: {
          Color: "Red"
        }
      }
    ]
  },
  {
    name: "Sneakers",
    sku: "SNKR-WHT",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSovWjFUTlsyEtXH3hP3TV93EjrClbcY_J9Xw&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbvRqyGtUcL7x49Ojfwh1dh3BSqmS2P84ZLg&s"
    ],
    options: [
      {
        label: "Color",
        type: "color",
        values: [
          { color: "#FFFFFF", label: "White" },
          { color: "#000000", label: "Black" }
        ]
      }
    ],
    specs: [],
    variants: [
      {
        sku: "SNKR-WHT-42",
        price: 79.99,
        stock: 15,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSovWjFUTlsyEtXH3hP3TV93EjrClbcY_J9Xw&s",
        options: {
          Color: "White"
        }
      },
      {
        sku: "SNKR-BLK-42",
        price: 79.99,
        stock: 12,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbvRqyGtUcL7x49Ojfwh1dh3BSqmS2P84ZLg&s",
        options: {
          Color: "Black"
        }
      }
    ]
  },
  {
    name: "Hat",
    sku: "HAT-GRN",
    images: [
      "https://static.caphunters.com/41026-large_default/new-era-green-logo-a-frame-league-essential-los-angeles-dodgers-mlb-green-and-white-trucker-hat.webp",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgKt_IttwPNVBC1-YL5Z0pefzITzYcYd1rbQ&s"
    ],
    options: [
      {
        label: "Color",
        type: "color",
        values: [
          { color: "#008000", label: "Green" },
          { color: "#006400", label: "Dark Green" }
        ]
      }
    ],
    specs: [],
    variants: [
      {
        sku: "HAT-GRN-OS",
        price: 15.99,
        stock: 20,
        image: "https://static.caphunters.com/41026-large_default/new-era-green-logo-a-frame-league-essential-los-angeles-dodgers-mlb-green-and-white-trucker-hat.webp",
        options: {
          Color: "Green"
        }
      },
      {
        sku: "HAT-DGRN-OS",
        price: 15.99,
        stock: 8,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgKt_IttwPNVBC1-YL5Z0pefzITzYcYd1rbQ&s",
        options: {
          Color: "Dark Green"
        }
      }
    ]
  },
  {
    name: "Jacket",
    sku: "JKT-RED",
    images: [
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1520975693703-df22d4d449b6?auto=format&fit=crop&w=500&q=60"
    ],
    options: [
      {
        label: "Color",
        type: "color",
        values: [
          { color: "#FF0000", label: "Red" },
          { color: "#000000", label: "Black" }
        ]
      }
    ],
    specs: [],
    variants: [
      {
        sku: "JKT-RED-M",
        price: 99.99,
        stock: 5,
        image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=500&q=60",
        options: {
          Color: "Red"
        }
      },
      {
        sku: "JKT-BLK-M",
        price: 99.99,
        stock: 2,
        image: "https://images.unsplash.com/photo-1520975693703-df22d4d449b6?auto=format&fit=crop&w=500&q=60",
        options: {
          Color: "Black"
        }
      }
    ]
  },
  {
    name: "Shorts",
    sku: "SHRT-YLW",
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1520975979211-91834e780eed?auto=format&fit=crop&w=500&q=60"
    ],
    options: [
      {
        label: "Color",
        type: "color",
        values: [
          { color: "#FFFF00", label: "Yellow" }
        ]
      }
    ],
    specs: [],
    variants: [
      {
        sku: "SHRT-YLW-M",
        price: 25.99,
        stock: 12,
        image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=500&q=60",
        options: {
          Color: "Yellow"
        }
      }
    ]
  },
  {
    name: "Scarf",
    sku: "SCARF-PRP",
    images: [
      "https://images.unsplash.com/photo-1503424886301-9c47d62ad46d?auto=format&fit=crop&w=500&q=60"
    ],
    options: [
      {
        label: "Color",
        type: "color",
        values: [
          { color: "#800080", label: "Purple" }
        ]
      }
    ],
    specs: [],
    variants: [
      {
        sku: "SCARF-PRP-OS",
        price: 19.99,
        stock: 18,
        image: "https://images.unsplash.com/photo-1503424886301-9c47d62ad46d?auto=format&fit=crop&w=500&q=60",
        options: {
          Color: "Purple"
        }
      }
    ]
  },
  {
    name: "Socks",
    sku: "SOCKS-ORG",
    images: [
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=500&q=60"
    ],
    options: [
      {
        label: "Color",
        type: "color",
        values: [
          { color: "#FFA500", label: "Orange" },
          { color: "#FFFFFF", label: "White" }
        ]
      }
    ],
    specs: [],
    variants: [
      {
        sku: "SOCKS-ORG-M",
        price: 12.99,
        stock: 30,
        image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=500&q=60",
        options: {
          Color: "Orange"
        }
      },
      {
        sku: "SOCKS-WHT-M",
        price: 12.99,
        stock: 10,
        image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=500&q=60",
        options: {
          Color: "White"
        }
      }
    ]
  },
  {
    name: "Jacket",
    sku: "JKT-GRY",
    images: [
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=500&q=60"
    ],
    options: [
      {
        label: "Color",
        type: "color",
        values: [
          { color: "#808080", label: "Gray" }
        ]
      }
    ],
    specs: [],
    variants: [
      {
        sku: "JKT-GRY-M",
        price: 89.99,
        stock: 4,
        image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=500&q=60",
        options: {
          Color: "Gray"
        }
      }
    ]
  },
  {
    name: "Brown Boots",
    sku: "BTS-BRN",
    images: [
      "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=500&q=60"
    ],
    options: [
      {
        label: "Color",
        type: "color",
        values: [
          { color: "#8B4513", label: "Brown" }
        ]
      }
    ],
    specs: [],
    variants: [
      {
        sku: "BTS-BRN-42",
        price: 129.99,
        stock: 7,
        image: "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=500&q=60",
        options: {
          Color: "Brown"
        }
      }
    ]
  },
  {
    name: "Pink Dress",
    sku: "DRS-PNK",
    images: [
      "https://images.unsplash.com/photo-1520974732701-5e4c259d385d?auto=format&fit=crop&w=500&q=60"
    ],
    options: [
      {
        label: "Color",
        type: "color",
        values: [
          { color: "#FFC0CB", label: "Pink" }
        ]
      }
    ],
    specs: [],
    variants: [
      {
        sku: "DRS-PNK-M",
        price: 59.99,
        stock: 8,
        image: "https://images.unsplash.com/photo-1520974732701-5e4c259d385d?auto=format&fit=crop&w=500&q=60",
        options: {
          Color: "Pink"
        }
      }
    ]
  },
  {
    name: "Black Leather Belt",
    sku: "BLT-BLK",
    images: [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=500&q=60"
    ],
    options: [
      {
        label: "Color",
        type: "color",
        values: [
          { color: "#000000", label: "Black" }
        ]
      }
    ],
    specs: [],
    variants: [
      {
        sku: "BLT-BLK-OS",
        price: 24.99,
        stock: 20,
        image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=500&q=60",
        options: {
          Color: "Black"
        }
      }
    ]
  },
  {
    name: "White Cap",
    sku: "CAP-WHT",
    images: [
      "https://images.unsplash.com/photo-1506619216599-9c4d3cf99946?auto=format&fit=crop&w=500&q=60"
    ],
    options: [
      {
        label: "Color",
        type: "color",
        values: [
          { color: "#FFFFFF", label: "White" }
        ]
      }
    ],
    specs: [],
    variants: [
      {
        sku: "CAP-WHT-OS",
        price: 14.99,
        stock: 15,
        image: "https://images.unsplash.com/photo-1506619216599-9c4d3cf99946?auto=format&fit=crop&w=500&q=60",
        options: {
          Color: "White"
        }
      }
    ]
  },
  {
    name: "Blue Jeans",
    sku: "JEANS-BLU",
    images: [
      "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=500&q=60"
    ],
    options: [
      {
        label: "Color",
        type: "color",
        values: [
          { color: "#0000FF", label: "Blue" }
        ]
      }
    ],
    specs: [],
    variants: [
      {
        sku: "JEANS-BLU-32",
        price: 49.99,
        stock: 25,
        image: "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=500&q=60",
        options: {
          Color: "Blue"
        }
      }
    ]
  },
  {
    name: "Gray Sneakers",
    sku: "SNKR-GRY",
    images: [
      "https://images.unsplash.com/photo-1519741496641-6ff326b4f7e1?auto=format&fit=crop&w=500&q=60"
    ],
    options: [
      {
        label: "Color",
        type: "color",
        values: [
          { color: "#808080", label: "Gray" }
        ]
      }
    ],
    specs: [],
    variants: [
      {
        sku: "SNKR-GRY-42",
        price: 74.99,
        stock: 18,
        image: "https://images.unsplash.com/photo-1519741496641-6ff326b4f7e1?auto=format&fit=crop&w=500&q=60",
        options: {
          Color: "Gray"
        }
      }
    ]
  },
  {
    name: "Red Dress",
    sku: "DRS-RED",
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=500&q=60"
    ],
    options: [
      {
        label: "Color",
        type: "color",
        values: [
          { color: "#FF0000", label: "Red" }
        ]
      }
    ],
    specs: [],
    variants: [
      {
        sku: "DRS-RED-M",
        price: 59.99,
        stock: 6,
        image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=500&q=60",
        options: {
          Color: "Red"
        }
      }
    ]
  },
  {
    name: "Brown Leather Bag",
    sku: "BAG-BRN",
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=60"
    ],
    options: [
      {
        label: "Color",
        type: "color",
        values: [
          { color: "#8B4513", label: "Brown" }
        ]
      }
    ],
    specs: [],
    variants: [
      {
        sku: "BAG-BRN-OS",
        price: 149.99,
        stock: 10,
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=60",
        options: {
          Color: "Brown"
        }
      }
    ]
  },
  {
    name: "Black Gloves",
    sku: "GLVS-BLK",
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=60"
    ],
    options: [
      {
        label: "Color",
        type: "color",
        values: [
          { color: "#000000", label: "Black" }
        ]
      }
    ],
    specs: [],
    variants: [
      {
        sku: "GLVS-BLK-M",
        price: 29.99,
        stock: 25,
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=60",
        options: {
          Color: "Black"
        }
      }
    ]
  },
  {
    name: "White Shirt",
    sku: "SHRT-WHT",
    images: [
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=500&q=60"
    ],
    options: [
      {
        label: "Color",
        type: "color",
        values: [
          { color: "#FFFFFF", label: "White" }
        ]
      }
    ],
    specs: [],
    variants: [
      {
        sku: "SHRT-WHT-M",
        price: 35.99,
        stock: 30,
        image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=500&q=60",
        options: {
          Color: "White"
        }
      }
    ]
  }
];
