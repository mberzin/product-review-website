"use client"

import type React from "react"

import { Suspense, useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Search, SlidersHorizontal, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProductFilters } from "@/components/product-filters"
import { ProductCard } from "@/components/product-card"
import { generateProductReviews } from "@/lib/generate-reviews"

function SearchResults() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.get("q") || ""

  const [searchQuery, setSearchQuery] = useState(query)
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    priceRange: "all",
    brands: [] as string[],
    minRating: 0,
  })

  useEffect(() => {
    if (query) {
      loadProducts(query)
    }
  }, [query])

  const loadProducts = async (searchQuery: string) => {
    setLoading(true)
    try {
      const results = await generateProductReviews(searchQuery)
      setProducts(results)
    } catch (error) {
      console.error("Error loading products:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const filteredProducts = products.filter((product) => {
    // Price filter
    if (filters.priceRange !== "all") {
      const price = product.price
      if (filters.priceRange === "under-50" && price >= 50) return false
      if (filters.priceRange === "50-100" && (price < 50 || price >= 100)) return false
      if (filters.priceRange === "100-200" && (price < 100 || price >= 200)) return false
      if (filters.priceRange === "over-200" && price < 200) return false
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
            <ProductFilters filters={filters} onFiltersChange={setFilters} availableBrands={availableBrands} />
          </aside>

          {/* Results */}
          <main className="flex-1 min-w-0">
            {loading ? (
              <div className="flex items-center justify-center py-24">
                <div className="text-center space-y-4">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                  <p className="text-muted-foreground">Analyzing products...</p>
                </div>
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
