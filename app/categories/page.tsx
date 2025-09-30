"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import {
  Laptop,
  Headphones,
  Smartphone,
  Watch,
  Camera,
  Gamepad2,
  Home,
  Dumbbell,
  Shirt,
  Baby,
  Book,
  Utensils,
  Wrench,
  Sparkles,
  Car,
  PawPrint,
} from "lucide-react"

interface Category {
  name: string
  query: string
  icon: React.ReactNode
  description: string
}

const categories: Category[] = [
  {
    name: "Electronics",
    query: "best electronics",
    icon: <Laptop className="w-8 h-8" />,
    description: "Laptops, tablets, and computers",
  },
  {
    name: "Audio",
    query: "best headphones and speakers",
    icon: <Headphones className="w-8 h-8" />,
    description: "Headphones, speakers, and audio gear",
  },
  {
    name: "Mobile Phones",
    query: "best smartphones",
    icon: <Smartphone className="w-8 h-8" />,
    description: "Smartphones and accessories",
  },
  {
    name: "Wearables",
    query: "best smartwatches and fitness trackers",
    icon: <Watch className="w-8 h-8" />,
    description: "Smartwatches and fitness trackers",
  },
  {
    name: "Cameras",
    query: "best cameras",
    icon: <Camera className="w-8 h-8" />,
    description: "Digital cameras and photography",
  },
  {
    name: "Gaming",
    query: "best gaming gear",
    icon: <Gamepad2 className="w-8 h-8" />,
    description: "Gaming consoles and accessories",
  },
  {
    name: "Home & Kitchen",
    query: "best home and kitchen appliances",
    icon: <Home className="w-8 h-8" />,
    description: "Appliances and home essentials",
  },
  {
    name: "Sports & Fitness",
    query: "best fitness equipment",
    icon: <Dumbbell className="w-8 h-8" />,
    description: "Exercise equipment and gear",
  },
  {
    name: "Fashion",
    query: "best clothing and accessories",
    icon: <Shirt className="w-8 h-8" />,
    description: "Clothing, shoes, and accessories",
  },
  {
    name: "Baby & Kids",
    query: "best baby products",
    icon: <Baby className="w-8 h-8" />,
    description: "Baby gear and kids products",
  },
  {
    name: "Books & Media",
    query: "best books and media",
    icon: <Book className="w-8 h-8" />,
    description: "Books, movies, and entertainment",
  },
  {
    name: "Food & Beverage",
    query: "best kitchen appliances",
    icon: <Utensils className="w-8 h-8" />,
    description: "Coffee makers, blenders, and more",
  },
  {
    name: "Tools & Hardware",
    query: "best tools",
    icon: <Wrench className="w-8 h-8" />,
    description: "Power tools and hardware",
  },
  {
    name: "Beauty & Personal Care",
    query: "best beauty products",
    icon: <Sparkles className="w-8 h-8" />,
    description: "Skincare, makeup, and grooming",
  },
  {
    name: "Automotive",
    query: "best car accessories",
    icon: <Car className="w-8 h-8" />,
    description: "Car parts and accessories",
  },
  {
    name: "Pet Supplies",
    query: "best pet products",
    icon: <PawPrint className="w-8 h-8" />,
    description: "Pet food, toys, and accessories",
  },
]

export default function CategoriesPage() {
  const router = useRouter()

  const handleCategoryClick = (query: string) => {
    router.push(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">R</span>
            </div>
            <span className="text-xl font-semibold">ReviewAI</span>
          </a>
          <nav className="hidden md:flex items-center gap-6">
            <a href="/categories" className="text-sm text-foreground font-medium">
              Categories
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-12">
        <div className="container mx-auto max-w-7xl">
          <div className="space-y-4 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Browse by Category</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Explore our curated product categories to find the best reviews and recommendations for your needs.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => handleCategoryClick(category.query)}
                className="group p-6 bg-card border border-border rounded-lg hover:border-primary hover:shadow-lg transition-all duration-200 text-left"
              >
                <div className="flex flex-col gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {category.icon}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 ReviewAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
