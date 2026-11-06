import React from 'react';
import { MapPin, Navigation, Phone, Clock, Wifi, Car, Dog, CreditCard, Sparkles, ExternalLink } from 'lucide-react';
import { BUSINESS_INFO } from '../data/cafeData';

export const LocationCard: React.FC = () => {
  return (
    <section id="location" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Column: Address, Hours & Contact Details */}
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-6 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Visit Sunshine Cafe</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">
                  Find Us in Koramangala 2nd Block
                </h2>
                <p className="text-sm text-slate-300 mt-2">
                  Tucked away in the serene residential bylanes, moments from St. John’s Hospital and the 6th Block boundary.
                </p>

                {/* Key Address & Hours Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  
                  {/* Address Box */}
                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase">
                      <MapPin className="w-4 h-4 text-amber-400" />
                      <span>Full Address</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                      {BUSINESS_INFO.address}
                    </p>
                    <p className="text-xs text-amber-400/90 font-medium">
                      Landmark: {BUSINESS_INFO.landmark}
                    </p>
                    <p className="text-xs text-slate-400">{BUSINESS_INFO.city}</p>
                  </div>

                  {/* Hours & Contact Box */}
                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase">
                      <Clock className="w-4 h-4 text-emerald-400" />
                      <span>Operating Hours</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 font-bold">
                      {BUSINESS_INFO.openingHoursText}
                    </p>
                    <p className="text-xs text-slate-400">Open 7 days a week</p>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                      <span className="text-slate-400">Direct Phone:</span>
                      <a
                        href={`tel:${BUSINESS_INFO.phoneRaw}`}
                        className="font-bold text-amber-400 hover:underline"
                      >
                        {BUSINESS_INFO.phone}
                      </a>
                    </div>
                  </div>

                </div>

                {/* Amenities / Facilities Badges */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <p className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-3">
                    Guest Amenities & Features
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-white/10 text-xs text-slate-300">
                      <Wifi className="w-3.5 h-3.5 text-cyan-400" />
                      <span>High-Speed WiFi</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-white/10 text-xs text-slate-300">
                      <Dog className="w-3.5 h-3.5 text-amber-400" />
                      <span>Pet-Friendly Patio</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-white/10 text-xs text-slate-300">
                      <Car className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Street / Easy Parking</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-white/10 text-xs text-slate-300">
                      <CreditCard className="w-3.5 h-3.5 text-indigo-400" />
                      <span>UPI & Cards Accepted</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={BUSINESS_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-amber-gold flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-amber-500/20"
                >
                  <Navigation className="w-4 h-4 text-slate-950" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-950" />
                </a>

                <a
                  href={BUSINESS_INFO.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 font-bold border border-emerald-500/30 text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
                >
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Column: Visual Maps Interface Mockup */}
            <div className="lg:col-span-5 relative bg-slate-950 min-h-[340px] flex flex-col justify-between p-6 overflow-hidden border-t lg:border-t-0 lg:border-l border-white/10">
              {/* Map background image preview */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />

              {/* Top pill */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-slate-900/90 border border-white/15 text-xs font-semibold text-slate-300 backdrop-blur-md">
                  Koramangala 2nd Block
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                  Open Today
                </span>
              </div>

              {/* Center Map Pin Card */}
              <div className="relative z-10 glass-card p-4 rounded-2xl border border-amber-400/40 text-center space-y-2 max-w-sm mx-auto shadow-2xl">
                <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/40">
                  <MapPin className="w-5 h-5 fill-slate-950" />
                </div>
                <h3 className="font-bold text-white text-base">Sunshine Cafe</h3>
                <p className="text-xs text-slate-300">
                  18th Main Rd, Santhosapuram, Koramangala
                </p>
                <a
                  href={BUSINESS_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 pt-1"
                >
                  <span>Launch Turn-by-Turn Navigation</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Bottom Quick Note */}
              <div className="relative z-10 text-center">
                <p className="text-[11px] text-slate-400">
                  Estimated travel: 5 mins from Forum Mall / St. John's Circle
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
