import React from 'react';
import { Star, Quote, CheckCircle2, MessageSquare, ThumbsUp } from 'lucide-react';
import { REVIEWS_DATA, BUSINESS_INFO } from '../data/cafeData';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Real Customer Stories</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-3 tracking-tight">
              Loved by Bengaluru Foodies & Locals
            </h2>
            <p className="text-sm text-slate-300 mt-2 max-w-xl">
              Don’t just take our word for it. Here is what diners on Google Maps and food lovers from Koramangala say about our all-day breakfasts and burgers.
            </p>
          </div>

          {/* Big Rating Summary Badge */}
          <div className="glass-panel p-4 sm:p-5 rounded-2xl flex items-center gap-4 shrink-0 border border-amber-400/30 shadow-lg">
            <div className="text-center">
              <span className="text-4xl font-black text-amber-400 leading-none">
                {BUSINESS_INFO.rating}
              </span>
              <div className="flex items-center justify-center gap-0.5 text-amber-400 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
            <div className="h-10 w-px bg-white/10"></div>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">Google Maps Rating</p>
              <p className="text-xs text-slate-400">{BUSINESS_INFO.reviewCount}+ Verified Reviews</p>
              <p className="text-[11px] text-emerald-400 font-semibold mt-0.5">Top-rated in Koramangala 2nd Block</p>
            </div>
          </div>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS_DATA.map(rev => (
            <div
              key={rev.id}
              className="glass-card rounded-2xl p-6 flex flex-col justify-between border border-white/10 space-y-4 hover:border-amber-400/40 relative group"
            >
              <div className="space-y-3">
                {/* Rating Stars & Source */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-white/5">
                    {rev.source}
                  </span>
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Bottom: Author and Recommended Dish */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-500/30"
                  />
                  <div>
                    <h3 className="text-xs font-bold text-white">{rev.author}</h3>
                    <p className="text-[10px] text-slate-400">{rev.date}</p>
                  </div>
                </div>

                {rev.recommendedItem && (
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block font-medium">Favorite:</span>
                    <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {rev.recommendedItem}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
