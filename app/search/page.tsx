"use client"

import type React from "react"

import { Suspense, useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Search, SlidersHorizontal, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProductFilters } from "@/components/product-filters"
import { ProductCard } from "@/components/product-card"
import { searchRealProducts } from "@/lib/search-real-products"

function generatePriceRanges(products: any[]) {
  if (products.length === 0) {
    return [
      { id: "under-50", label: "Under $50", min: 0, max: 50 },
      { id: "50-100", label: "$50 - $100", min: 50, max: 100 },
      { id: "100-200", label: "$100 - $200", min: 100, max: 200 },
      { id: "over-200", label: "Over $200", min: 200, max: Number.POSITIVE_INFINITY },
    ]
  }

  const prices = products.map((p) => p.price).sort((a, b) => a - b)
  const minPrice = Math.floor(prices[0])
  const maxPrice = Math.ceil(prices[prices.length - 1])
  const range = maxPrice - minPrice

  // Generate 4 price buckets based on the actual price range
  if (range < 50) {
    // Small range (e.g., $10-$40)
    const step = Math.ceil(range / 4)
    return [
      { id: "range-1", label: `Under $${minPrice + step}`, min: 0, max: minPrice + step },
      {
        id: "range-2",
        label: `$${minPrice + step} - $${minPrice + step * 2}`,
        min: minPrice + step,
        max: minPrice + step * 2,
      },
      {
        id: "range-3",
        label: `$${minPrice + step * 2} - $${minPrice + step * 3}`,
        min: minPrice + step * 2,
        max: minPrice + step * 3,
      },
      { id: "range-4", label: `Over $${minPrice + step * 3}`, min: minPrice + step * 3, max: Number.POSITIVE_INFINITY },
    ]
  } else if (range < 200) {
    // Medium range (e.g., $50-$200)
    const step = Math.ceil(range / 4 / 10) * 10 // Round to nearest 10
    return [
      { id: "range-1", label: `Under $${minPrice + step}`, min: 0, max: minPrice + step },
      {
        id: "range-2",
        label: `$${minPrice + step} - $${minPrice + step * 2}`,
        min: minPrice + step,
        max: minPrice + step * 2,
      },
      {
        id: "range-3",
        label: `$${minPrice + step * 2} - $${minPrice + step * 3}`,
        min: minPrice + step * 2,
        max: minPrice + step * 3,
      },
      { id: "range-4", label: `Over $${minPrice + step * 3}`, min: minPrice + step * 3, max: Number.POSITIVE_INFINITY },
    ]
  } else {
    // Large range (e.g., $100-$1000+)
    const step = Math.ceil(range / 4 / 50) * 50 // Round to nearest 50
    return [
      { id: "range-1", label: `Under $${minPrice + step}`, min: 0, max: minPrice + step },
      {
        id: "range-2",
        label: `$${minPrice + step} - $${minPrice + step * 2}`,
        min: minPrice + step,
        max: minPrice + step * 2,
      },
      {
        id: "range-3",
        label: `$${minPrice + step * 2} - $${minPrice + step * 3}`,
        min: minPrice + step * 2,
        max: minPrice + step * 3,
      },
      { id: "range-4", label: `Over $${minPrice + step * 3}`, min: minPrice + step * 3, max: Number.POSITIVE_INFINITY },
    ]
  }
}

function SearchResults() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.get("q") || ""

  const [searchQuery, setSearchQuery] = useState(query)
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    priceRange: "all",
    brands: [] as string[],
    minRating: 0,
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/search?q=${searchQuery}`)
  }

  useEffect(() => {
    if (query) {
      loadProducts(query)
    }
  }, [query])

  const loadProducts = async (searchQuery: string) => {
    setLoading(true)
    setError(null)
    try {
      console.log("[v0] Searching for real products:", searchQuery)
      const results = await searchRealProducts(searchQuery)
      console.log("[v0] Found products:", results.length)
      setProducts(results)
    } catch (error) {
      console.error("[v0] Error loading products:", error)
      setError("Failed to load products. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const priceRanges = generatePriceRanges(products)

  const filteredProducts = products.filter((product) => {
    // Price filter
    if (filters.priceRange !== "all") {
      const selectedRange = priceRanges.find((r) => r.id === filters.priceRange)
      if (selectedRange) {
        const price = product.price
        if (price < selectedRange.min || price >= selectedRange.max) {
          return false
        }
      }
    }

    // Brand filter
    if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
      return false
    }

    // Rating filter
    if (product.rating < filters.minRating) {
      return false
    }

    return true
  })

  const availableBrands = Array.from(new Set(products.map((p) => p.brand)))

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">R</span>
              </div>
              <span className="text-xl font-semibold hidden sm:inline">ReviewAI</span>
            </a>

            <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 bg-card"
                />
              </div>
            </form>

            <Button
              variant="outline"
              size="icon"
              className="md:hidden bg-transparent"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <aside className={`${showFilters ? "block" : "hidden"} md:block w-full md:w-64 shrink-0`}>
            <ProductFilters
              filters={filters}
              onFiltersChange={setFilters}
              availableBrands={availableBrands}
              priceRanges={priceRanges}
            />
          </aside>

          {/* Results */}
          <main className="flex-1 min-w-0">
            {loading ? (
              <div className="flex items-center justify-center py-24">
                <div className="text-center space-y-4">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                  <p className="text-muted-foreground">Searching for real products across the web...</p>
                  <p className="text-sm text-muted-foreground">This may take a moment...</p>
                </div>
              </div>
            ) : error ? (
              <div className="text-center py-24">
                <p className="text-destructive mb-4">{error}</p>
                <Button onClick={() => loadProducts(query)}>Try Again</Button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h1 className="text-2xl font-bold mb-2">Results for "{query}"</h1>
                  <p className="text-muted-foreground">
                    {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} found
                  </p>
                </div>

                {filteredProducts.length === 0 ? (
                  <div className="text-center py-24">
                    <p className="text-muted-foreground">No products match your filters. Try adjusting them.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredProducts.map((product, index) => (
                      <ProductCard key={index} product={product} rank={index + 1} />
                    ))}
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  )
}
