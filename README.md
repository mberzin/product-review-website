# AI Product Review Website

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/mberzin-4698s-projects/v0-product-review-website)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/8tGz8du0RFT)

## Overview

An AI-powered product review website that searches the web for real products and generates comprehensive reviews with affiliate links. Users can search for any product category and get top 10 recommendations with detailed analysis, ratings, pros/cons, and direct purchase links.

## Features

- **Real Product Search**: Uses AI to search the web and find actual products from major retailers
- **Comprehensive Reviews**: AI-generated summaries with pros, cons, key features, and ratings
- **Affiliate Links**: Direct links to products on Amazon, Walmart, Best Buy, and Target
- **Advanced Filtering**: Filter by price range, brand, and minimum rating
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop

## How It Works

1. User enters a product search query (e.g., "golf bags", "wireless headphones", "sunglasses")
2. AI searches the web for real products matching the query
3. System extracts product details, prices, ratings, and URLs from major retailers
4. Generates affiliate links with your tracking codes
5. Displays top 10 products with comprehensive reviews and filtering options

## Setup

### Environment Variables

To enable affiliate tracking and earn commissions, add these environment variables to your Vercel project:

\`\`\`bash
# Amazon Associates
AMAZON_AFFILIATE_ID=your-amazon-tag-20

# Walmart Affiliates (optional)
WALMART_AFFILIATE_ID=your-walmart-campaign-id
\`\`\`

**How to get affiliate IDs:**

1. **Amazon Associates**: Sign up at [affiliate-program.amazon.com](https://affiliate-program.amazon.com)
   - Your affiliate ID will look like: `yourname-20`
   - Add it as `AMAZON_AFFILIATE_ID` in Vercel

2. **Walmart Affiliates**: Apply at [affiliates.walmart.com](https://affiliates.walmart.com)
   - Get your campaign ID from the dashboard
   - Add it as `WALMART_AFFILIATE_ID` in Vercel

### Adding Environment Variables in Vercel

1. Go to your project settings in Vercel
2. Navigate to "Environment Variables"
3. Add each variable with its value
4. Redeploy your project for changes to take effect

## Technology Stack

- **Next.js 15** - React framework with App Router
- **AI SDK** - For web search and product analysis
- **Tailwind CSS v4** - Styling and responsive design
- **shadcn/ui** - UI component library
- **TypeScript** - Type safety

## Deployment

Your project is live at:

**[https://vercel.com/mberzin-4698s-projects/v0-product-review-website](https://vercel.com/mberzin-4698s-projects/v0-product-review-website)**

## Continue Building

Build and modify your app on:

**[https://v0.app/chat/projects/8tGz8du0RFT](https://v0.app/chat/projects/8tGz8du0RFT)**

## How Affiliate Links Work

When a user clicks on a product link:
1. They're redirected to the retailer's website (Amazon, Walmart, etc.)
2. Your affiliate tracking code is included in the URL
3. If they make a purchase, you earn a commission
4. The product they see matches exactly what was shown on your review site

Example affiliate URL structure:
- Amazon: `https://amazon.com/dp/ASIN?tag=your-affiliate-id`
- Walmart: `https://walmart.com/ip/12345?affcamid=your-campaign-id`
