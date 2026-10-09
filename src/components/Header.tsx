import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Calculator, Search } from 'lucide-react';
import { DROP_LOGO_IMAGE } from '../data/mockData';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  openCart: () => void;
  openCalculator: () => void;
  openSearch: () => void;
  onOpenSections?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  openCart,
  openCalculator,
  openSearch,
  onOpenSections
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products' },
    { id: 'recipes', label: 'Cook With Us' },
    { id: 'about', label: 'About Us' },
    { id: 'vision', label: 'Our Vision' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DFD5] transition-all">
        {/* Top Notification Bar - Moving smoothly from right to left */}
        <div className="bg-[#153823] text-[#F4EFEA] text-xs py-2 overflow-hidden border-b border-[#1c4b2f]/60 relative select-none">
          <div className="animate-marquee whitespace-nowrap flex items-center font-medium tracking-wide">
            <span className="mx-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E07A1E] inline-block" />
              <span>Fresh Harvest Batch Available</span>
            </span>
            <span className="mx-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E07A1E] inline-block" />
              <span>Nationwide Delivery Across Nigeria</span>
            </span>
            <span className="mx-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E07A1E] inline-block" />
              <strong className="text-[#E07A1E]">Free Shipping on Orders Over ₦1.5 Million</strong>
            </span>
            <span className="mx-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E07A1E] inline-block" />
              <span>100% Unadulterated Virgin Extraction · Zero Chemical Dyes</span>
            </span>

            {/* Repeated for seamless infinite right-to-left loop */}
            <span className="mx-6 flex items-center gap-2" aria-hidden="true">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E07A1E] inline-block" />
              <span>Fresh Harvest Batch Available</span>
            </span>
            <span className="mx-6 flex items-center gap-2" aria-hidden="true">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E07A1E] inline-block" />
              <span>Nationwide Delivery Across Nigeria</span>
            </span>
            <span className="mx-6 flex items-center gap-2" aria-hidden="true">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E07A1E] inline-block" />
              <strong className="text-[#E07A1E]">Free Shipping on Orders Over ₦1.5 Million</strong>
            </span>
            <span className="mx-6 flex items-center gap-2" aria-hidden="true">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E07A1E] inline-block" />
              <span>100% Unadulterated Virgin Extraction · Zero Chemical Dyes</span>
            </span>
          </div>
        </div>

        {/* 3-Zone Top Bar Contract */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Zone 1: Single Text Element Wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
            aria-label="Drop Palm Oil Homepage"
          >
            <div className="w-11 h-11 rounded-full bg-[#153823] p-1.5 flex items-center justify-center border border-[#E07A1E]/40 shadow-xs group-hover:scale-105 transition-transform overflow-hidden">
              <img
                src={DROP_LOGO_IMAGE}
                alt="Drop Palm Oil Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'https://i.ibb.co/Y7vQLWph/Whats-App-Image-2026-09-28-at-5-17-47-PM-1-removebg-preview.png';
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-[#153823] leading-none">
                DROP PALM OIL
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-widest text-[#B85D0D] font-semibold uppercase mt-0.5">
                Pure · Unadulterated · Nigerian
              </span>
            </div>
          </button>

          {/* Zone 2: Clean 4-6 nav links (single-line, subtle underlines) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#241F17]">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1 cursor-pointer transition-colors hover:text-[#153823] ${
                    isActive ? 'text-[#153823] font-semibold' : 'text-[#5C554B]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E07A1E] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions (Search, Calculator, Cart, CTA & Mobile Toggle) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Search Icon button */}
            <button
              onClick={openSearch}
              className="p-2 text-[#5C554B] hover:text-[#153823] hover:bg-[#F0EBE1] rounded-lg transition-colors cursor-pointer"
              title="Search products & recipes"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Catering Calculator button */}
            <button
              onClick={openCalculator}
              className="hidden md:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#153823] bg-[#E7F3EC] hover:bg-[#D5EADF] rounded-lg transition-colors cursor-pointer"
              title="Calculate oil requirement for cooking & events"
            >
              <Calculator className="w-4 h-4 text-[#153823]" />
              <span className="whitespace-nowrap">Calculator</span>
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={openCart}
              className="relative p-2.5 text-[#153823] bg-[#F4EFEA] hover:bg-[#EAE2D7] rounded-lg transition-colors cursor-pointer"
              aria-label={`Shopping Cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#E07A1E] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Primary CTA: Shop Now */}
            <button
              onClick={() => handleNavClick('products')}
              className="hidden lg:inline-flex items-center px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#153823] hover:bg-[#0D2216] rounded-lg shadow-xs hover:shadow transition-all cursor-pointer whitespace-nowrap"
            >
              Shop Now
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#241F17] hover:bg-[#F0EBE1] rounded-lg cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF7F2] border-b border-[#E8DFD5] px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? 'bg-[#153823] text-white font-semibold'
                    : 'text-[#241F17] hover:bg-[#F4EFEA]'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="pt-2 border-t border-[#E8DFD5] flex gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openCalculator();
                }}
                className="flex-1 py-2 px-3 text-xs font-semibold text-center bg-[#E7F3EC] text-[#153823] rounded-lg"
              >
                Oil Calculator
              </button>
              <button
                onClick={() => handleNavClick('products')}
                className="flex-1 py-2 px-3 text-xs font-bold uppercase text-center bg-[#153823] text-white rounded-lg"
              >
                Shop Catalogue
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
