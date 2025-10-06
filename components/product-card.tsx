import { Star, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProductCardProps {
  product: {
    name: string
    brand: string
    price: number
    rating: number
    reviewCount: number
    image: string // Keeping image property in interface for easy re-implementation
    summary: string
    pros: string[]
    cons: string[]
    affiliateLinks: {
      vendor: string
      url: string
      price: number
    }[]
  }
  rank: number
}

export function ProductCard({ product, rank }: ProductCardProps) {
  return (
    <Card className="p-6 hover:border-primary/50 transition-colors">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Rank Badge */}
        <div className="flex md:flex-col items-center md:items-start gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
            <span className="text-2xl font-bold text-primary">#{rank}</span>
          </div>
        </div>

        {/* 
        <div className="w-full md:w-48 h-48 bg-muted rounded-lg overflow-hidden shrink-0">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = `/placeholder.svg?height=400&width=400&query=${encodeURIComponent(product.name)}`
            }}
          />
        </div>
        */}

        {/* Product Details */}
        <div className="flex-1 space-y-4">
          <div>
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <Badge variant="secondary" className="mb-2">
                  {product.brand}
                </Badge>
                <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
              </div>
              <div className="text-right shrink-0">
                <div className="text-2xl font-bold">${product.price}</div>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  <span className="font-medium">{product.rating.toFixed(1)}</span>
                  <span className="text-muted-foreground">/5.0</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">{product.reviewCount.toLocaleString()} reviews</div>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">{product.summary}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-sm mb-2 text-green-600">Pros</h4>
              <ul className="space-y-1">
                {product.pros.map((pro, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">+</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2 text-red-600">Cons</h4>
              <ul className="space-y-1">
                {product.cons.map((con, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-red-600 mt-0.5">-</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-2">
            <h4 className="font-semibold text-sm mb-3">Where to Buy:</h4>
            <div className="flex flex-wrap gap-3">
              {product.affiliateLinks.map((link, index) => (
                <Button key={index} asChild variant={index === 0 ? "default" : "outline"} className="gap-2">
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.vendor} - ${link.price}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
