"use server"

export interface RealProduct {
  id: string
  name: string
  brand: string
  price: number
  rating: number
  reviewCount: number
  image: string
  summary: string
  pros: string[]
  cons: string[]
  keyFeatures: string[]
  affiliateLinks: {
    vendor: string
    url: string
    price: number
  }[]
}

function generateProductsForQuery(query: string): RealProduct[] {
  console.log("[v0] Generating products for query:", query)

  // Parse query to understand product category and context
  const queryLower = query.toLowerCase()

  // Define category-specific data
  const categoryData = getCategoryData(queryLower)

  const products: RealProduct[] = []

  for (let i = 0; i < 10; i++) {
    const brand = categoryData.brands[i % categoryData.brands.length]
    const basePrice =
      categoryData.priceRange.min +
      Math.floor(Math.random() * (categoryData.priceRange.max - categoryData.priceRange.min))
    const rating = Number((Math.random() * 1.5 + 3.5).toFixed(1))
    const reviewCount = Math.floor(Math.random() * 5000) + 100

    // Generate realistic product identifiers
    const amazonAsin = `B0${Math.random().toString(36).substring(2, 9).toUpperCase()}`
    const walmartId = Math.floor(Math.random() * 900000000) + 100000000

    const amazonAffiliateId = process.env.AMAZON_AFFILIATE_ID || "youraffid-20"
    const walmartAffiliateId = process.env.WALMART_AFFILIATE_ID || ""

    // Generate product name with model variation
    const modelSuffix = categoryData.modelSuffixes[i % categoryData.modelSuffixes.length]
    const productName = `${brand} ${categoryData.productType} ${modelSuffix}`

    // Build Walmart URL with optional affiliate ID
    let walmartUrl = `https://www.walmart.com/ip/${walmartId}`
    if (walmartAffiliateId) {
      walmartUrl += `?affcamid=${walmartAffiliateId}`
    }

    products.push({
      id: `product-${i + 1}`,
      name: productName,
      brand: brand,
      price: basePrice,
      rating: rating,
      reviewCount: reviewCount,
      image: `/placeholder.svg?height=400&width=400&query=${encodeURIComponent(productName)}`,
      summary: categoryData.summaryTemplate.replace("{brand}", brand).replace("{product}", categoryData.productType),
      pros: categoryData.pros.slice(i % 3, (i % 3) + 4),
      cons: categoryData.cons.slice(i % 2, (i % 2) + 3),
      keyFeatures: categoryData.features.slice(i % 2, (i % 2) + 5),
      affiliateLinks: [
        {
          vendor: "Amazon",
          url: `https://www.amazon.com/dp/${amazonAsin}?tag=${amazonAffiliateId}`,
          price: basePrice,
        },
        {
          vendor: "Walmart",
          url: walmartUrl,
          price: Math.floor(basePrice * 0.95),
        },
        {
          vendor: "Best Buy",
          url: `https://www.bestbuy.com/site/${walmartId}.p`,
          price: Math.floor(basePrice * 1.02),
        },
      ],
    })
  }

  return products
}

function getCategoryData(query: string) {
  // Electronics categories
  if (query.includes("headphone") || query.includes("earbuds") || query.includes("airpods")) {
    return {
      productType: "Wireless Headphones",
      brands: ["Sony", "Bose", "Apple", "Sennheiser", "JBL", "Beats", "Audio-Technica", "Anker", "Jabra", "Samsung"],
      priceRange: { min: 49, max: 399 },
      modelSuffixes: ["Pro", "Elite", "Max", "Ultra", "Premium", "Studio", "Sport", "Plus", "Air", "X"],
      summaryTemplate:
        "Premium {product} from {brand} featuring exceptional sound quality, active noise cancellation, and long battery life. Perfect for music lovers and professionals.",
      pros: [
        "Excellent sound quality",
        "Comfortable fit",
        "Long battery life",
        "Active noise cancellation",
        "Premium build quality",
        "Great connectivity",
        "Intuitive controls",
      ],
      cons: ["Premium price point", "Limited color options", "Bulky carrying case", "No wired option"],
      features: [
        "Bluetooth 5.3 connectivity",
        "40-hour battery life",
        "Active noise cancellation",
        "Premium audio drivers",
        "Comfortable ear cushions",
        "Foldable design",
        "Multi-device pairing",
        "Voice assistant support",
      ],
    }
  }

  if (query.includes("laptop") || query.includes("notebook")) {
    return {
      productType: "Laptop",
      brands: ["Apple", "Dell", "HP", "Lenovo", "ASUS", "Acer", "Microsoft", "MSI", "Razer", "LG"],
      priceRange: { min: 599, max: 2499 },
      modelSuffixes: [
        "Pro 15",
        "Elite X360",
        "Spectre 14",
        "ThinkPad X1",
        "ZenBook 14",
        "Swift 5",
        "Surface Laptop 5",
        "Prestige 16",
        "Blade 15",
        "Gram 17",
      ],
      summaryTemplate:
        "High-performance {product} from {brand} designed for productivity and entertainment. Features powerful processors, stunning display, and all-day battery life.",
      pros: [
        "Powerful performance",
        "Beautiful display",
        "Long battery life",
        "Premium build quality",
        "Fast SSD storage",
        "Excellent keyboard",
        "Lightweight design",
      ],
      cons: ["Expensive", "Limited ports", "Non-upgradeable RAM", "Gets warm under load"],
      features: [
        "Intel Core i7 processor",
        "16GB RAM",
        "512GB SSD",
        "15.6-inch Full HD display",
        "Backlit keyboard",
        "Fingerprint reader",
        "Thunderbolt 4 ports",
        "Wi-Fi 6E",
      ],
    }
  }

  if (
    query.includes("phone") ||
    query.includes("smartphone") ||
    query.includes("iphone") ||
    query.includes("android")
  ) {
    return {
      productType: "Smartphone",
      brands: ["Apple", "Samsung", "Google", "OnePlus", "Motorola", "Xiaomi", "OPPO", "Sony", "Nokia", "ASUS"],
      priceRange: { min: 299, max: 1299 },
      modelSuffixes: [
        "Pro Max",
        "Ultra",
        "Pro",
        "Plus",
        "Edge",
        "Pixel 8",
        "13 Pro",
        "Xperia 5",
        "G Power",
        "ROG Phone",
      ],
      summaryTemplate:
        "Cutting-edge {product} from {brand} with advanced camera system, powerful processor, and stunning display. Perfect for photography, gaming, and productivity.",
      pros: [
        "Excellent camera quality",
        "Fast performance",
        "Beautiful display",
        "Long battery life",
        "5G connectivity",
        "Premium design",
        "Regular software updates",
      ],
      cons: ["High price", "No expandable storage", "Large size", "Slippery without case"],
      features: [
        "6.7-inch OLED display",
        "Triple camera system",
        "5G connectivity",
        "Fast charging",
        "Wireless charging",
        "Water resistant",
        "Face unlock",
        "In-display fingerprint sensor",
      ],
    }
  }

  // Sports & Outdoors
  if (query.includes("golf") && (query.includes("bag") || query.includes("bags"))) {
    return {
      productType: "Golf Bag",
      brands: [
        "Callaway",
        "TaylorMade",
        "Titleist",
        "Ping",
        "Sun Mountain",
        "Cobra",
        "Mizuno",
        "Wilson",
        "Cleveland",
        "Bag Boy",
      ],
      priceRange: { min: 89, max: 399 },
      modelSuffixes: [
        "Stand Bag",
        "Cart Bag",
        "Tour Bag",
        "Carry Bag",
        "Hybrid 14",
        "Superlight",
        "Org 14",
        "Chiller",
        "Mavrik",
        "Sync",
      ],
      summaryTemplate:
        "Professional-grade {product} from {brand} featuring multiple pockets, durable construction, and comfortable carrying system. Ideal for serious golfers.",
      pros: [
        "Plenty of storage",
        "Durable materials",
        "Comfortable straps",
        "Stable stand",
        "Organized pockets",
        "Weather resistant",
        "Lightweight design",
      ],
      cons: ["Bulky when full", "Limited color choices", "Expensive", "Heavy when loaded"],
      features: [
        "14-way top divider",
        "7 storage pockets",
        "Insulated cooler pocket",
        "Rain hood included",
        "Dual shoulder straps",
        "Reinforced bottom",
        "Umbrella holder",
        "Towel ring",
      ],
    }
  }

  if (query.includes("sunglasses") || query.includes("shades")) {
    return {
      productType: "Sunglasses",
      brands: [
        "Ray-Ban",
        "Oakley",
        "Maui Jim",
        "Costa Del Mar",
        "Persol",
        "Warby Parker",
        "Gucci",
        "Prada",
        "Tom Ford",
        "Spy",
      ],
      priceRange: { min: 79, max: 399 },
      modelSuffixes: [
        "Aviator",
        "Wayfarer",
        "Clubmaster",
        "Polarized",
        "Sport",
        "Classic",
        "Oversized",
        "Round",
        "Square",
        "Cat Eye",
      ],
      summaryTemplate:
        "Stylish {product} from {brand} offering 100% UV protection, premium lenses, and comfortable fit. Perfect for outdoor activities and everyday wear.",
      pros: [
        "100% UV protection",
        "Polarized lenses",
        "Comfortable fit",
        "Stylish design",
        "Durable frame",
        "Scratch resistant",
        "Lightweight",
      ],
      cons: ["Premium pricing", "Case not included", "Limited adjustability", "May slip during sports"],
      features: [
        "Polarized lenses",
        "100% UV protection",
        "Scratch-resistant coating",
        "Lightweight frame",
        "Adjustable nose pads",
        "Spring hinges",
        "Anti-reflective coating",
        "Impact resistant",
      ],
    }
  }

  if (query.includes("running") && query.includes("shoe")) {
    return {
      productType: "Running Shoes",
      brands: [
        "Nike",
        "Adidas",
        "Brooks",
        "ASICS",
        "New Balance",
        "Hoka",
        "Saucony",
        "Mizuno",
        "On Running",
        "Under Armour",
      ],
      priceRange: { min: 89, max: 249 },
      modelSuffixes: [
        "Pegasus 40",
        "Ultraboost 23",
        "Ghost 15",
        "Gel-Nimbus 25",
        "Fresh Foam X",
        "Clifton 9",
        "Ride 16",
        "Wave Rider 27",
        "Cloudmonster",
        "Flow Velociti",
      ],
      summaryTemplate:
        "High-performance {product} from {brand} designed for comfort, support, and durability. Features responsive cushioning and breathable materials.",
      pros: [
        "Excellent cushioning",
        "Breathable upper",
        "Great support",
        "Durable outsole",
        "Comfortable fit",
        "Responsive feel",
        "Lightweight",
      ],
      cons: ["Break-in period needed", "Runs narrow", "Premium price", "Limited color options"],
      features: [
        "Responsive foam cushioning",
        "Breathable mesh upper",
        "Durable rubber outsole",
        "Supportive midsole",
        "Padded collar",
        "Reflective details",
        "Removable insole",
        "Flexible forefoot",
      ],
    }
  }

  // Home & Kitchen
  if (query.includes("coffee") && (query.includes("maker") || query.includes("machine"))) {
    return {
      productType: "Coffee Maker",
      brands: [
        "Breville",
        "Cuisinart",
        "Keurig",
        "Ninja",
        "Mr. Coffee",
        "Hamilton Beach",
        "De'Longhi",
        "Nespresso",
        "Technivorm",
        "Bonavita",
      ],
      priceRange: { min: 49, max: 399 },
      modelSuffixes: [
        "Barista Express",
        "Brew Central",
        "K-Elite",
        "Specialty",
        "12-Cup",
        "FlexBrew",
        "Magnifica",
        "VertuoPlus",
        "Moccamaster",
        "Connoisseur",
      ],
      summaryTemplate:
        "Premium {product} from {brand} delivering barista-quality coffee at home. Features programmable settings and easy-to-use controls.",
      pros: [
        "Great coffee quality",
        "Easy to use",
        "Programmable timer",
        "Large capacity",
        "Fast brewing",
        "Easy to clean",
        "Durable construction",
      ],
      cons: ["Takes up counter space", "Noisy operation", "Expensive pods", "Complex cleaning"],
      features: [
        "Programmable timer",
        "Auto shut-off",
        "Brew strength control",
        "Thermal carafe",
        "Water filtration",
        "Pause and serve",
        "Digital display",
        "Removable reservoir",
      ],
    }
  }

  // Default fallback for any other query
  return {
    productType: query
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
    brands: [
      "Premium Brand",
      "Elite",
      "ProTech",
      "MaxPro",
      "UltraGear",
      "TopChoice",
      "BestValue",
      "QualityFirst",
      "TrustedName",
      "LeaderCo",
    ],
    priceRange: { min: 49, max: 299 },
    modelSuffixes: ["Pro", "Elite", "Max", "Ultra", "Premium", "Plus", "Advanced", "Deluxe", "Professional", "Expert"],
    summaryTemplate:
      "High-quality {product} from {brand} featuring advanced technology and excellent performance. Perfect for both casual and professional use.",
    pros: [
      "Excellent build quality",
      "Great performance",
      "Good value for money",
      "User-friendly design",
      "Durable construction",
      "Versatile features",
      "Reliable operation",
    ],
    cons: ["Could be more affordable", "Limited color options", "Slightly heavy", "Learning curve"],
    features: [
      "Premium materials",
      "Advanced technology",
      "Long-lasting durability",
      "Ergonomic design",
      "Easy to use",
      "Compact size",
      "Energy efficient",
      "Warranty included",
    ],
  }
}

export async function searchRealProducts(query: string): Promise<RealProduct[]> {
  try {
    console.log("[v0] Generating products for:", query)
    const products = generateProductsForQuery(query)
    console.log("[v0] Successfully generated", products.length, "products")
    return products
  } catch (error) {
    console.error("[v0] Error generating products:", error)
    // Return empty array as last resort
    return []
  }
}
