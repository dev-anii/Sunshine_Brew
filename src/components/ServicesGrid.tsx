import React, { useState, useMemo } from 'react';
import { Check, Clock, Sparkles, Filter, Search, Calendar, Heart, ShieldCheck } from 'lucide-react';
import { SERVICES_DATA } from '../data/cafeData';
import { ServiceCategory, ServiceItem } from '../types';

interface ServicesGridProps {
  onSelectServiceForBooking: (service: ServiceItem) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onSelectServiceForBooking }) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'non-veg' | 'chef-special'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { key: ServiceCategory; label: string; count: number }[] = [
    { key: 'all', label: 'All Offerings', count: SERVICES_DATA.length },
    { key: 'breakfast', label: 'All-Day Breakfast', count: SERVICES_DATA.filter(s => s.category === 'breakfast').length },
    { key: 'burgers', label: 'Gourmet Burgers & Bites', count: SERVICES_DATA.filter(s => s.category === 'burgers').length },
    { key: 'coffee-boba', label: 'Coffee & Boba', count: SERVICES_DATA.filter(s => s.category === 'coffee-boba').length },
    { key: 'desserts', label: 'Desserts & Shakes', count: SERVICES_DATA.filter(s => s.category === 'desserts').length },
    { key: 'experiences', label: 'VIP Table & Tastings', count: SERVICES_DATA.filter(s => s.category === 'experiences').length },
  ];

  const filteredServices = useMemo(() => {
    return SERVICES_DATA.filter(item => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Dietary filter
      if (dietaryFilter === 'veg' && !item.isVeg) return false;
      if (dietaryFilter === 'non-veg' && item.isVeg) return false;
      if (dietaryFilter === 'chef-special' && !item.isChefSpecial) return false;
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesHighlights = item.highlights.some(h => h.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesHighlights) return false;
      }
      return true;
    });
  }, [activeCategory, dietaryFilter, searchQuery]);

  return (
    <section id="services" className="py-20 relative">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Artisan Menu & Experiences</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Crafted for Taste, Comfort & Community
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Each creation at Sunshine Cafe is hand-prepared with fresh ingredients, slow-steeped roasts, and artisan baking. Select any experience or dish to pre-reserve your table.
          </p>
        </div>

        {/* Controls: Category Tabs, Search Bar, and Dietary Filter */}
        <div className="mt-10 space-y-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start lg:justify-center">
            {categories.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveCategory(tab.key)}
                className={`shrink-0 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  activeCategory === tab.key
                    ? 'btn-amber-gold shadow-lg shadow-amber-500/20'
                    : 'bg-slate-900/70 hover:bg-slate-800 text-slate-300 border border-white/10 hover:text-white'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                    activeCategory === tab.key
                      ? 'bg-slate-950/20 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search & Dietary Quick Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-panel p-3 sm:p-4 rounded-2xl">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search avocado, burgers, boba, shakes..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950/70 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Dietary Tags Filter */}
            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              <span className="text-xs text-slate-400 flex items-center gap-1 shrink-0 font-medium mr-1">
                <Filter className="w-3.5 h-3.5 text-amber-400" /> Filter:
              </span>

              <button
                onClick={() => setDietaryFilter('all')}
                className={`px-3 py-1 rounded-lg text-xs font-medium shrink-0 transition-colors ${
                  dietaryFilter === 'all'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-white/5'
                }`}
              >
                All
              </button>

              <button
                onClick={() => setDietaryFilter('veg')}
                className={`px-3 py-1 rounded-lg text-xs font-medium shrink-0 transition-colors flex items-center gap-1.5 ${
                  dietaryFilter === 'veg'
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-white/5'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Pure Veg
              </button>

              <button
                onClick={() => setDietaryFilter('non-veg')}
                className={`px-3 py-1 rounded-lg text-xs font-medium shrink-0 transition-colors flex items-center gap-1.5 ${
                  dietaryFilter === 'non-veg'
                    ? 'bg-rose-500 text-white font-bold'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-white/5'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                Non-Veg
              </button>

              <button
                onClick={() => setDietaryFilter('chef-special')}
                className={`px-3 py-1 rounded-lg text-xs font-medium shrink-0 transition-colors flex items-center gap-1.5 ${
                  dietaryFilter === 'chef-special'
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-white/5'
                }`}
              >
                <Sparkles className="w-3 h-3 text-amber-400" />
                Chef's Picks
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 flex items-center justify-between text-xs text-slate-400 px-1">
          <span>
            Showing <strong className="text-white">{filteredServices.length}</strong> creations
          </span>
          <span className="text-slate-400">Prices in Indian Rupee (₹) inclusive of preparation</span>
        </div>

        {/* Services Cards Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map(service => (
            <div
              key={service.id}
              className="glass-card rounded-2xl overflow-hidden flex flex-col group border border-white/10 hover:border-amber-400/40"
            >
              {/* Card Image Banner */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

                {/* Dietary badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center border text-[10px] font-bold ${
                      service.isVeg
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-400'
                        : 'bg-rose-950/80 border-rose-500 text-rose-400'
                    }`}
                    title={service.isVeg ? 'Vegetarian' : 'Contains Non-Veg'}
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        service.isVeg ? 'bg-emerald-400' : 'bg-rose-500'
                      }`}
                    ></span>
                  </div>

                  {service.isBestseller && (
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold tracking-wide uppercase bg-amber-500 text-slate-950 shadow-md">
                      Bestseller
                    </span>
                  )}
                  {service.isChefSpecial && (
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold tracking-wide uppercase bg-cyan-500 text-slate-950 shadow-md">
                      Chef Special
                    </span>
                  )}
                </div>

                {/* Prep Duration Badge */}
                <div className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-white/10 text-slate-300 text-[11px] font-medium">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>{service.duration}</span>
                </div>

                {/* Price Over Image */}
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-amber-400/90 uppercase tracking-wider block">
                      {service.categoryLabel}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                      {service.name}
                    </h3>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-2xl font-black text-amber-400">₹{service.price}</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {service.description}
                </p>

                {/* Highlights List with clean checkmarks */}
                <div className="space-y-1.5 pt-2 border-t border-white/10">
                  {service.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="font-medium text-slate-300">{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Card CTA: Book Now / Reserve this item */}
                <div className="pt-2">
                  <button
                    onClick={() => onSelectServiceForBooking(service)}
                    className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold bg-slate-900/90 hover:bg-amber-500 text-slate-200 hover:text-slate-950 border border-white/10 hover:border-amber-500 flex items-center justify-center gap-2 transition-all duration-200 group/btn shadow-md cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-amber-400 group-hover/btn:text-slate-950 transition-colors" />
                    <span>Reserve Table for This</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="glass-panel text-center py-12 rounded-3xl mt-6">
            <p className="text-slate-400 text-sm">No dishes or experiences matched your filter criteria.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setDietaryFilter('all');
                setSearchQuery('');
              }}
              className="mt-3 px-4 py-2 rounded-xl text-xs font-bold btn-amber-gold"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
