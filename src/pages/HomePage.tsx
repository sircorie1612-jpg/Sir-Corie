import React from 'react';
import { Hero } from '../components/Hero';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { ProductCard } from '../components/ProductCard';
import { FarmToBottle } from '../components/FarmToBottle';
import { RecipesSection } from '../components/RecipesSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { NewsletterSection } from '../components/NewsletterSection';
import { PRODUCTS, PLANTATION_IMAGE, VISION_PILLARS, DROP_ABOUT_OIL_IMAGE, DROP_LOGO_IMAGE, DROP_BOTTLE_NEW_IMAGE } from '../data/mockData';
import { Product } from '../types';
import { ArrowRight, ShieldCheck, HeartHandshake, Award, Phone, Mail, MapPin, MessageSquare } from 'lucide-react';

interface HomePageProps {
  products?: Product[];
  onAddToCart: (product: Product, quantity?: number) => void;
  onViewProductDetails: (product: Product) => void;
  setActiveTab: (tab: string) => void;
  justAddedId: string | null;
}

export const HomePage: React.FC<HomePageProps> = ({
  products = PRODUCTS,
  onAddToCart,
  onViewProductDetails,
  setActiveTab,
  justAddedId,
}) => {
  const bestsellers = products.slice(0, 4);

  return (
    <div className="space-y-0">
      
      {/* 1. Hero Section */}
      <Hero
        onShopNow={() => {
          const el = document.getElementById('bestsellers-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onExplore={() => setActiveTab('products')}
      />

      {/* 2. Why Choose Us Section */}
      <WhyChooseUs onLearnMore={() => setActiveTab('about')} />

      {/* 3. Our Best Sellers Section */}
      <section id="bestsellers-section" className="py-16 md:py-24 bg-[#FAF7F2] border-b border-[#E8DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#B85D0D]">
                Pure · Freshly Bottled
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#153823] tracking-tight">
                Our Best Sellers
              </h2>
              <p className="text-sm sm:text-base text-[#5C554B] max-w-xl">
                Discover our signature unadulterated palm oil varieties, carefully sized for everyday households, weekend family feasts, and commercial kitchens.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('products')}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#153823] hover:text-[#B85D0D] transition-colors cursor-pointer self-start md:self-auto"
            >
              <span>View All 5 Sizes & Bundles</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Price Guide - 4 Sizes Hovering Beautifully */}
          <div className="mb-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {[
              { size: '1 Litre', price: '₦4,500', note: 'Kitchen Staple', id: 'drop-palm-oil-1l' },
              { size: '2 Litres', price: '₦9,000', note: 'Family Sunday Pot', id: 'drop-palm-oil-2l' },
              { size: '5 Litres', price: '₦22,500', note: 'Best Value Jerrycan', id: 'drop-palm-oil-5l' },
              { size: '25 Litres', price: '₦112,500', note: 'Commercial Drum', id: 'drop-palm-oil-25l' },
            ].map((tier, idx) => (
              <div
                key={tier.size}
                className={`hover-float-card animate-hover-float-${idx + 1} group p-3.5 sm:p-4 rounded-2xl bg-white border border-[#E0D7CC] hover:border-[#153823] hover:ring-2 hover:ring-[#E07A1E]/30 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex items-center justify-between cursor-pointer`}
                onClick={() => {
                  const targetProd = PRODUCTS.find((p) => p.id === tier.id);
                  if (targetProd) onViewProductDetails(targetProd);
                }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] p-1 border border-[#E8DFD5] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <img
                      src={DROP_BOTTLE_NEW_IMAGE}
                      alt={tier.size}
                      className="w-full h-full object-contain drop-shadow-sm"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = 'https://i.ibb.co/Pzmp6ykZ/drop2.png';
                      }}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C8274] block">
                      {tier.size}
                    </span>
                    <span className="font-serif text-base sm:text-lg font-black text-[#153823] group-hover:text-[#B85D0D] transition-colors tabular-nums">
                      {tier.price}
                    </span>
                  </div>
                </div>
                <span className="hidden sm:inline-block text-[10px] font-semibold text-[#153823] bg-[#E7F3EC] px-2 py-0.5 rounded-full">
                  {tier.note}
                </span>
              </div>
            ))}
          </div>

          {/* Product Grid - Floating & Hovering Beautifully */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {bestsellers.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={(p) => onAddToCart(p, 1)}
                onViewDetails={onViewProductDetails}
                justAdded={justAddedId === product.id}
                animClass={`animate-hover-float-${(idx % 4) + 1}`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 4. From Farm To Bottle Horizontal Story */}
      <FarmToBottle />

      {/* 5. Our Story & Authenticity Callout */}
      <section className="py-16 md:py-24 bg-[#F4EFEA] border-b border-[#E8DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 relative">
              <div className="hover-float-card animate-hover-float-2 relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-b from-[#FAF7F2] to-[#F4EFEA] p-6 flex items-center justify-center group hover:-translate-y-4 hover:shadow-2xl transition-all duration-500 ease-out cursor-pointer">
                <img
                  src={DROP_BOTTLE_NEW_IMAGE}
                  alt="Drop Palm Oil bottle"
                  className="max-h-80 sm:max-h-96 w-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.2)] group-hover:scale-110 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'https://i.ibb.co/Pzmp6ykZ/drop2.png';
                  }}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-[#153823] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-md shadow-md">
                  100% Virgin Palm Oil
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xs p-3 rounded-2xl border border-[#E0D7CC] flex items-center justify-between text-xs group-hover:border-[#153823] transition-colors">
                  <div>
                    <span className="font-serif font-bold text-[#153823]">Drop Palm Oil</span>
                    <span className="text-[10px] text-[#786E63] block">Tree to Kitchen Traceability</span>
                  </div>
                  <span className="text-[11px] font-bold text-[#B85D0D] bg-[#E7F3EC] px-2.5 py-1 rounded-md">
                    Certified Pure
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B85D0D]">
                <span>Our Heritage</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#153823] tracking-tight text-balance">
                More Than Palm Oil. It's A Part Of Who We Are.
              </h2>
              <p className="text-sm sm:text-base text-[#5C554B] leading-relaxed">
                In Nigerian culture, palm oil is not just an ingredient—it is the bedrock of celebrations, family Sunday feasts, ancestral recipes, and shared joy. Yet for decades, open markets have suffered from dangerous adulteration: unscrupulous middlemen mixing cheap fats and cancer-causing Sudan dyes.
              </p>
              <p className="text-sm sm:text-base text-[#5C554B] leading-relaxed">
                We founded <strong>Drop Palm Oil</strong> to restore unadulterated integrity to African cooking. We harvest ripe fruit directly from smallholder groves, steam-press without solvents, and deliver farm-fresh honesty directly into your kitchen.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('about')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#153823] hover:bg-[#0D2216] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-sm"
                >
                  <span>Read Our Full Story</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Our Vision & Mission Preview (4 Visual Pillars) */}
      <section className="py-16 md:py-24 bg-[#FAF7F2] border-b border-[#E8DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B85D0D]">
              Our Driving Purpose
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#153823] tracking-tight">
              Our Vision & Mission
            </h2>
            <p className="text-sm sm:text-base text-[#5C554B]">
              To become a trusted African palm-oil brand known for quality, authenticity, and responsible production while uplifting local agricultural communities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VISION_PILLARS.map((pillar, idx) => (
              <div
                key={idx}
                className={`hover-float-card animate-hover-float-${(idx % 4) + 1} group bg-white p-6 rounded-2xl border border-[#E0D7CC] hover:border-[#153823] hover:ring-2 hover:ring-[#E07A1E]/30 shadow-md hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 ease-out flex flex-col justify-between space-y-4 cursor-pointer`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#E07A1E]">0{idx + 1}</span>
                    <span className="text-xs font-bold text-[#153823] bg-[#E7F3EC] px-2 py-0.5 rounded">
                      {pillar.metric}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#153823] group-hover:text-[#B85D0D] transition-colors">{pillar.title}</h3>
                  <p className="text-xs font-semibold text-[#B85D0D]">{pillar.subtitle}</p>
                  <p className="text-xs text-[#5C554B] leading-relaxed">{pillar.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => setActiveTab('vision')}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#153823] hover:text-[#B85D0D] transition-colors cursor-pointer"
            >
              <span>Explore Our Sustainability & Community Impact</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 7. Cook With Us (Recipes) */}
      <RecipesSection onShopOil={() => setActiveTab('products')} />

      {/* 8. Customer Testimonials */}
      <TestimonialsSection />

      {/* 9. Contact Us Section - Hovering Beautifully */}
      <section className="py-16 md:py-24 bg-[#F4EFEA] border-b border-[#E8DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B85D0D]">
              Direct Contact & Headquarters
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#153823] tracking-tight">
              Contact Drop Palm Oil
            </h2>
            <p className="text-sm sm:text-base text-[#5C554B]">
              Operating out of <strong>Ifite, Awka, Anambra State</strong>. Order for your household, restaurant, or bulk distribution directly from our headquarters.
            </p>
          </div>

          {/* 4 Hovering Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            
            {/* Card 1: WhatsApp */}
            <a
              href="https://wa.me/2348127826671?text=Hello%20Drop%20Palm%20Oil!%20I%20have%20an%20inquiry."
              target="_blank"
              rel="noreferrer"
              className="hover-float-card animate-hover-float-1 group bg-white p-6 rounded-3xl border border-[#E0D7CC] hover:border-[#25D366] hover:ring-2 hover:ring-[#25D366]/30 shadow-md hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 ease-out flex flex-col justify-between cursor-pointer"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#25D366] group-hover:text-white transition-all duration-300 shadow-sm">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#25D366] block">Direct WhatsApp</span>
                  <h3 className="font-serif font-bold text-lg text-[#153823] group-hover:text-[#25D366] transition-colors">
                    WhatsApp Desk
                  </h3>
                  <p className="text-xs text-[#786E63] mt-1">Instant messaging & orders</p>
                </div>
                <p className="font-mono text-sm font-bold text-[#153823] bg-[#FAF7F2] p-2 rounded-xl border border-[#E8DFD5] text-center">
                  08127826671
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#F0EBE1] text-xs font-bold text-[#25D366] flex items-center justify-between">
                <span>Chat Now</span>
                <span>→</span>
              </div>
            </a>

            {/* Card 2: Phone Call */}
            <a
              href="tel:+2348127826671"
              className="hover-float-card animate-hover-float-2 group bg-white p-6 rounded-3xl border border-[#E0D7CC] hover:border-[#153823] hover:ring-2 hover:ring-[#E07A1E]/30 shadow-md hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 ease-out flex flex-col justify-between cursor-pointer"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#E7F3EC] text-[#153823] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#153823] group-hover:text-white transition-all duration-300 shadow-sm">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#B85D0D] block">Voice Line</span>
                  <h3 className="font-serif font-bold text-lg text-[#153823] group-hover:text-[#B85D0D] transition-colors">
                    Call Directly
                  </h3>
                  <p className="text-xs text-[#786E63] mt-1">Mon – Sat, 8AM – 6PM</p>
                </div>
                <p className="font-mono text-sm font-bold text-[#153823] bg-[#FAF7F2] p-2 rounded-xl border border-[#E8DFD5] text-center">
                  08127826671
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#F0EBE1] text-xs font-bold text-[#153823] flex items-center justify-between">
                <span>Call Line</span>
                <span>→</span>
              </div>
            </a>

            {/* Card 3: Gmail */}
            <a
              href="mailto:pucofoodsofficial@gmail.com"
              className="hover-float-card animate-hover-float-3 group bg-white p-6 rounded-3xl border border-[#E0D7CC] hover:border-[#E07A1E] hover:ring-2 hover:ring-[#E07A1E]/30 shadow-md hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 ease-out flex flex-col justify-between cursor-pointer"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF5EB] text-[#E07A1E] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#E07A1E] group-hover:text-white transition-all duration-300 shadow-sm">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#E07A1E] block">Official Email</span>
                  <h3 className="font-serif font-bold text-lg text-[#153823] group-hover:text-[#E07A1E] transition-colors">
                    Official Gmail
                  </h3>
                  <p className="text-xs text-[#786E63] mt-1">Wholesale & corporate inquiries</p>
                </div>
                <p className="text-[11px] font-semibold text-[#153823] bg-[#FAF7F2] p-2 rounded-xl border border-[#E8DFD5] text-center truncate" title="pucofoodsofficial@gmail.com">
                  pucofoodsofficial@gmail.com
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#F0EBE1] text-xs font-bold text-[#E07A1E] flex items-center justify-between">
                <span>Send Mail</span>
                <span>→</span>
              </div>
            </a>

            {/* Card 4: TikTok */}
            <a
              href="https://www.tiktok.com/@droppalmoil"
              target="_blank"
              rel="noreferrer"
              className="hover-float-card animate-hover-float-4 group bg-white p-6 rounded-3xl border border-[#E0D7CC] hover:border-black hover:ring-2 hover:ring-black/20 shadow-md hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 ease-out flex flex-col justify-between cursor-pointer"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-sm">
                  <svg className="w-6 h-6 text-[#25F4EE] group-hover:text-[#FE2C55] transition-colors" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.42a6.34 6.34 0 0 0-.86-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.28 8.28 0 0 0 4.77 1.48V6.78c-.34 0-.68-.03-1-.09z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#786E63] block">Social Videos</span>
                  <h3 className="font-serif font-bold text-lg text-[#153823] group-hover:text-black transition-colors">
                    TikTok Channel
                  </h3>
                  <p className="text-xs text-[#786E63] mt-1">Watch pure oil pours & reviews</p>
                </div>
                <p className="font-mono text-sm font-bold text-black bg-[#FAF7F2] p-2 rounded-xl border border-[#E8DFD5] text-center">
                  Drop palm oil
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#F0EBE1] text-xs font-bold text-black flex items-center justify-between">
                <span>Watch TikTok</span>
                <span>→</span>
              </div>
            </a>

          </div>

          {/* Hovering HQ Complex Showcase Bar */}
          <div className="hover-float-card animate-hover-float-2 group bg-white rounded-3xl p-6 sm:p-8 border border-[#E0D7CC] hover:border-[#153823] hover:ring-2 hover:ring-[#E07A1E]/30 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#153823] text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                <MapPin className="w-7 h-7 text-[#E07A1E]" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#B85D0D] block">
                  Headquarters (HQ) Location
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#153823]">
                  Puco and Partners complex, Ifite, Anambra state
                </h3>
                <p className="text-xs text-[#5C554B]">
                  Location: Ifite, Awka, Anambra State · Produced by PUCO Food & Farm Ltd
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
              <button
                onClick={() => setActiveTab('contact')}
                className="w-full md:w-auto px-6 py-3.5 bg-[#153823] hover:bg-[#0D2216] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md text-center flex items-center justify-center gap-2"
              >
                <span>Open Contact Page</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 10. Newsletter Section */}
      <NewsletterSection />

    </div>
  );
};
