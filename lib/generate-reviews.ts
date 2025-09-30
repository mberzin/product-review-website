export async function generateProductReviews(query: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  const category = extractCategory(query)
  const products = generateProductsForCategory(category, query)

  return products
}

function extractCategory(query: string): string {
  const lowerQuery = query.toLowerCase()

  // Extract product category from search query
  if (lowerQuery.includes("golf") || lowerQuery.includes("bag")) return "golf-bags"
  if (lowerQuery.includes("laptop") || lowerQuery.includes("computer")) return "laptops"
  if (lowerQuery.includes("phone") || lowerQuery.includes("smartphone")) return "smartphones"
  if (lowerQuery.includes("camera")) return "cameras"
  if (lowerQuery.includes("watch") || lowerQuery.includes("smartwatch")) return "smartwatches"
  if (lowerQuery.includes("headphone") || lowerQuery.includes("earbuds")) return "headphones"
  if (lowerQuery.includes("speaker")) return "speakers"
  if (lowerQuery.includes("tablet")) return "tablets"
  if (lowerQuery.includes("tv") || lowerQuery.includes("television")) return "tvs"
  if (lowerQuery.includes("coffee") || lowerQuery.includes("espresso")) return "coffee-makers"
  if (lowerQuery.includes("vacuum")) return "vacuums"
  if (lowerQuery.includes("blender")) return "blenders"
  if (lowerQuery.includes("mattress")) return "mattresses"
  if (lowerQuery.includes("chair") || lowerQuery.includes("desk")) return "office-chairs"
  if (lowerQuery.includes("backpack")) return "backpacks"
  if (lowerQuery.includes("shoe") || lowerQuery.includes("sneaker")) return "shoes"
  if (lowerQuery.includes("bike") || lowerQuery.includes("bicycle")) return "bikes"
  if (lowerQuery.includes("tent") || lowerQuery.includes("camping")) return "tents"

  // Default to generic category
  return "general"
}

function generateProductsForCategory(category: string, query: string) {
  const categoryData: Record<string, any> = {
    "golf-bags": {
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
        "Ogio",
        "Nike",
      ],
      priceRange: [89, 499],
      features: [
        ["14-way top divider", "Full-length dividers", "Lightweight design", "9 pockets"],
        ["Cart strap pass-through", "Insulated cooler pocket", "Velour-lined valuables pocket", "Rain hood included"],
        ["Stand mechanism", "Dual shoulder straps", "Waterproof material", "7 pockets"],
        ["Premium leather accents", "Magnetic pockets", "15-way top", "Integrated putter well"],
        ["Ultra-lightweight (4.5 lbs)", "Collapsible design", "6 pockets", "Comfortable straps"],
        ["Tour-level organization", "Ball pocket", "Apparel pocket", "Accessory pocket"],
        ["Durable construction", "Easy-access pockets", "Umbrella holder", "Towel ring"],
        ["Ergonomic handle", "Reinforced bottom", "Multiple color options", "8 pockets"],
        ["Quick-access pocket", "Beverage holder", "Scorecard pocket", "Glove holder"],
        ["Premium zippers", "Padded shoulder straps", "Ventilated pocket", "Grab handles"],
      ],
      vendors: ["Amazon", "Dick's Sporting Goods", "Golf Galaxy", "PGA Tour Superstore", "Walmart"],
    },
    laptops: {
      productType: "Laptop",
      brands: ["Apple", "Dell", "HP", "Lenovo", "ASUS", "Acer", "Microsoft", "MSI", "Razer", "Samsung"],
      priceRange: [499, 2499],
      features: [
        ["Intel Core i7", "16GB RAM", "512GB SSD", '15.6" Full HD display'],
        ["Apple M2 chip", "8GB unified memory", "256GB SSD", '13.3" Retina display'],
        ["AMD Ryzen 7", "32GB RAM", "1TB SSD", "RTX 3060 graphics"],
        ["Intel Core i5", "8GB RAM", "256GB SSD", '14" touchscreen'],
        ["Long battery life (12 hours)", "Lightweight (2.8 lbs)", "Backlit keyboard", "Fingerprint reader"],
        ["4K OLED display", "Thunderbolt 4 ports", "Wi-Fi 6E", "Premium aluminum build"],
        ["Gaming-optimized cooling", "RGB keyboard", "144Hz display", "Dedicated GPU"],
        ["2-in-1 convertible design", "Stylus included", "Touchscreen", "360° hinge"],
        ["Business-class security", "Durable MIL-STD tested", "Excellent keyboard", "Docking support"],
        ["Ultra-portable", "Fanless design", "All-day battery", "USB-C charging"],
      ],
      vendors: ["Amazon", "Best Buy", "Walmart", "Newegg", "B&H Photo"],
    },
    smartphones: {
      productType: "Smartphone",
      brands: ["Apple", "Samsung", "Google", "OnePlus", "Motorola", "Xiaomi", "Sony", "ASUS", "Nothing", "Oppo"],
      priceRange: [299, 1199],
      features: [
        ['6.7" OLED display', "120Hz refresh rate", "5G connectivity", "50MP camera"],
        ["A17 Pro chip", "ProMotion display", "Titanium design", "USB-C port"],
        ["Snapdragon 8 Gen 3", "12GB RAM", "256GB storage", "Fast charging"],
        ["Triple camera system", "Night mode", "8K video", "Optical zoom"],
        ["Long battery life (2 days)", "5000mAh battery", "Wireless charging", "Reverse charging"],
        ["Stock Android", "Clean UI", "Fast updates", "No bloatware"],
        ["Water resistant IP68", "Gorilla Glass Victus", "Premium build", "Wireless charging"],
        ["Under-display fingerprint", "Face unlock", "Stereo speakers", "Dolby Atmos"],
        ["Excellent camera quality", "Computational photography", "Portrait mode", "HDR+"],
        ["Affordable flagship", "Great value", "Solid performance", "Good battery"],
      ],
      vendors: ["Amazon", "Best Buy", "Walmart", "Carrier Store", "Manufacturer Direct"],
    },
    headphones: {
      productType: "Headphones",
      brands: ["Sony", "Bose", "Apple", "Sennheiser", "Audio-Technica", "Beats", "JBL", "Anker", "Jabra", "Samsung"],
      priceRange: [59, 399],
      features: [
        ["Active noise cancellation", "30-hour battery", "Premium sound", "Comfortable fit"],
        ["Wireless Bluetooth 5.3", "Quick charge", "Foldable design", "Carrying case"],
        ["Studio-quality sound", "Wired connection", "Detachable cable", "Professional grade"],
        ["Spatial audio", "Transparency mode", "Adaptive EQ", "Premium materials"],
        ["Budget-friendly", "Good battery life", "Decent sound", "Lightweight"],
        ["Sport-focused design", "Sweat resistant", "Secure fit", "IPX7 rating"],
        ["Gaming optimized", "Low latency", "Surround sound", "Detachable mic"],
        ["Compact foldable", "Travel-friendly", "Hard case included", "Portable"],
        ["Kids-safe volume limit", "Durable build", "Colorful design", "Affordable"],
        ["Eco-friendly materials", "Sustainable", "Carbon neutral", "Recycled packaging"],
      ],
      vendors: ["Amazon", "Best Buy", "Walmart", "Target", "B&H Photo"],
    },
  }

  // Get category data or use general fallback
  const data = categoryData[category] || {
    productType: query
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
    brands: [
      "Premium Brand",
      "Quality Co",
      "Elite Products",
      "Pro Series",
      "Value Brand",
      "Tech Solutions",
      "Innovation Labs",
      "Smart Choice",
      "Best Buy",
      "Top Tier",
    ],
    priceRange: [49, 599],
    features: [
      ["High quality", "Durable construction", "Great value", "Popular choice"],
      ["Premium materials", "Excellent performance", "Reliable", "Well-reviewed"],
      ["Affordable option", "Good features", "Solid build", "User-friendly"],
      ["Advanced technology", "Modern design", "Efficient", "Innovative"],
      ["Compact size", "Lightweight", "Portable", "Convenient"],
      ["Professional grade", "Industry standard", "Trusted brand", "Proven quality"],
      ["Budget-friendly", "Best value", "Cost-effective", "Smart purchase"],
      ["Premium features", "Top-rated", "Award-winning", "Customer favorite"],
      ["Eco-friendly", "Sustainable", "Energy efficient", "Green choice"],
      ["Versatile", "Multi-purpose", "Flexible", "Adaptable"],
    ],
    vendors: ["Amazon", "Walmart", "Best Buy", "Target", "eBay"],
  }

  const products = []
  const usedBrands = new Set<string>()

  for (let i = 0; i < 10; i++) {
    // Select unique brand
    let brand = data.brands[i % data.brands.length]
    while (usedBrands.has(brand) && usedBrands.size < data.brands.length) {
      brand = data.brands[Math.floor(Math.random() * data.brands.length)]
    }
    usedBrands.add(brand)

    const modelSuffix = ["Pro", "Elite", "Plus", "Max", "Ultra", "Premium", "Sport", "Lite", "Classic", "Advanced"][i]
    const price = Math.round(data.priceRange[0] + (data.priceRange[1] - data.priceRange[0]) * (i / 9))
    const rating = 4.2 + Math.random() * 0.7
    const features = data.features[i]

    const vendor = data.vendors[i % data.vendors.length]
    const productId = generateProductId(vendor)
    const vendorUrl = generateVendorUrl(vendor, productId, brand, modelSuffix, data.productType)

    products.push({
      name: `${brand} ${data.productType} ${modelSuffix}`,
      brand,
      price,
      rating: Math.round(rating * 10) / 10,
      image: `/placeholder.svg?height=400&width=400&query=${encodeURIComponent(`${brand} ${data.productType} ${modelSuffix} product photo`)}`,
      summary: generateSummary(data.productType, brand, modelSuffix, features, price),
      pros: generatePros(features, price, data.priceRange),
      cons: generateCons(price, data.priceRange, i),
      vendor,
      vendorUrl,
    })
  }

  return products
}

function generateProductId(vendor: string): string {
  // Generate realistic product IDs for different vendors
  if (vendor === "Amazon") {
    // Amazon ASIN format (10 characters, alphanumeric)
    return "B0" + Math.random().toString(36).substring(2, 10).toUpperCase()
  } else if (vendor === "Walmart") {
    // Walmart item number (9 digits)
    return Math.floor(100000000 + Math.random() * 900000000).toString()
  } else if (vendor === "Best Buy") {
    // Best Buy SKU (7 digits)
    return Math.floor(1000000 + Math.random() * 9000000).toString()
  } else {
    // Generic product ID
    return Math.random().toString(36).substring(2, 12).toUpperCase()
  }
}

function generateVendorUrl(
  vendor: string,
  productId: string,
  brand: string,
  model: string,
  productType: string,
): string {
  const productSlug = `${brand}-${productType}-${model}`.toLowerCase().replace(/\s+/g, "-")

  if (vendor === "Amazon") {
    return `https://www.amazon.com/dp/${productId}`
  } else if (vendor === "Walmart") {
    return `https://www.walmart.com/ip/${productSlug}/${productId}`
  } else if (vendor === "Best Buy") {
    return `https://www.bestbuy.com/site/${productSlug}/${productId}.p`
  } else if (vendor === "Target") {
    return `https://www.target.com/p/${productSlug}/-/A-${productId}`
  } else if (vendor === "Dick's Sporting Goods") {
    return `https://www.dickssportinggoods.com/p/${productSlug}-${productId}`
  } else if (vendor === "Golf Galaxy") {
    return `https://www.golfgalaxy.com/p/${productSlug}-${productId}`
  } else if (vendor === "PGA Tour Superstore") {
    return `https://www.pgatoursuperstore.com/p/${productSlug}-${productId}`
  } else if (vendor === "Newegg") {
    return `https://www.newegg.com/p/${productId}`
  } else if (vendor === "B&H Photo") {
    return `https://www.bhphotovideo.com/c/product/${productId}`
  } else {
    // Generic vendor URL
    return `https://www.${vendor.toLowerCase().replace(/\s+/g, "")}.com/product/${productId}`
  }
}

function generateSummary(productType: string, brand: string, model: string, features: string[], price: number): string {
  const qualityLevel = price > 300 ? "premium" : price > 150 ? "high-quality" : "reliable"
  const audience = price > 300 ? "professionals and enthusiasts" : price > 150 ? "serious users" : "everyday users"

  return `${qualityLevel.charAt(0).toUpperCase() + qualityLevel.slice(1)} ${productType.toLowerCase()} from ${brand} featuring ${features[0].toLowerCase()} and ${features[1].toLowerCase()}. Perfect for ${audience} seeking quality and performance.`
}

function generatePros(features: string[], price: number, priceRange: number[]): string[] {
  const pros = [...features]

  if (price < priceRange[0] + (priceRange[1] - priceRange[0]) * 0.3) {
    pros.push("Excellent value for money")
  } else if (price > priceRange[0] + (priceRange[1] - priceRange[0]) * 0.7) {
    pros.push("Premium build quality")
  }

  return pros.slice(0, 4)
}

function generateCons(price: number, priceRange: number[], index: number): string[] {
  const cons: string[] = []

  if (price > priceRange[0] + (priceRange[1] - priceRange[0]) * 0.7) {
    cons.push("Premium price point")
  } else if (price < priceRange[0] + (priceRange[1] - priceRange[0]) * 0.3) {
    cons.push("Basic features compared to premium models")
  }

  const possibleCons = [
    "Limited color options",
    "Heavier than some competitors",
    "No carrying case included",
    "Shorter warranty period",
    "May not fit all preferences",
    "Some users report minor issues",
    "Not the latest model",
    "Limited availability",
  ]

  cons.push(possibleCons[index % possibleCons.length])

  return cons.slice(0, 2)
}
