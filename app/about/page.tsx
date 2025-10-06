export default function AboutPage() {
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
            <a href="/categories" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Categories
            </a>
            <a href="/about" className="text-sm text-foreground font-medium">
              About
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-12">
        <div className="container mx-auto max-w-3xl">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">About ReviewAI</h1>
              <p className="text-xl text-muted-foreground">An AI-powered product review platform prototype</p>
            </div>

            <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">What is ReviewAI?</h2>
                <p className="text-muted-foreground leading-relaxed">
                  ReviewAI is a prototype of an AI-powered product review website that helps users discover the best
                  products based on a comprehensive analysis of product characteristics and customer reviews. The
                  platform leverages artificial intelligence to aggregate and analyze product information from across
                  the web, providing users with curated "top 10" product recommendations for any search query.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">How It Works</h2>
                <p className="text-muted-foreground leading-relaxed">
                  When you search for a product, ReviewAI uses advanced AI models to analyze product specifications,
                  customer reviews, pricing information, and availability across multiple retailers. The system then
                  generates intelligent recommendations with direct links to purchase from trusted vendors like Amazon,
                  Walmart, Best Buy, and category-specific retailers.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  To ensure reliability, the platform includes a fallback mock data generator that activates if the AI
                  service is temporarily unavailable, ensuring users always receive helpful product recommendations.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">About the Creator</h2>
                <p className="text-muted-foreground leading-relaxed">
                  ReviewAI was created by <span className="font-semibold text-foreground">Martin Berzin</span> as a
                  personal vibe coding project. This prototype demonstrates the potential of combining modern AI
                  technology with practical e-commerce applications to create valuable tools for consumers.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Technology Stack</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="font-semibold mb-2">Frontend</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Next.js 15 with App Router</li>
                      <li>• React 19</li>
                      <li>• Tailwind CSS v4</li>
                      <li>• shadcn/ui components</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="font-semibold mb-2">AI & Backend</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Vercel AI SDK</li>
                      <li>• Groq (llama-3.1-70b)</li>
                      <li>• Server Actions</li>
                      <li>• Mock data fallback</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Disclaimer</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This is a prototype project for demonstration purposes. Product recommendations are generated by AI
                  and may not reflect the most current market conditions. Always verify product details and prices on
                  the retailer's website before making a purchase. This site is not affiliated with any of the retailers
                  mentioned.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 ReviewAI. Created by Martin Berzin. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
