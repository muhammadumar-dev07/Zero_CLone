import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeScreen } from './components/HomeScreen';
import { CollectionsScreen } from './components/CollectionsScreen';
import { ProductDetailScreen } from './components/ProductDetailScreen';
import { CustomStudioScreen } from './components/CustomStudioScreen';
import { StoryTechnologyScreen } from './components/StoryTechnologyScreen';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WatchFilmModal } from './components/WatchFilmModal';
import { WhitepaperModal } from './components/WhitepaperModal';
import { SpecsModal } from './components/SpecsModal';
import { WATCH_PRODUCTS } from './data/products';
import { ActiveScreen, CartItem, WatchProduct } from './types';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('home');
  const [selectedWatchId, setSelectedWatchId] = useState<string>('zero-one');
  
  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'default-item-1',
      product: WATCH_PRODUCTS[0],
      quantity: 1,
      selectedPrice: 1200,
      customization: {
        caseFinish: 'Aerospace Grade 5 Titanium',
        strap: 'Titanium Link Bracelet',
        accentColor: 'Zero Blue (#4b8eff)',
      }
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isFilmOpen, setIsFilmOpen] = useState(false);
  const [isWhitepaperOpen, setIsWhitepaperOpen] = useState(false);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);

  // Cart operations
  const handleAddToCart = (product: WatchProduct, customization?: CartItem['customization']) => {
    const newItemId = `${product.id}-${Date.now()}`;
    const price = customization && (product.price !== WATCH_PRODUCTS.find(w => w.id === product.id)?.price)
      ? product.price 
      : product.price;

    setCartItems((prev) => [
      ...prev,
      {
        id: newItemId,
        product,
        quantity: 1,
        customization,
        selectedPrice: price,
      },
    ]);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSelectWatch = (watchId: string) => {
    setSelectedWatchId(watchId);
    setActiveScreen('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] flex flex-col font-['Inter'] selection:bg-[#4b8eff] selection:text-[#001a41]">
      {/* Fixed Top Navbar */}
      <Navbar
        activeScreen={activeScreen}
        setActiveScreen={(screen) => {
          setActiveScreen(screen);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Screen Content with Padding for fixed Navbar */}
      <div className="pt-20 flex-grow flex flex-col">
        {activeScreen === 'home' && (
          <HomeScreen
            onSelectWatch={handleSelectWatch}
            onExploreCollection={() => {
              setActiveScreen('collections');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenFilm={() => setIsFilmOpen(true)}
            onOpenWhitepaper={() => setIsWhitepaperOpen(true)}
          />
        )}

        {activeScreen === 'collections' && (
          <CollectionsScreen
            onSelectWatch={handleSelectWatch}
            onAddToCart={handleAddToCart}
          />
        )}

        {activeScreen === 'product' && (
          <ProductDetailScreen
            watchId={selectedWatchId}
            onBack={() => {
              setActiveScreen('collections');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAddToCart={handleAddToCart}
            onOpenSpecs={() => setIsSpecsOpen(true)}
          />
        )}

        {activeScreen === 'custom' && (
          <CustomStudioScreen
            onAddToCart={handleAddToCart}
            onSelectWatch={handleSelectWatch}
          />
        )}

        {activeScreen === 'technology' && (
          <StoryTechnologyScreen
            initialTab="technology"
            onExploreProducts={() => {
              setActiveScreen('collections');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenWhitepaper={() => setIsWhitepaperOpen(true)}
          />
        )}

        {activeScreen === 'story' && (
          <StoryTechnologyScreen
            initialTab="story"
            onExploreProducts={() => {
              setActiveScreen('collections');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenWhitepaper={() => setIsWhitepaperOpen(true)}
          />
        )}
      </div>

      {/* Global Shared Footer */}
      <Footer
        onOpenWhitepaper={() => setIsWhitepaperOpen(true)}
        onOpenSpecs={() => setIsSpecsOpen(true)}
      />

      {/* Slide-out Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleOpenCheckout}
      />

      {/* Checkout / Reservation Stamp Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Brand Film Cinematic Modal */}
      <WatchFilmModal
        isOpen={isFilmOpen}
        onClose={() => setIsFilmOpen(false)}
      />

      {/* Technical Whitepaper Reader Modal */}
      <WhitepaperModal
        isOpen={isWhitepaperOpen}
        onClose={() => setIsWhitepaperOpen(false)}
      />

      {/* Full Spec Matrix Modal */}
      <SpecsModal
        isOpen={isSpecsOpen}
        onClose={() => setIsSpecsOpen(false)}
      />
    </div>
  );
}
