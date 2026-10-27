import React, { useState, useEffect } from 'react';
import { ShopProvider } from './context/ShopContext';
import { AnnouncementBar } from './components/common/AnnouncementBar';
import { Navbar } from './components/common/Navbar';
import { MobileNavDrawer } from './components/common/MobileNavDrawer';
import { SearchModal } from './components/common/SearchModal';
import { Toast } from './components/common/Toast';
import { Footer } from './components/common/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { DealsPage } from './pages/DealsPage';
import { WishlistPage } from './pages/WishlistPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { ShippingPage } from './pages/ShippingPage';
import { ReturnsPage } from './pages/ReturnsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  const [currentHash, setCurrentHash] = useState(() => window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Parse path and query
  const cleanHash = currentHash.replace(/^#/, '');
  const [pathWithParams] = cleanHash.split('?');
  const path = pathWithParams || '/';

  // Route resolver
  const renderRoute = () => {
    // 1. Home
    if (path === '/' || path === '') {
      return <HomePage />;
    }

    // 2. Shop
    if (path === '/shop') {
      return <ShopPage />;
    }

    // 3. Category: /category/:slug
    if (path.startsWith('/category/')) {
      const slug = path.replace('/category/', '').split('/')[0];
      return <CategoryPage slug={slug} />;
    }

    // 4. Product Details: /product/:slug
    if (path.startsWith('/product/')) {
      const slug = path.replace('/product/', '').split('/')[0];
      return <ProductDetailPage slug={slug} />;
    }

    // 5. Deals
    if (path === '/deals') {
      return <DealsPage />;
    }

    // 6. Wishlist
    if (path === '/wishlist') {
      return <WishlistPage />;
    }

    // 7. Cart
    if (path === '/cart') {
      return <CartPage />;
    }

    // 8. Checkout
    if (path === '/checkout') {
      return <CheckoutPage />;
    }

    // 9. Order Success
    if (path === '/order-success') {
      return <OrderSuccessPage />;
    }

    // 10. Track Order
    if (path === '/track-order') {
      return <TrackOrderPage />;
    }

    // 11. About
    if (path === '/about') {
      return <AboutPage />;
    }

    // 12. Contact
    if (path === '/contact') {
      return <ContactPage />;
    }

    // 13. FAQ
    if (path === '/faq') {
      return <FaqPage />;
    }

    // 14. Shipping
    if (path === '/shipping') {
      return <ShippingPage />;
    }

    // 15. Returns
    if (path === '/returns') {
      return <ReturnsPage />;
    }

    // 16. Privacy
    if (path === '/privacy') {
      return <PrivacyPage />;
    }

    // 17. Terms
    if (path === '/terms') {
      return <TermsPage />;
    }

    // Catch-All: 404
    return <NotFoundPage />;
  };

  return (
    <ShopProvider>
      <div className="min-h-screen flex flex-col bg-[#09090B] text-[#FAFAFA] antialiased selection:bg-[#F5C76A] selection:text-[#09090B]">
        {/* Global Announcement Strip */}
        <AnnouncementBar />

        {/* Global Navigation Header */}
        <Navbar currentPath={path} />

        {/* Mobile Navigation Drawer */}
        <MobileNavDrawer currentPath={path} />

        {/* Global Product Search Modal */}
        <SearchModal />

        {/* Main Content Area */}
        <div className="flex-1">
          {renderRoute()}
        </div>

        {/* Global Footer */}
        <Footer />

        {/* Accessible Toast Notification System */}
        <Toast />
      </div>
    </ShopProvider>
  );
};

export default App;
