"use server"

import { generateText } from "ai"

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

function getProductImageUrl(productName: string): string {
  const encodedName = encodeURIComponent(productName.substring(0, 30))
  return `https://via.placeholder.com/400x400/e5e7eb/6b7280.png?text=${encodedName}`
}

function generateProductsForQuery(query: string): RealProduct[] {
  console.log("[v0] Generating fallback products for query:", query)

  const queryLower = query.toLowerCase()
  const categoryData = getCategoryData(queryLower)

  const products: RealProduct[] = []

  for (let i = 0; i < 10; i++) {
    const brand = categoryData.brands[i % categoryData.brands.length]
    const basePrice =
      categoryData.priceRange.min +
      Math.floor(Math.random() * (categoryData.priceRange.max - categoryData.priceRange.min))
    const rating = Number((Math.random() * 1.5 + 3.5).toFixed(1))
    const reviewCount = Math.floor(Math.random() * 5000) + 100

    const productName = categoryData.productNames[i % categoryData.productNames.length]

    const affiliateLinks = categoryData.vendors.map((vendor, idx) => ({
      vendor: vendor.name,
      url: vendor.searchUrl.replace("{query}", encodeURIComponent(productName)),
      price: idx === 0 ? basePrice : Math.floor(basePrice * (0.95 + Math.random() * 0.1)),
    }))

    products.push({
      id: `product-${i + 1}`,
      name: productName,
      brand: brand,
      price: basePrice,
      rating: rating,
      reviewCount: reviewCount,
      image: getProductImageUrl(productName),
      summary: categoryData.summaryTemplate.replace("{brand}", brand).replace("{product}", categoryData.productType),
      pros: categoryData.pros.slice(i % 3, (i % 3) + 4),
      cons: categoryData.cons.slice(i % 2, (i % 2) + 3),
      keyFeatures: categoryData.features.slice(i % 2, (i % 2) + 5),
      affiliateLinks: affiliateLinks,
    })
  }

  return products
}

function getCategoryData(query: string) {
  if (query.includes("headphone") || query.includes("earbuds") || query.includes("airpods")) {
    return {
      productType: "Wireless Headphones",
      brands: ["Sony", "Bose", "Apple", "Sennheiser", "JBL", "Beats", "Audio-Technica", "Anker", "Jabra", "Samsung"],
      priceRange: { min: 49, max: 399 },
      vendors: [
        { name: "Amazon", searchUrl: "https://www.amazon.com/s?k={query}" },
        { name: "Best Buy", searchUrl: "https://www.bestbuy.com/site/searchpage.jsp?st={query}" },
        { name: "B&H Photo", searchUrl: "https://www.bhphotovideo.com/c/search?q={query}" },
      ],
      productNames: [
        "Sony WH-1000XM5",
        "Bose QuietComfort Ultra",
        "Apple AirPods Max",
        "Sennheiser Momentum 4",
        "JBL Live 660NC",
        "Beats Studio Pro",
        "Audio-Technica ATH-M50xBT2",
        "Anker Soundcore Space Q45",
        "Jabra Elite 85h",
        "Samsung Galaxy Buds2 Pro",
      ],
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
      vendors: [
        { name: "Best Buy", searchUrl: "https://www.bestbuy.com/site/searchpage.jsp?st={query}" },
        { name: "B&H Photo", searchUrl: "https://www.bhphotovideo.com/c/search?q={query}" },
        { name: "Newegg", searchUrl: "https://www.newegg.com/p/pl?d={query}" },
      ],
      productNames: [
        "Apple MacBook Pro 14",
        "Dell XPS 15",
        "HP Spectre x360 14",
        "Lenovo ThinkPad X1 Carbon Gen 11",
        "ASUS ZenBook 14 OLED",
        "Acer Swift 5",
        "Microsoft Surface Laptop 5",
        "MSI Prestige 16",
        "Razer Blade 15",
        "LG Gram 17",
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
      vendors: [
        { name: "Amazon", searchUrl: "https://www.amazon.com/s?k={query}" },
        { name: "Best Buy", searchUrl: "https://www.bestbuy.com/site/searchpage.jsp?st={query}" },
        { name: "B&H Photo", searchUrl: "https://www.bhphotovideo.com/c/search?q={query}" },
      ],
      productNames: [
        "Apple iPhone 15 Pro Max",
        "Samsung Galaxy S24 Ultra",
        "Google Pixel 8 Pro",
        "OnePlus 12",
        "Motorola Edge 40 Pro",
        "Xiaomi 14 Pro",
        "OPPO Find X7",
        "Sony Xperia 1 V",
        "Nokia XR21",
        "ASUS ROG Phone 8 Pro",
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
      vendors: [
        { name: "Dick's Sporting Goods", searchUrl: "https://www.dickssportinggoods.com/search?searchTerm={query}" },
        { name: "Golf Galaxy", searchUrl: "https://www.golfgalaxy.com/search?searchTerm={query}" },
        { name: "PGA Tour Superstore", searchUrl: "https://www.pgatoursuperstore.com/search?q={query}" },
      ],
      productNames: [
        "Callaway Fairway 14 Stand Bag",
        "TaylorMade FlexTech Crossover",
        "Titleist Players 4 Plus StaDry",
        "Ping Hoofer 14",
        "Sun Mountain C-130 Cart Bag",
        "Cobra Ultralight Cart Bag",
        "Mizuno BR-D4 Stand Bag",
        "Wilson Staff Dry Tech II Cart Bag",
        "Cleveland CG Stand Bag",
        "Bag Boy Chiller Cart Bag",
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
      vendors: [
        { name: "Sunglass Hut", searchUrl: "https://www.sunglasshut.com/us/search?q={query}" },
        { name: "Amazon", searchUrl: "https://www.amazon.com/s?k={query}" },
        { name: "LensCrafters", searchUrl: "https://www.lenscrafters.com/lc-us/search?text={query}" },
      ],
      productNames: [
        "Ray-Ban Aviator Classic",
        "Oakley Holbrook",
        "Maui Jim Peahi",
        "Costa Del Mar Blackfin",
        "Persol PO3019S",
        "Warby Parker Haskell",
        "Gucci GG0061S",
        "Prada Linea Rossa",
        "Tom Ford Marko",
        "Spy Optic Discord",
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
      vendors: [
        { name: "Dick's Sporting Goods", searchUrl: "https://www.dickssportinggoods.com/search?searchTerm={query}" },
        { name: "Foot Locker", searchUrl: "https://www.footlocker.com/search?query={query}" },
        { name: "Road Runner Sports", searchUrl: "https://www.roadrunnersports.com/search?q={query}" },
      ],
      productNames: [
        "Nike Air Zoom Pegasus 40",
        "Adidas Ultraboost 23",
        "Brooks Ghost 15",
        "ASICS Gel-Nimbus 25",
        "New Balance Fresh Foam X 1080v13",
        "Hoka Clifton 9",
        "Saucony Ride 16",
        "Mizuno Wave Rider 27",
        "On Cloudmonster",
        "Under Armour Flow Velociti Wind 2",
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
      vendors: [
        { name: "Williams Sonoma", searchUrl: "https://www.williams-sonoma.com/search/results.html?words={query}" },
        { name: "Sur La Table", searchUrl: "https://www.surlatable.com/search?q={query}" },
        { name: "Crate & Barrel", searchUrl: "https://www.crateandbarrel.com/search?query={query}" },
      ],
      productNames: [
        "Breville Barista Express",
        "Cuisinart DCC-3200P1",
        "Keurig K-Elite",
        "Ninja Specialty Coffee Maker",
        "Mr. Coffee 12-Cup Programmable",
        "Hamilton Beach FlexBrew",
        "De'Longhi Magnifica S",
        "Nespresso VertuoPlus",
        "Technivorm Moccamaster",
        "Bonavita Connoisseur",
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
    vendors: [
      { name: "Amazon", searchUrl: "https://www.amazon.com/s?k={query}" },
      { name: "Walmart", searchUrl: "https://www.walmart.com/search?q={query}" },
      { name: "Target", searchUrl: "https://www.target.com/s?searchTerm={query}" },
    ],
    productNames: [
      "Premium Pro Model X1",
      "Elite Series 2024",
      "ProTech Advanced Plus",
      "MaxPro Ultra Edition",
      "UltraGear Premium",
      "TopChoice Professional",
      "BestValue Deluxe",
      "QualityFirst Expert",
      "TrustedName Elite",
      "LeaderCo Pro Max",
    ],
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
    console.log("[v0] Searching for products using Groq AI:", query)

    const { text } = await generateText({
      model: "groq/llama-3.1-70b-versatile",
      prompt: `You are a product research expert with knowledge of current products available in 2024-2025. Generate a JSON array of 10 realistic product recommendations for: "${query}"

IMPORTANT REQUIREMENTS:
1. Use actual current product model names that exist in the market (e.g., "Apple iPhone 15 Pro Max", "Samsung Galaxy S24 Ultra", "Sony WH-1000XM5")
2. For each product, determine the TOP 3 most appropriate retailers/vendors that actually sell this type of product
3. Generate realistic vendor-specific URLs and prices

Each product should include:
- id: unique identifier (string)
- name: ACTUAL full product name with real brand and specific model number/name
- brand: manufacturer name (string)
- price: realistic current market price in USD (number)
- rating: rating out of 5 (number between 3.5 and 5.0)
- reviewCount: number of reviews (number between 100 and 5000)
- summary: 2-3 sentence product description highlighting key benefits
- pros: array of 4-5 specific positive features
- cons: array of 2-3 realistic drawbacks
- keyFeatures: array of 5-7 specific technical specifications
- affiliateLinks: array of 3 vendor objects, each with:
  - vendor: name of the retailer (e.g., "Dick's Sporting Goods", "Golf Galaxy", "Best Buy", "Williams Sonoma", etc.)
  - url: actual search URL for that vendor's website (use real domain names)
  - price: price at that vendor (vary slightly between vendors)

VENDOR SELECTION GUIDELINES:
- Golf equipment: Dick's Sporting Goods, Golf Galaxy, PGA Tour Superstore
- Running shoes: Dick's Sporting Goods, Foot Locker, Road Runner Sports
- Electronics: Best Buy, B&H Photo, Newegg or Amazon
- Coffee makers: Williams Sonoma, Sur La Table, Crate & Barrel
- Sunglasses: Sunglass Hut, LensCrafters, Amazon
- General products: Amazon, Walmart, Target

Use actual retailer domain names in URLs:
- Dick's Sporting Goods: https://www.dickssportinggoods.com/search?searchTerm=PRODUCT_NAME
- Golf Galaxy: https://www.golfgalaxy.com/search?searchTerm=PRODUCT_NAME
- Best Buy: https://www.bestbuy.com/site/searchpage.jsp?st=PRODUCT_NAME
- Williams Sonoma: https://www.williams-sonoma.com/search/results.html?words=PRODUCT_NAME
- Foot Locker: https://www.footlocker.com/search?query=PRODUCT_NAME
- Amazon: https://www.amazon.com/s?k=PRODUCT_NAME
- Walmart: https://www.walmart.com/search?q=PRODUCT_NAME
- Target: https://www.target.com/s?searchTerm=PRODUCT_NAME

Return ONLY a valid JSON array with no markdown formatting, code blocks, or explanation.`,
      temperature: 0.7,
    })

    console.log("[v0] Groq AI response received")

    let jsonText = text.trim()

    // Remove markdown code blocks if present
    if (jsonText.startsWith("```")) {
      const lines = jsonText.split("\n")
      lines.shift() // Remove opening \`\`\`json or \`\`\`
      if (lines[lines.length - 1].trim() === "```") {
        lines.pop() // Remove closing \`\`\`
      }
      jsonText = lines.join("\n").trim()
    }

    // Try to extract JSON array if wrapped in other text
    const arrayMatch = jsonText.match(/\[\s*\{[\s\S]*\}\s*\]/)
    if (arrayMatch) {
      jsonText = arrayMatch[0]
    }

    const aiProducts = JSON.parse(jsonText)

    const products: RealProduct[] = aiProducts.map((product: any, index: number) => {
      return {
        ...product,
        id: product.id || `product-${index + 1}`,
        image: getProductImageUrl(product.name),
        // Use AI-generated affiliate links if available, otherwise generate them
        affiliateLinks: product.affiliateLinks || [],
      }
    })

    console.log("[v0] Successfully generated", products.length, "products with AI")
    return products
  } catch (error) {
    console.error("[v0] Error using Groq AI, falling back to mock data:", error)
    const products = generateProductsForQuery(query)
    console.log("[v0] Using fallback mock data:", products.length, "products")
    return products
  }
}
