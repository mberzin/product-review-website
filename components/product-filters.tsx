"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Card } from "@/components/ui/card"

interface ProductFiltersProps {
  filters: {
    priceRange: string
    brands: string[]
    minRating: number
  }
  onFiltersChange: (filters: any) => void
  availableBrands: string[]
}

export function ProductFilters({ filters, onFiltersChange, availableBrands }: ProductFiltersProps) {
  const updateFilter = (key: string, value: any) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const toggleBrand = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand]
    updateFilter("brands", newBrands)
  }

  return (
    <Card className="p-6 space-y-6 sticky top-24">
      <div>
        <h3 className="font-semibold mb-4">Filters</h3>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Price Range</Label>
        <RadioGroup value={filters.priceRange} onValueChange={(value) => updateFilter("priceRange", value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all" />
            <Label htmlFor="all" className="font-normal cursor-pointer">
              All Prices
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="under-50" id="under-50" />
            <Label htmlFor="under-50" className="font-normal cursor-pointer">
              Under $50
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="50-100" id="50-100" />
            <Label htmlFor="50-100" className="font-normal cursor-pointer">
              $50 - $100
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="100-200" id="100-200" />
            <Label htmlFor="100-200" className="font-normal cursor-pointer">
              $100 - $200
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="over-200" id="over-200" />
            <Label htmlFor="over-200" className="font-normal cursor-pointer">
              Over $200
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Brands */}
      {availableBrands.length > 0 && (
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Brand</Label>
          <div className="space-y-2">
            {availableBrands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={brand}
                  checked={filters.brands.includes(brand)}
                  onCheckedChange={() => toggleBrand(brand)}
                />
                <Label htmlFor={brand} className="font-normal cursor-pointer">
                  {brand}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Minimum Rating */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-semibold">Minimum Rating</Label>
          <span className="text-sm text-muted-foreground">{filters.minRating.toFixed(1)}+</span>
        </div>
        <Slider
          value={[filters.minRating]}
          onValueChange={([value]) => updateFilter("minRating", value)}
          min={0}
          max={5}
          step={0.5}
          className="w-full"
        />
      </div>

      {/* Reset Filters */}
      <button
        onClick={() => onFiltersChange({ priceRange: "all", brands: [], minRating: 0 })}
        className="text-sm text-primary hover:underline w-full text-left"
      >
        Reset all filters
      </button>
    </Card>
  )
}
