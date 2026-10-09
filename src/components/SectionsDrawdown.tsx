import React, { useState, useEffect } from 'react';
import {
  Home,
  ShoppingBag,
  Compass,
  Flame,
  BookOpen,
  MapPin,
  ShieldCheck,
  X,
  Share2,
  Check,
  Calculator,
  ChevronRight,
  Sparkles,
  Phone,
  Mail
} from 'lucide-react';
import { DROP_LOGO_IMAGE } from '../data/mockData';

export interface SectionItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  badge?: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgLight: string;
}

export const WEBSITE_SECTIONS: SectionItem[] = [
  {
    id: 'home',
    name: 'Home',
    subtitle: 'Fresh Harvest · Best Sellers',
    description: 'Main storefront featuring unadulterated Nigerian palm oil, quick price guide, and quality assurance.',
    badge: 'Popular',
    icon: Home,
    color: '#153823',
    bgLight: '#E7F3EC',
  },
  {
    id: 'products',
    name: 'Our Products',
    subtitle: '1L, 2L, 5L, 25L & Gift Pack',
    description: 'Explore full catalog with verified pricing, specifications, and instant add-to-cart.',
    badge: 'Shop Online',
    icon: ShoppingBag,
    color: '#E07A1E',
    bgLight: '#FFF4E8',
  },
  {
    id: 'vision',
    name: 'Our Vision & Mission',
    subtitle: 'Purity Pledge · Farmer Fair-Pricing',
    description: 'Our commitment to zero Sudan dyes, sustainable smallholder harvesting, and culinary integrity.',
    badge: 'Our Values',
    icon: Compass,
    color: '#B85D0D',
    bgLight: '#FDF2E9',
  },
  {
    id: 'recipes',
    name: 'Cook With Us',
    subtitle: 'Ofada, Banga, Native Jollof & Ofe Akwu',
    description: 'Authentic Nigerian recipe masterclasses with step-by-step cooking instructions and ingredient check-lists.',
    badge: 'Recipes',
    icon: Flame,
    color: '#C83214',
    bgLight: '#FDEAE6',
  },
  {
    id: 'about',
    name: 'About Our Story',
    subtitle: 'Heritage & Laboratory Purity',
    description: 'From Edo palm groves to modern hygienic bottling, discover how Drop Palm Oil was born.',
    badge: 'Our Roots',
    icon: BookOpen,
    color: '#1C4B2F',
    bgLight: '#EBF4EE',
  },
  {
    id: 'contact',
    name: 'Contact & Location',
    subtitle: 'Ifite, Awka, Anambra State HQ',
    description: 'Puco and Partners Complex. 24h WhatsApp desk (08127826671), phone lines, and corporate wholesale orders.',
    badge: 'Awka, Anambra',
    icon: MapPin,
    color: '#0D6832',
    bgLight: '#E8F5EE',
  },
  {
    id: 'admin',
    name: 'Admin Dashboard',
    subtitle: 'Password Protected (1234)',
    description: 'Upload new products, delete inventory items, and view weekly, monthly & yearly sales records.',
    badge: 'Passcode: 1234',
    icon: ShieldCheck,
    color: '#153823',
    bgLight: '#FAF7F2',
  },
];

interface SectionsDrawdownProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  openCalculator?: () => void;
}

/**
 * 4 Vertical Dots Drawer Component
 * Slides down ("draws down") smoothly from the top of the viewport
 * to showcase all website sections on mobile and desktop.
 */
export const SectionsDrawdown: React.FC<SectionsDrawdownProps> = ({
  isOpen,
  onClose,
  activeTab,
  onSelectTab,
  openCalculator,
}) => {
  const [copied, setCopied] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleCopyLink = async () => {
    const url = 'https://ais-pre-m2ork7azejm2342ypcfn72-62381986629.europe-west2.run.app';
    const targetUrl = typeof window !== 'undefined' && window.location.href.startsWith('http')
      ? window.location.href
      : url;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(targetUrl);
      } else {
        const ta = document.createElement('textarea');
        ta.value = targetUrl;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNavigate = (id: string) => {
    onSelectTab(id);
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-start">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawdown Sheet Panel (Slide down from top) */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Sections Directory"
        className="relative z-10 w-full max-h-[92vh] sm:max-h-[88vh] bg-[#FAF7F2] text-[#241F17] rounded-b-3xl shadow-2xl border-b-2 border-[#153823] overflow-hidden flex flex-col animate-drawdown"
      >
        {/* Top Header of Drawdown */}
        <div className="px-4 sm:px-8 py-3.5 sm:py-4 bg-[#153823] text-white flex items-center justify-between border-b border-[#1C4B2F]">
          <div className="flex items-center gap-3">
            {/* Visual 4 Vertical Dots in Header Badge */}
            <div className="flex items-center gap-2 bg-[#0D2216] px-2.5 py-1.5 rounded-lg border border-[#25653F]">
              <span className="flex flex-col items-center justify-center gap-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E07A1E]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#E07A1E]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#E07A1E]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#E07A1E]" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#FAF7F2]">
                Sections Menu
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs text-[#CAD9CA]">
              <span>Tap any section to draw down & navigate</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#0D2216] border border-[#25653F] hover:border-[#25F4EE] text-white transition-colors cursor-pointer"
              title="Copy website link to share"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#25D366]" />
                  <span className="text-[#25D366]">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[#25F4EE]" />
                  <span className="hidden xs:inline">Share Link</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer flex items-center justify-center min-w-[38px] min-h-[38px]"
              aria-label="Close sections drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Sections Grid Content */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-5 sm:py-6 overscroll-contain">
          
          <div className="max-w-6xl mx-auto space-y-6">
            
            {/* Context Heading */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#E8DFD5]">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#B85D0D]">
                  Website Navigation
                </p>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#153823]">
                  Explore All Sections
                </h3>
              </div>
              <p className="text-xs text-[#786E63]">
                Drop Palm Oil · Pure, Unadulterated & Freshly Bottled
              </p>
            </div>

            {/* Sections Grid - Mobile Responsive 1 col on small phone, 2 col on tablet, 3-4 col on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {WEBSITE_SECTIONS.map((section) => {
                const IconComponent = section.icon;
                const isActive = activeTab === section.id;

                return (
                  <button
                    key={section.id}
                    onClick={() => handleNavigate(section.id)}
                    className={`text-left p-4 sm:p-4.5 rounded-2xl border transition-all duration-200 cursor-pointer group flex flex-col justify-between relative ${
                      isActive
                        ? 'bg-white border-[#153823] ring-2 ring-[#E07A1E]/30 shadow-md -translate-y-0.5'
                        : 'bg-white/90 hover:bg-white border-[#E0D7CC] hover:border-[#153823] hover:shadow-md hover:-translate-y-0.5'
                    }`}
                  >
                    {/* Active Ribbon Pill */}
                    {isActive && (
                      <span className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#153823] bg-[#E7F3EC] px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E07A1E]" />
                        Active
                      </span>
                    )}

                    <div className="space-y-3">
                      {/* Section Icon Box */}
                      <div className="flex items-center justify-between">
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-2xs"
                          style={{ backgroundColor: section.bgLight, color: section.color }}
                        >
                          <IconComponent className="w-5 h-5" />
                        </div>

                        {!isActive && section.badge && (
                          <span className="text-[10px] font-bold text-[#786E63] bg-[#F4EFEA] px-2 py-0.5 rounded-md">
                            {section.badge}
                          </span>
                        )}
                      </div>

                      {/* Section Title & Subtitle */}
                      <div>
                        <h4 className="font-serif font-bold text-base sm:text-lg text-[#153823] group-hover:text-[#B85D0D] transition-colors flex items-center gap-1.5">
                          <span>{section.name}</span>
                          <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[#B85D0D]" />
                        </h4>
                        <p className="text-[11px] font-semibold text-[#8C8274] mt-0.5">
                          {section.subtitle}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-[#5C554B] leading-relaxed line-clamp-2">
                        {section.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-3 border-t border-[#F0EBE1] flex items-center justify-between text-[11px] font-bold text-[#153823]">
                      <span className="group-hover:text-[#B85D0D] transition-colors">
                        {isActive ? 'Currently viewing' : 'Open section'}
                      </span>
                      <span className="text-sm font-bold group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Action Dock Inside Drawdown */}
            <div className="pt-2 border-t border-[#E8DFD5] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                {openCalculator && (
                  <button
                    onClick={() => {
                      onClose();
                      openCalculator();
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#D5C6B5] hover:border-[#153823] text-[#153823] font-semibold transition-colors cursor-pointer"
                  >
                    <Calculator className="w-4 h-4 text-[#E07A1E]" />
                    <span>Oil Requirement Calculator</span>
                  </button>
                )}

                <a
                  href="https://wa.me/2348127826671"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-[#0D6832] font-semibold transition-colors cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-[#25D366]" />
                  <span>WhatsApp 08127826671</span>
                </a>
              </div>

              <div className="text-[11px] text-[#786E63] flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#E07A1E] shrink-0" />
                <span>HQ: Puco & Partners complex, Ifite, Awka, Anambra state</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

/**
 * 4 Vertical Dots Icon Trigger
 * Renders 4 stacked vertical dots with label for Header / Navbar
 */
export const FourVerticalDotsButton: React.FC<{
  onClick: () => void;
  className?: string;
  showLabel?: boolean;
}> = ({ onClick, className = '', showLabel = true }) => {
  return (
    <button
      onClick={onClick}
      className={`group flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#EAE2D7] border border-[#D5C6B5] hover:border-[#153823] text-[#153823] transition-all cursor-pointer shadow-2xs active:scale-95 ${className}`}
      title="Draw down website sections (Home, Products, Vision, Recipes, etc.)"
      aria-label="Draw down sections menu"
    >
      {/* 4 Vertical Dots Indicator */}
      <span className="flex flex-col items-center justify-center gap-1 py-0.5" aria-hidden="true">
        <span className="w-1.5 h-1.5 rounded-full bg-[#153823] group-hover:bg-[#E07A1E] transition-colors" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#153823] group-hover:bg-[#E07A1E] transition-colors" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#153823] group-hover:bg-[#E07A1E] transition-colors" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#153823] group-hover:bg-[#E07A1E] transition-colors" />
      </span>

      {showLabel && (
        <span className="text-xs font-bold tracking-tight text-[#153823] whitespace-nowrap">
          Sections
        </span>
      )}
    </button>
  );
};

/**
 * Floating 4 Vertical Dots Rail / Dock
 * Always accessible floating trigger that allows drawing down sections on both mobile and desktop.
 */
export const FloatingVerticalDotsRail: React.FC<{
  onClick: () => void;
  activeTab: string;
}> = ({ onClick, activeTab }) => {
  return (
    <aside
      className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center select-none"
      aria-label="Quick section navigation rail"
    >
      <button
        onClick={onClick}
        className="group relative flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-2xl bg-white/95 backdrop-blur-md border-2 border-[#153823]/20 hover:border-[#153823] shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer text-[#153823]"
        title="Tap to draw down all sections (Home, Products, Our Vision, etc.)"
        aria-label="4 vertical dots: draw down website sections"
      >
        {/* Glow indicator */}
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#E07A1E] animate-ping opacity-75" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#E07A1E]" />

        {/* 4 Vertical Dots */}
        <span className="flex flex-col items-center justify-center gap-1 py-1" aria-hidden="true">
          <span className="w-2 h-2 rounded-full bg-[#153823] group-hover:bg-[#E07A1E] transition-colors shadow-2xs" />
          <span className="w-2 h-2 rounded-full bg-[#153823] group-hover:bg-[#E07A1E] transition-colors shadow-2xs" />
          <span className="w-2 h-2 rounded-full bg-[#153823] group-hover:bg-[#E07A1E] transition-colors shadow-2xs" />
          <span className="w-2 h-2 rounded-full bg-[#153823] group-hover:bg-[#E07A1E] transition-colors shadow-2xs" />
        </span>

        {/* Small vertical text or tooltip */}
        <span className="text-[9px] font-bold uppercase tracking-wider text-[#8C8274] group-hover:text-[#153823] transition-colors writing-mode-vertical">
          Sections
        </span>
      </button>
    </aside>
  );
};
