import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { OilCalculatorModal } from './components/OilCalculatorModal';
import { SearchModal } from './components/SearchModal';
import { SectionsDrawdown, FloatingVerticalDotsRail } from './components/SectionsDrawdown';

import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { VisionPage } from './pages/VisionPage';
import { AboutPage } from './pages/AboutPage';
import { RecipesPage } from './pages/RecipesPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

import { Product, CartItem, Recipe } from './types';
import { PRODUCTS } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');

  // Dynamic Products State with LocalStorage Persistence
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('drop_palm_oil_products');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        // fallback
      }
    }
    return PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem('drop_palm_oil_products', JSON.stringify(products));
  }, [products]);

  // Load verified products from Cloud SQL PostgreSQL database
  useEffect(() => {
    fetch('/api/products')
      .then((res) => (res.ok ? res.json() : null))
      .then((dbData) => {
        if (Array.isArray(dbData) && dbData.length > 0) {
          const mapped: Product[] = dbData.map((item: any) => ({
            id: item.id,
            name: item.name,
            size: item.size,
            volumeLiters: parseFloat(item.size) || 1,
            priceNgn: item.price,
            tagline: item.description ? item.description.slice(0, 60) + '...' : '',
            description: item.description,
            inStock: item.inStock !== false,
            image: item.image,
            rating: 4.9,
            reviewCount: 95,
            isBestseller: item.isPopular,
            idealFor: 'Everyday cooking, authentic Nigerian soups, and stews',
            specifications: {
              freeFattyAcids: item.ffaLevel || '< 1.8%',
              moistureContent: '< 0.12%',
              smokePoint: item.smokePoint || '232°C',
              additives: item.sudanDyeFree ? '0.00% Pure Unadulterated' : 'None',
              origin: 'Edo State, Nigeria',
            },
          }));
          setProducts(mapped);
        }
      })
      .catch((err) => {
        console.warn('Using local catalog cache:', err);
      });
  }, []);

  const [cart, setCart] = useState<CartItem[]>(() => {
    return [
      {
        product: products[0] || PRODUCTS[0],
        quantity: 1,
        selectedSize: '1 Litre',
      },
    ];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSectionsDrawerOpen, setIsSectionsDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedSize: product.size }];
    });

    setJustAddedId(product.id);
    setTimeout(() => {
      setJustAddedId(null);
    }, 1800);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleViewProductDetails = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleSelectRecipeFromSearch = (recipe: Recipe) => {
    setActiveTab('recipes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Product Admin Operations (Persisted to Cloud SQL PostgreSQL)
  const handleUploadProduct = async (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    try {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: newProduct.id,
          name: newProduct.name,
          size: newProduct.size,
          price: newProduct.priceNgn,
          image: newProduct.image,
          category: 'Bottled Palm Oil',
          description: newProduct.description,
          inStock: newProduct.inStock,
          isPopular: newProduct.isBestseller || false,
          ffaLevel: newProduct.specifications?.freeFattyAcids,
          smokePoint: newProduct.specifications?.smokePoint,
          sudanDyeFree: true,
        }),
      });
    } catch (e) {
      console.warn('Product saved locally:', e);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    if (selectedProduct?.id === productId) {
      setSelectedProduct(null);
    }
    try {
      await fetch(`/api/products/${productId}`, { method: 'DELETE' });
    } catch (e) {
      console.warn('Product deleted locally:', e);
    }
  };

  const handleToggleStock = async (productId: string) => {
    const target = products.find((p) => p.id === productId);
    const newStock = target ? !target.inStock : false;
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, inStock: !p.inStock } : p))
    );
    try {
      await fetch(`/api/products/${productId}/stock`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inStock: newStock }),
      });
    } catch (e) {
      console.warn('Stock status updated locally:', e);
    }
  };

  const handleResetDefaultProducts = () => {
    setProducts(PRODUCTS);
    localStorage.setItem('drop_palm_oil_products', JSON.stringify(PRODUCTS));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#241F17] selection:bg-[#E07A1E]/20 w-full max-w-full overflow-x-hidden">
      
      {/* 3-Zone Top Bar with 4-Vertical-Dots Drawdown Button */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartCount}
        openCart={() => setIsCartOpen(true)}
        openCalculator={() => setIsCalculatorOpen(true)}
        openSearch={() => setIsSearchOpen(true)}
        onOpenSections={() => setIsSectionsDrawerOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {activeTab === 'home' && (
          <HomePage
            products={products}
            onAddToCart={handleAddToCart}
            onViewProductDetails={handleViewProductDetails}
            setActiveTab={setActiveTab}
            justAddedId={justAddedId}
          />
        )}

        {activeTab === 'products' && (
          <ProductsPage
            products={products}
            onAddToCart={handleAddToCart}
            onViewDetails={handleViewProductDetails}
            openCalculator={() => setIsCalculatorOpen(true)}
            justAddedId={justAddedId}
          />
        )}

        {activeTab === 'recipes' && (
          <RecipesPage
            onShopOil={() => {
              setActiveTab('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'about' && (
          <AboutPage setActiveTab={setActiveTab} />
        )}

        {activeTab === 'vision' && (
          <VisionPage setActiveTab={setActiveTab} />
        )}

        {activeTab === 'contact' && (
          <ContactPage />
        )}

        {activeTab === 'admin' && (
          <AdminPage
            products={products}
            onUploadProduct={handleUploadProduct}
            onDeleteProduct={handleDeleteProduct}
            onToggleStock={handleToggleStock}
            onResetDefaultProducts={handleResetDefaultProducts}
            onViewProductDetails={handleViewProductDetails}
            onBackToStore={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Comprehensive Premium Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* 4 Vertical Dots Drawdown Navigation Panel */}
      <SectionsDrawdown
        isOpen={isSectionsDrawerOpen}
        onClose={() => setIsSectionsDrawerOpen(false)}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        openCalculator={() => setIsCalculatorOpen(true)}
      />

      {/* Floating 4 Vertical Dots Rail on the Side for Mobile & Desktop */}
      <FloatingVerticalDotsRail
        onClick={() => setIsSectionsDrawerOpen(true)}
        activeTab={activeTab}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        allProducts={products}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onSelectProduct={setSelectedProduct}
      />

      {/* Oil Requirement Calculator Modal */}
      <OilCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        onAddToCart={handleAddToCart}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        products={products}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(product) => {
          setSelectedProduct(product);
        }}
        onSelectRecipe={handleSelectRecipeFromSearch}
      />

    </div>
  );
}
