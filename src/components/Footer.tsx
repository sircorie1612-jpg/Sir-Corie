import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Phone, Mail, MapPin, ShieldCheck, Heart, Share2, Check } from 'lucide-react';
import { DROP_LOGO_IMAGE } from '../data/mockData';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      const liveUrl = 'https://ais-pre-m2ork7azejm2342ypcfn72-62381986629.europe-west2.run.app';
      const url = typeof window !== 'undefined' && window.location.href.startsWith('http')
        ? window.location.href
        : liveUrl;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = url;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 2000);
  };

  const navigateTo = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#153823] text-[#FAF7F2] border-t border-[#1C4B2F]">
      {/* Top Value Assurance Ribbon */}
      <div className="border-b border-[#25653F]/40 bg-[#0D2216]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <ShieldCheck className="w-6 h-6 text-[#E07A1E] shrink-0" />
              <div>
                <p className="text-sm font-semibold text-white">100% Guaranteed Unadulterated</p>
                <p className="text-xs text-[#A8BFA8]">Zero Sudan dyes, zero additives, 100% virgin palm fruit</p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[#E07A1E]/20 text-[#E07A1E] flex items-center justify-center text-xs font-bold shrink-0">
                24h
              </span>
              <div>
                <p className="text-sm font-semibold text-white">Prompt Nationwide Logistics</p>
                <p className="text-xs text-[#A8BFA8]">Dispatch across Lagos, Abuja, Port Harcourt & beyond</p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <Heart className="w-6 h-6 text-[#E07A1E] shrink-0" />
              <div>
                <p className="text-sm font-semibold text-white">Smallholder Farmer First</p>
                <p className="text-xs text-[#A8BFA8]">Sustainably harvested with 450+ grower families in Edo</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] p-1 flex items-center justify-center overflow-hidden border border-[#E07A1E]/30">
                <img
                  src={DROP_LOGO_IMAGE}
                  alt="Drop Palm Oil"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'https://i.ibb.co/Y7vQLWph/Whats-App-Image-2026-09-28-at-5-17-47-PM-1-removebg-preview.png';
                  }}
                />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                DROP PALM OIL
              </span>
            </div>
            <p className="text-sm text-[#CAD9CA] leading-relaxed max-w-sm">
              Bringing authentic palm-oil goodness from the palm plantation to the bottle to your kitchen. Produced with integrity, pristine clarity, and rich Nigerian taste.
            </p>
            
            <div className="pt-2 text-xs text-[#A8BFA8] space-y-2.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E07A1E] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Headquarters (HQ):</strong>
                  <span>Puco and Partners complex, Ifite, Anambra state</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#E07A1E] shrink-0" />
                <span>Location: Ifite, Awka, Anambra State</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#25D366] shrink-0" />
                <a href="https://wa.me/2348127826671" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  WhatsApp: <strong className="text-white">08127826671</strong>
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E07A1E] shrink-0" />
                <a href="mailto:pucofoodsofficial@gmail.com" className="hover:text-white transition-colors">
                  Gmail: <strong className="text-white">pucofoodsofficial@gmail.com</strong>
                </a>
              </div>
            </div>

            {/* Left-side action buttons: ADMIN DASHBOARD & SHARE LINK */}
            <div className="pt-3 border-t border-[#25653F]/40 flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => navigateTo('admin')}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0D2216] border border-[#25653F] hover:border-[#E07A1E] text-[#E07A1E] hover:text-white text-xs font-semibold tracking-wide transition-all shadow-sm group cursor-pointer"
                title="Access Admin Dashboard (Password: 1234)"
              >
                <ShieldCheck className="w-4 h-4 text-[#E07A1E] group-hover:scale-110 transition-transform" />
                <span>ADMIN DASHBOARD</span>
              </button>

              <button
                onClick={handleCopyLink}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-semibold tracking-wide transition-all shadow-sm cursor-pointer ${
                  copied
                    ? 'bg-[#1C4B2F] border-[#25D366] text-[#25D366]'
                    : 'bg-[#0D2216] border-[#25653F] hover:border-[#25F4EE] text-white hover:text-[#25F4EE]'
                }`}
                title="Copy and share website link"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#25D366]" />
                    <span>LINK COPIED!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-[#25F4EE]" />
                    <span>SHARE LINK</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#E07A1E]">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-[#CAD9CA]">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-white transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('products')} className="hover:text-white transition-colors cursor-pointer">
                  Our Products
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('recipes')} className="hover:text-white transition-colors cursor-pointer">
                  Cook With Us (Recipes)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors cursor-pointer">
                  About Our Story
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('vision')} className="hover:text-white transition-colors cursor-pointer">
                  Our Vision & Mission
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Contact & Wholesale
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('admin')}
                  className="text-[#E07A1E] hover:text-white font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Dashboard</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service & Wholesale */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#E07A1E]">
              Customer Care
            </h4>
            <ul className="space-y-2 text-sm text-[#CAD9CA]">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer" onClick={() => navigateTo('contact')}>
                  Delivery & Logistics Info
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer" onClick={() => navigateTo('contact')}>
                  Wholesale & Catering Supply
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer" onClick={() => navigateTo('about')}>
                  Quality Testing Standards
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer" onClick={() => navigateTo('about')}>
                  Storage & Handling Advice
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer" onClick={() => navigateTo('vision')}>
                  Farmer Fair-Pricing Guarantee
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#E07A1E]">
              Stay In The Loop
            </h4>
            <p className="text-xs text-[#CAD9CA]">
              Get secret Nigerian soup recipes, chef tips, and harvest batch updates.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-[#1C4B2F] rounded-lg text-xs text-[#FAF7F2]">
                <CheckCircle2 className="w-4 h-4 text-[#E07A1E]" />
                <span>You are subscribed! Welcome to the Drop kitchen.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#0D2216] border border-[#25653F] rounded-lg text-white placeholder-[#789978] focus:outline-none focus:border-[#E07A1E]"
                />
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider bg-[#E07A1E] hover:bg-[#B85D0D] text-white rounded-lg transition-colors cursor-pointer"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
            <p className="text-[11px] text-[#86A886] pt-1">
              Zero spam. Unsubscribe anytime.
            </p>
          </div>

        </div>

        {/* Bottom Bar with Left Controls and Copyright */}
        <div className="mt-12 pt-8 border-t border-[#25653F]/50 flex flex-col lg:flex-row items-center justify-between gap-5 text-xs text-[#A8BFA8]">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            {/* Left-side controls: Admin Dashboard & Share Link icon */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigateTo('admin')}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#0D2216] border border-[#25653F] hover:border-[#E07A1E] text-[#E07A1E] hover:text-white font-medium transition-colors cursor-pointer text-xs"
                title="Open Admin Dashboard (Password: 1234)"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Dashboard</span>
              </button>

              <button
                onClick={handleCopyLink}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border font-medium transition-colors cursor-pointer text-xs ${
                  copied
                    ? 'bg-[#1C4B2F] border-[#25D366] text-[#25D366]'
                    : 'bg-[#0D2216] border-[#25653F] hover:border-[#25F4EE] text-[#CAD9CA] hover:text-[#25F4EE]'
                }`}
                title="Copy website link to share"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-[#25F4EE]" />
                    <span>Share Link</span>
                  </>
                )}
              </button>
            </div>

            <p>© {new Date().getFullYear()} Drop Palm Oil Limited. All rights reserved.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-6">
            <a
              href="https://www.tiktok.com/@droppalmoil"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-[#25F4EE] font-semibold transition-colors flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-[#FE2C55]" />
              <span>TikTok: Drop palm oil</span>
            </a>
            <a
              href="https://wa.me/2348127826671"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#25D366] transition-colors"
            >
              WhatsApp: 08127826671
            </a>
            <a
              href="mailto:pucofoodsofficial@gmail.com"
              className="hover:text-white transition-colors"
            >
              pucofoodsofficial@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
