import React from 'react';
import { Sun, Heart, Coffee, UtensilsCrossed, ShieldCheck, Sparkles } from 'lucide-react';

export const StorySection: React.FC = () => {
  return (
    <section id="story" className="py-20 relative border-t border-b border-white/5 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual collage */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden glass-card border border-white/10 aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80"
                  alt="Cafe Interior"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 rounded-2xl glass-panel border border-amber-500/20 text-center">
                <Sun className="w-6 h-6 text-amber-400 mx-auto" />
                <p className="text-sm font-bold text-white mt-1">Yellow-Themed Vibe</p>
                <p className="text-[11px] text-slate-400">Warm ambient lighting & chill jazz</p>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="p-4 rounded-2xl glass-panel border border-cyan-500/20 text-center">
                <Coffee className="w-6 h-6 text-cyan-400 mx-auto" />
                <p className="text-sm font-bold text-white mt-1">100% Arabica Beans</p>
                <p className="text-[11px] text-slate-400">Roasted in Chikmagalur hills</p>
              </div>
              <div className="rounded-2xl overflow-hidden glass-card border border-white/10 aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80"
                  alt="Dine-in experience"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Story & Philosophy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Our Cafe Philosophy</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              A Cozy Sunshine Oasis in the Heart of Koramangala
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Sunshine Cafe was born with a simple intention: to bring cheerful, slow-food hospitality to South Bangalore. Nestled on the peaceful bylanes of 18th Main Road, our yellow-hued cafe offers an escape from Bangalore's hustle.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <UtensilsCrossed className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">All-Day Breakfast Without Time Limits</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Craving crispy bacon omelettes, creamy mushroom vol-au-vents, or French toast at 7 PM? Our entire breakfast kitchen runs all day long.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Coffee className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Artisan Smashes & Specialty Drinks</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    From our viral cheesy pizza popsicles to double smashed cheddar burgers, spanish iced lattes, and bursting boba sodas.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Cozy Workspace & Pet-Friendly Patio</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Equipped with high-speed WiFi, plenty of power sockets, comfortable seating booths, and warm welcoming baristas.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
