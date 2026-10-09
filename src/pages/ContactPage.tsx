import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, MapPin, CheckCircle2, Send, ShieldCheck, Building2, Copy, Check, ExternalLink } from 'lucide-react';
import { PLANTATION_IMAGE } from '../data/mockData';

// Custom TikTok icon component
const TikTokIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.42a6.34 6.34 0 0 0-.86-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.28 8.28 0 0 0 4.77 1.48V6.78c-.34 0-.68-.03-1-.09z" />
  </svg>
);

export const ContactPage: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText('Puco and Partners complex, Ifite, Awka, Anambra State');
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setSubmitted(true);
  };

  const handleSendViaWhatsApp = () => {
    const text = `Hello Drop Palm Oil!%0A%0AName: ${encodeURIComponent(formState.name || 'Valued Customer')}%0APhone: ${encodeURIComponent(formState.phone || 'N/A')}%0AEmail: ${encodeURIComponent(formState.email || 'N/A')}%0ASubject: ${encodeURIComponent(formState.subject)}%0AMessage: ${encodeURIComponent(formState.message || 'I would like to inquire about Drop Palm Oil.')}`;
    window.location.href = `https://wa.me/2348127826671?text=${text}`;
  };

  return (
    <div className="py-12 md:py-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B85D0D] bg-[#FFF5EB] px-3.5 py-1.5 rounded-full border border-[#FED7AA]/60">
            <span>Direct Communication · PUCO Food & Farm Ltd</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#153823] tracking-tight">
            Contact Drop Palm Oil
          </h1>
          <p className="text-base text-[#5C554B] leading-relaxed">
            Reach our headquarters at <strong>Puco and Partners complex, Ifite, Awka, Anambra State</strong>. Whether you need personal kitchen bottles, bulk restaurant supply, or dispatch tracking, our team is always within reach.
          </p>
        </div>

        {/* 4 Interactive Contact Action Cards - Floating & Hovering Beautifully */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: WhatsApp Concierge */}
          <div className="hover-float-card animate-hover-float-1 group bg-white p-6 rounded-3xl border border-[#E0D7CC] hover:border-[#25D366] hover:ring-2 hover:ring-[#25D366]/30 shadow-md hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 ease-out flex flex-col justify-between cursor-pointer">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#25D366] group-hover:text-white transition-all duration-300 shadow-sm">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#25D366] block">Fastest Response</span>
                <h3 className="font-serif font-bold text-lg text-[#153823] group-hover:text-[#25D366] transition-colors">
                  WhatsApp Concierge
                </h3>
                <p className="text-xs text-[#786E63] mt-1">Instant chat, rapid orders & delivery updates</p>
              </div>
              <p className="font-mono text-sm font-bold text-[#153823] bg-[#FAF7F2] p-2 rounded-xl border border-[#E8DFD5] text-center">
                08127826671
              </p>
            </div>
            <a
              href="https://wa.me/2348127826671?text=Hello%20Drop%20Palm%20Oil!%20I%20have%20an%20inquiry."
              target="_blank"
              rel="noreferrer"
              className="mt-4 w-full py-2.5 px-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 shadow-xs group-hover:shadow transition-all"
            >
              <span>Chat on WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 2: Phone Call */}
          <div className="hover-float-card animate-hover-float-2 group bg-white p-6 rounded-3xl border border-[#E0D7CC] hover:border-[#153823] hover:ring-2 hover:ring-[#E07A1E]/30 shadow-md hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 ease-out flex flex-col justify-between cursor-pointer">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#E7F3EC] text-[#153823] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#153823] group-hover:text-white transition-all duration-300 shadow-sm">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#B85D0D] block">Voice Line</span>
                <h3 className="font-serif font-bold text-lg text-[#153823] group-hover:text-[#B85D0D] transition-colors">
                  Call Directly
                </h3>
                <p className="text-xs text-[#786E63] mt-1">Monday – Saturday, 8:00 AM – 6:00 PM</p>
              </div>
              <p className="font-mono text-sm font-bold text-[#153823] bg-[#FAF7F2] p-2 rounded-xl border border-[#E8DFD5] text-center">
                08127826671
              </p>
            </div>
            <a
              href="tel:+2348127826671"
              className="mt-4 w-full py-2.5 px-3 bg-[#153823] hover:bg-[#0D2216] text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 shadow-xs group-hover:shadow transition-all"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call 08127826671</span>
            </a>
          </div>

          {/* Card 3: Official Gmail */}
          <div className="hover-float-card animate-hover-float-3 group bg-white p-6 rounded-3xl border border-[#E0D7CC] hover:border-[#E07A1E] hover:ring-2 hover:ring-[#E07A1E]/30 shadow-md hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 ease-out flex flex-col justify-between cursor-pointer">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF5EB] text-[#E07A1E] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#E07A1E] group-hover:text-white transition-all duration-300 shadow-sm">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#E07A1E] block">Official Email</span>
                <h3 className="font-serif font-bold text-lg text-[#153823] group-hover:text-[#E07A1E] transition-colors">
                  Official Gmail
                </h3>
                <p className="text-xs text-[#786E63] mt-1">Wholesale, quotes & corporate inquiries</p>
              </div>
              <p className="text-[11px] font-semibold text-[#153823] bg-[#FAF7F2] p-2 rounded-xl border border-[#E8DFD5] text-center truncate" title="pucofoodsofficial@gmail.com">
                pucofoodsofficial@gmail.com
              </p>
            </div>
            <a
              href="mailto:pucofoodsofficial@gmail.com"
              className="mt-4 w-full py-2.5 px-3 bg-[#E07A1E] hover:bg-[#B85D0D] text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 shadow-xs group-hover:shadow transition-all"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Send Email</span>
            </a>
          </div>

          {/* Card 4: TikTok Official */}
          <div className="hover-float-card animate-hover-float-4 group bg-white p-6 rounded-3xl border border-[#E0D7CC] hover:border-black hover:ring-2 hover:ring-black/20 shadow-md hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 ease-out flex flex-col justify-between cursor-pointer">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-sm">
                <TikTokIcon className="w-6 h-6 text-[#25F4EE] group-hover:text-[#FE2C55] transition-colors" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#786E63] block">Social & Culinary Videos</span>
                <h3 className="font-serif font-bold text-lg text-[#153823] group-hover:text-black transition-colors">
                  TikTok Channel
                </h3>
                <p className="text-xs text-[#786E63] mt-1">Watch authentic soup preparations & purity tests</p>
              </div>
              <p className="font-mono text-sm font-bold text-black bg-[#FAF7F2] p-2 rounded-xl border border-[#E8DFD5] text-center">
                Drop palm oil
              </p>
            </div>
            <a
              href="https://www.tiktok.com/@droppalmoil"
              target="_blank"
              rel="noreferrer"
              className="mt-4 w-full py-2.5 px-3 bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 shadow-xs group-hover:shadow transition-all"
            >
              <TikTokIcon className="w-3.5 h-3.5 text-[#25F4EE]" />
              <span>TikTok: Drop palm oil</span>
            </a>
          </div>

        </div>

        {/* Hovering Location & HQ Spotlight Banner */}
        <div className="hover-float-card animate-hover-float-2 group bg-gradient-to-r from-[#153823] via-[#1C4B2F] to-[#0D2216] text-white p-6 sm:p-8 rounded-3xl border-2 border-[#25653F] hover:border-[#E07A1E] shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-10 -mt-10 w-44 h-44 rounded-full bg-[#E07A1E]/15 blur-2xl pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E07A1E] animate-ping" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E07A1E]">
                  Official Headquarters & Distribution Hub
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Puco and Partners Complex, Ifite, Awka, Anambra State
              </h2>
              <p className="text-xs sm:text-sm text-[#CAD9CA] leading-relaxed">
                Operating directly out of Ifite, Awka, Anambra State. Serving households, restaurants, bukas, and caterers across Anambra State and nationwide throughout Nigeria.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={handleCopyAddress}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold border border-white/20 flex items-center gap-2 transition-all cursor-pointer"
                title="Copy HQ Address"
              >
                {copiedAddress ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Copied Address!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#E07A1E]" />
                    <span>Copy HQ Address</span>
                  </>
                )}
              </button>

              <a
                href="https://wa.me/2348127826671?text=Hello%20Drop%20Palm%20Oil!%20I%20am%20inquiring%20about%20pickup%20or%20delivery%20from%20your%20Awka%20HQ."
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp: 08127826671</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Content: Form + Detailed Facility Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Contact Form - Hovering Beautifully */}
          <div className="lg:col-span-7 hover-float-card group bg-white rounded-3xl p-8 sm:p-10 border border-[#E0D7CC] hover:border-[#153823] hover:ring-2 hover:ring-[#E07A1E]/30 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-out">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-serif text-2xl font-bold text-[#153823]">
                Send Us A Message
              </h3>
              <span className="text-[11px] text-[#786E63] font-medium hidden sm:block">
                Reply within 2–4 hours
              </span>
            </div>
            <p className="text-xs text-[#5C554B] mb-6">
              Inquire about retail bottles, bulk catering orders, wholesale drums, or distribution partnerships.
            </p>

            {submitted ? (
              <div className="p-8 text-center space-y-3 bg-[#E7F3EC] rounded-2xl border border-[#C5E2D1]">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-serif text-xl font-bold text-[#153823]">Message Sent Successfully</h4>
                <p className="text-xs text-[#25653F] max-w-sm mx-auto">
                  Thank you for reaching out to <strong>PUCO Food & Farm Ltd</strong>. Our logistics and customer team in Awka, Anambra State will contact you shortly via WhatsApp or email.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
                  <button
                    onClick={handleSendViaWhatsApp}
                    className="px-5 py-2.5 text-xs font-bold text-white bg-[#25D366] hover:bg-[#1EBE5D] rounded-xl flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Also Dispatch to WhatsApp (08127826671)</span>
                  </button>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
                    }}
                    className="px-5 py-2.5 text-xs font-bold text-[#153823] bg-white rounded-xl border border-[#153823] hover:bg-[#FAF7F2] cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-[#153823] mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chinelo Okeke"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-3.5 py-3 bg-[#FAF7F2] border border-[#D5C6B5] rounded-xl focus:outline-none focus:border-[#153823] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#153823] mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0812 782 6671"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full px-3.5 py-3 bg-[#FAF7F2] border border-[#D5C6B5] rounded-xl focus:outline-none focus:border-[#153823] text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-[#153823] mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. name@example.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-3.5 py-3 bg-[#FAF7F2] border border-[#D5C6B5] rounded-xl focus:outline-none focus:border-[#153823] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#153823] mb-1">Subject</label>
                    <select
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full px-3.5 py-3 bg-[#FAF7F2] border border-[#D5C6B5] rounded-xl focus:outline-none focus:border-[#153823] text-sm"
                    >
                      <option value="General Inquiry">General Order Inquiry</option>
                      <option value="Wholesale / Restaurant Supply">Wholesale / Restaurant Supply (25L+)</option>
                      <option value="Event / Catering Bulk Supply">Event / Wedding Catering Bulk Supply</option>
                      <option value="Anambra Pickup / Delivery">Anambra State Pickup / Delivery (Awka, Onitsha)</option>
                      <option value="International Export">International Export / Diaspora Supply</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#153823] mb-1">Your Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about the litres needed, your delivery location in Anambra or nationwide, or any questions..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-3.5 py-3 bg-[#FAF7F2] border border-[#D5C6B5] rounded-xl focus:outline-none focus:border-[#153823] text-sm"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3.5 px-6 rounded-xl bg-[#153823] hover:bg-[#0D2216] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSendViaWhatsApp}
                    className="py-3.5 px-6 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Chat on WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Facility & Location Details Card - Hovering Beautifully */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="hover-float-card group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl border-4 border-white bg-[#153823] hover:-translate-y-3 transition-all duration-500 ease-out cursor-pointer">
              <img
                src={PLANTATION_IMAGE}
                alt="Drop Palm Oil - PUCO Food & Farm Ltd Facility"
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D2216] via-[#153823]/70 to-transparent pointer-events-none" />

              <div className="p-6 text-white space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#E07A1E]">
                    Headquarters & Operational Hub
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded border border-emerald-500/30">
                    Open Mon–Sat
                  </span>
                </div>

                <div className="space-y-3.5 text-xs">
                  {/* HQ Address */}
                  <div className="p-3 bg-white/10 backdrop-blur-xs rounded-xl border border-white/15">
                    <h4 className="font-bold text-sm text-white flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#E07A1E] shrink-0" />
                      <span>Headquarters (HQ)</span>
                    </h4>
                    <p className="text-[#F4EFEA] ml-6 mt-1 text-xs font-semibold leading-relaxed">
                      Puco and Partners complex, Ifite, Anambra state
                    </p>
                  </div>

                  {/* Location in Awka */}
                  <div className="p-3 bg-white/10 backdrop-blur-xs rounded-xl border border-white/15">
                    <h4 className="font-bold text-sm text-white flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#E07A1E] shrink-0" />
                      <span>Town & State</span>
                    </h4>
                    <p className="text-[#F4EFEA] ml-6 mt-1 text-xs font-semibold leading-relaxed">
                      Ifite, Awka, Anambra State, Nigeria
                    </p>
                  </div>

                  {/* Direct Contact Links */}
                  <div className="space-y-2 pt-1 text-[11px] text-[#CAD9CA]">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                        <span>WhatsApp:</span>
                      </span>
                      <a href="https://wa.me/2348127826671" target="_blank" rel="noreferrer" className="font-mono font-bold text-white hover:text-[#25D366] transition-colors">
                        08127826671
                      </a>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-[#E07A1E]" />
                        <span>Gmail:</span>
                      </span>
                      <a href="mailto:pucofoodsofficial@gmail.com" className="font-semibold text-white hover:text-[#E07A1E] transition-colors truncate max-w-[190px]">
                        pucofoodsofficial@gmail.com
                      </a>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <TikTokIcon className="w-3.5 h-3.5 text-[#25F4EE]" />
                        <span>TikTok:</span>
                      </span>
                      <a href="https://www.tiktok.com/@droppalmoil" target="_blank" rel="noreferrer" className="font-semibold text-white hover:text-[#25F4EE] transition-colors">
                        Drop palm oil
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#25653F] flex items-center justify-between text-[11px] text-[#CAD9CA]">
                  <span>Producer: PUCO Food & Farm Ltd</span>
                  <span className="text-emerald-400 font-bold">100% Verified Pure</span>
                </div>
              </div>
            </div>

            {/* Commercial Sampling Callout - Hovering Beautifully */}
            <div className="hover-float-card group bg-[#E7F3EC] p-5 rounded-2xl border border-[#C5E2D1] hover:border-[#153823] hover:ring-2 hover:ring-[#E07A1E]/30 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 flex items-start gap-3 cursor-pointer">
              <ShieldCheck className="w-6 h-6 text-[#153823] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <div>
                <h4 className="font-serif font-bold text-sm text-[#153823]">
                  Commercial Sampling & Fast Dispatch
                </h4>
                <p className="text-xs text-[#25653F] mt-1 leading-relaxed">
                  Restaurants, caterers, and food vendors in Awka, Onitsha, Enugu, Lagos, and nationwide can contact us at <strong>08127826671</strong> for sample evaluation and wholesale pallet schedules.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
