import React from 'react';
import { Star, Calendar, ArrowRight, Utensils, Wifi, Clock, Heart, Award } from 'lucide-react';
import { BUSINESS_INFO } from '../data/cafeData';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20">
      {/* Background ambient lighting effects (Electric Cyan and Warm Amber glows) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-amber-500/15 via-cyan-500/10 to-transparent blur-3xl pointer-events-none -z-10 rounded-full" />
      <div className="absolute top-12 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline, Proof, Value Props & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Live Social Proof Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-amber-500/30 backdrop-blur-md shadow-lg shadow-amber-500/5">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < 4 ? 'fill-amber-400 text-amber-400' : 'fill-amber-400/50 text-amber-400'
                    }`}
                  />
                ))}
              </div>
              <span className="text-white text-xs font-bold">{BUSINESS_INFO.rating} / 5.0</span>
              <span className="text-slate-400 text-xs font-medium">({BUSINESS_INFO.reviewCount}+ Google Reviews)</span>
              <span className="h-2.5 w-px bg-white/20"></span>
              <span className="text-amber-400 text-xs font-semibold flex items-center gap-1">
                <Award className="w-3 h-3" /> Koramangala Top Pick
              </span>
            </div>

            {/* High-Converting Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
              All-Day Breakfasts,{' '}
              <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
                Artisan Smash Burgers
              </span>{' '}
              & Specialty Brews.
            </h1>

            {/* Concise Value Proposition based on real Google reviews */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl">
              Tucked quietly in the leafy bylanes of Koramangala 2nd Block. From sizzling crispy bacon omelettes and fresh sourdough avocado toast to our viral mozzarella pizza popsicles and slow-steeped cold brews.
            </p>

            {/* Value Highlights Pill Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs text-slate-200 font-medium">All-Day Breakfast</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
                <Wifi className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-xs text-slate-200 font-medium">Fast Work WiFi</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
                <Utensils className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs text-slate-200 font-medium">₹600–800 for two</span>
              </div>
            </div>

            {/* High-Impact CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3">
              <button
                onClick={onOpenBooking}
                className="btn-amber-gold flex items-center justify-center gap-3 px-7 py-4 rounded-xl text-base font-bold shadow-xl shadow-amber-500/25 group cursor-pointer"
              >
                <Calendar className="w-5 h-5 text-slate-950 group-hover:scale-110 transition-transform" />
                <span>Book Now / Reserve</span>
                <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl text-base font-semibold text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800/80 border border-white/15 hover:border-amber-500/50 backdrop-blur-md transition-all shadow-md group"
              >
                <span>Explore Services & Menu</span>
                <span className="text-amber-400 text-xs px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/20 font-bold">
                  14+ Specialities
                </span>
              </a>
            </div>

            {/* Review Quote Highlight */}
            <div className="pt-2 flex items-center gap-3 border-t border-white/10 text-xs text-slate-400">
              <div className="flex -space-x-2 overflow-hidden">
                <img
                  className="inline-block h-7 w-7 rounded-full ring-2 ring-slate-900 object-cover"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
                  alt="Reviewer"
                />
                <img
                  className="inline-block h-7 w-7 rounded-full ring-2 ring-slate-900 object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                  alt="Reviewer"
                />
                <img
                  className="inline-block h-7 w-7 rounded-full ring-2 ring-slate-900 object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                  alt="Reviewer"
                />
              </div>
              <p className="italic">
                <span className="text-amber-400 font-semibold">“The Pizza Popsicles & Smash Burger are legendary.”</span> — Verified Bangalore Local Guides
              </p>
            </div>
          </div>

          {/* Right Column: Visual Showcase Cards */}
          <div className="lg:col-span-5 relative">
            {/* Main Visual Display Card */}
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl glass-card group">
              <div className="aspect-[4/3] w-full overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80"
                  alt="Sunshine Signature Smash Burger"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              </div>

              {/* Floating Badge on Card */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 border border-amber-400/40 text-amber-400 text-xs font-bold backdrop-blur-md shadow-lg">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>Chef's Masterpiece • ₹389</span>
              </div>

              {/* Card Footer with Details */}
              <div className="p-6 relative -mt-16 bg-gradient-to-t from-slate-950 via-slate-950/95 to-slate-950/60">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                      Sunshine Signature Double Smash
                    </h2>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                      Double caramelized patties, aged melted cheddar, secret sunshine glaze on toasted brioche.
                    </p>
                  </div>
                  <button
                    onClick={onOpenBooking}
                    className="shrink-0 p-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all shadow-md shadow-amber-500/20"
                    title="Reserve this dish"
                  >
                    <Calendar className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Overlapping Floating Glassmorphic Mini-Card 1 */}
            <div className="absolute -bottom-6 -left-6 sm:-left-8 max-w-[240px] glass-panel rounded-2xl p-3.5 border border-white/20 shadow-xl hidden sm:flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=200&q=80"
                  alt="Avocado Toast"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-[11px] text-amber-400 font-bold uppercase tracking-wider">All-Day Brunch</p>
                <p className="text-xs font-semibold text-white">Avocado Sourdough</p>
                <p className="text-[11px] text-emerald-400 font-medium">₹299 • Fresh Baked</p>
              </div>
            </div>

            {/* Overlapping Floating Glassmorphic Mini-Card 2 */}
            <div className="absolute -top-6 -right-4 sm:-right-6 glass-panel rounded-2xl p-3 border border-white/20 shadow-xl hidden sm:flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Heart className="w-4 h-4 fill-emerald-400 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">98% Satisfaction</p>
                <p className="text-[10px] text-slate-400">Based on diner feedback</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
