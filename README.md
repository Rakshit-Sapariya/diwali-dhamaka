# 🪔 DIWALI DHAMAKA — Premium Festive Ecommerce Platform

> **"Light Up Your Celebrations. Unlock Extraordinary Deals."**  
> *Your Festive Shopping Destination.*

Diwali Dhamaka is a production-quality, responsive Indian festive ecommerce website engineered with a modern design system, authentic Indian Rupee (`₹`) pricing, a client-side shopping cart with coupon engine, realistic order simulation, order tracking, and 17 comprehensive routes.

---

## 🌟 Key Highlights & Architectural Features

### 1. Festive Luxury Design System
- **Strict Brand Design Tokens**:
  - Deep Black Canvas: `#09090B`
  - Charcoal Surface: `#121216`
  - Elevated Card Surface: `#1A1A20`
  - Festive Gold: `#F5C76A`
  - Antique Gold: `#C99735`
  - Saffron Orange: `#FF7A18`
  - Diya Amber: `#FFB547`
  - Crimson Accent: `#FF2D55`
  - Off-White Text: `#FAFAFA`
  - Muted Inks: `#A1A1AA`
  - Structural Alpha Borders: `rgba(255, 255, 255, 0.10)`
- **Typography Scale**: Space Grotesk display headings, Playfair Display serif accents, and crisp Inter body text.
- **Custom Vector Graphics**: Custom SVG Diya (`DiyaIcon`) with dual-tone flame and metallic clay bowl, plus Rangoli sparkles (`SparkleIcon`) — zero generic emojis or neon gradients.

### 2. Full Multi-Page Routing (17 Complete Routes)
1. `#/` — **Home**: Cinematic hero with live countdown timer, promotional strips, category explorer, deals of the day, festive coupons banner.
2. `#/shop` — **Product Catalog**: Live search, category selector, price range filters, rating filters, brand checkboxes, sorting, active filter chips, and pagination.
3. `#/category/:slug` — **Category Showcase**: Dedicated landing for each of the 8 categories with banners, taglines, and filtered product sets.
4. `#/product/:slug` — **Product Details**: Multi-photo gallery, price & savings callouts, variant selector, specs table, live 6-digit Indian PIN code delivery estimator, and related products.
5. `#/deals` — **Deals & Offers**: Curated promotional page with clearance categories (50% Off, Under ₹1,999, Gadgets, Diyas).
6. `#/wishlist` — **Festive Wishlist**: LocalStorage-persisted saved items, move-to-cart, remove action, real-time header count badge.
7. `#/cart` — **Shopping Cart**: Line-item subtotal, quantity controls, free delivery progress bar (threshold ₹999), coupon engine, and instant totals recalculation.
8. `#/checkout` — **Demo Checkout**: Form validation (Name, 10-digit Indian phone, email, address, state, 6-digit PIN), payment method selector (UPI, Card, NetBanking, COD), and simulation disclaimer.
9. `#/order-success` — **Order Confirmation**: Displays unique order ID (`DD-2026-XXXXX`), itemized receipt, delivery address, and timestamps.
10. `#/track-order` — **Order Tracker**: Search by Order ID with 5-stage shipment timeline (Order Confirmed → Packed at Hub → In Transit → Out for Delivery → Delivered).
11. `#/about` — **About Brand**: Heritage artisan direct-sourcing story, honest discount guarantee, and transparency disclosures.
12. `#/contact` — **Customer Support**: Interactive helpdesk form with validation and simulated dispatch.
13. `#/faq` — **Frequently Asked Questions**: Searchable, categorized accordion covering ordering, shipping, coupons, and authenticity.
14. `#/shipping` — **Shipping Policy**: Indian metro timelines, packaging guidelines for fragile brass/clay goods.
15. `#/returns` — **Returns & Refunds**: 7-day festive return guarantee conditions and refund procedures.
16. `#/privacy` — **Privacy Policy**: Draft policy marked for commercial review.
17. `#/terms` — **Terms & Conditions**: Terms of service and demo disclaimers.
18. `#/404` — **Branded 404**: Page not found with quick link back to shopping aisles.

### 3. Transparent Mathematical Engine
- **Discount Percentage**: Strictly computed via:
  $$\text{Discount \%} = \text{round}\left(\frac{\text{Original Price} - \text{Selling Price}}{\text{Original Price}} \times 100\right)$$
- **Guaranteed Numeric Hygiene**: Never produces `NaN`, `Infinity`, or negative totals.
- **Voucher Validation**: Evaluates minimum cart spend (e.g. `FESTIVE10` requires ₹1,499; `DIWALI15` requires ₹2,999), caps maximum discounts, and automatically re-validates if cart items are removed.

---

## 🛠️ Project Structure

```text
diwali-dhamaka/
├── index.html                   # HTML entry point with fonts & metadata
├── package.json                 # React 18, TypeScript, Tailwind CSS, Vite
├── tsconfig.json                # Strict TypeScript configuration
├── vite.config.ts               # Vite configuration
├── tailwind.config.js           # Diwali brand tokens & keyframes
├── postcss.config.js            # PostCSS configuration
├── src/
│   ├── types/
│   │   └── index.ts             # Strongly typed data models
│   ├── data/
│   │   ├── products.ts          # 28+ realistic products across 8 categories
│   │   ├── categories.ts        # 8 festive categories
│   │   └── coupons.ts           # Configured promotional vouchers
│   ├── utils/
│   │   └── currency.ts          # Indian currency formatting (₹) & discount math
│   ├── context/
│   │   └── ShopContext.tsx      # Cart, wishlist, coupon, orders & toast state
│   ├── components/
│   │   ├── common/
│   │   │   ├── DiyaMotif.tsx    # Custom SVG Diya & Sparkles
│   │   │   ├── AnnouncementBar.tsx # Top notification marquee
│   │   │   ├── Navbar.tsx       # Desktop header with mega-menu
│   │   │   ├── MobileNavDrawer.tsx # Mobile drawer navigation
│   │   │   ├── SearchModal.tsx  # Live instantaneous search dialog
│   │   │   ├── Breadcrumbs.tsx  # Accessible breadcrumb trail
│   │   │   ├── Footer.tsx       # 4-column directory & trust badges
│   │   │   └── Toast.tsx        # ARIA-live feedback notifications
│   │   ├── product/
│   │   │   ├── ProductCard.tsx  # 5-state interactive card with quick view
│   │   │   └── QuickViewModal.tsx # Accessible modal preview
│   │   └── home/
│   │       ├── HeroSection.tsx  # Campaign headline & live countdown
│   │       ├── PromoOfferStrip.tsx # Category promo spotlights
│   │       ├── CategoryExplorer.tsx # 8-card responsive visual grid
│   │       ├── FeaturedDeals.tsx # "Deals Worth Celebrating"
│   │       └── FestiveBanner.tsx # Coupon voucher copy bar
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── ShopPage.tsx
│   │   ├── CategoryPage.tsx
│   │   ├── ProductDetailPage.tsx
│   │   ├── DealsPage.tsx
│   │   ├── WishlistPage.tsx
│   │   ├── CartPage.tsx
│   │   ├── CheckoutPage.tsx
│   │   ├── OrderSuccessPage.tsx
│   │   ├── TrackOrderPage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── FaqPage.tsx
│   │   ├── ShippingPage.tsx
│   │   ├── ReturnsPage.tsx
│   │   ├── PrivacyPage.tsx
│   │   ├── TermsPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── App.tsx                  # Client-side hash routing & layout wrapper
│   ├── main.tsx                 # React DOM mount point
│   └── index.css                # Tailwind directives & custom scrollbars
```

---

## 🚀 Running the Project Locally

```bash
# 1. Navigate to the project directory
cd diwali-dhamaka

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Open in browser (typically http://localhost:3000)
```

---

## 🧪 Quality Assurance & Acceptance Checklist
- [x] **Navigation**: All 17 routes resolve smoothly via hash routing without 404s on browser reload.
- [x] **Search**: Full-text instant search across product names, brands, categories, and tags.
- [x] **Cart Math**: Subtotal, item quantities, discounts, and shipping fees compute in real time.
- [x] **Coupon Engine**: Validates minimum spend for `FESTIVE10` (₹1,499) and `DIWALI15` (₹2,999).
- [x] **Local Persistence**: Cart, wishlist, and demo orders survive page reloads via `localStorage`.
- [x] **Order Simulation**: Generates unique `DD-2026-XXXXX` identifier and tracks shipment milestones.
- [x] **Responsive Layout**: Tested across mobile (360px), tablet (768px), and desktop (1440px) viewports with zero horizontal overflow.
- [x] **Accessibility**: Minimum 44×44px touch targets on mobile, keyboard navigation with visible focus rings, ARIA roles, and high-contrast color combinations.
