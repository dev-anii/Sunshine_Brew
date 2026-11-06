import React, { useState, useEffect } from 'react';
import { MapPin, Phone, MessageCircle, Clock, Sparkles } from 'lucide-react';
import { BUSINESS_INFO, isCafeCurrentlyOpen } from '../data/cafeData';

export const TopBar: React.FC = () => {
  const [status, setStatus] = useState(isCafeCurrentlyOpen());

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(isCafeCurrentlyOpen());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-950/90 border-b border-white/10 text-xs text-slate-300 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Live Status & Hours */}
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900/80 border border-white/10 shadow-inner">
            <span className="relative flex h-2 w-2">
              {status.isOpen ? (
                <>
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </>
              ) : (
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
              )}
            </span>
            <span className={`font-semibold tracking-wide ${status.isOpen ? 'text-emerald-400' : 'text-amber-400'}`}>
              {status.statusText}
            </span>
            <span className="text-slate-500 hidden sm:inline">•</span>
            <span className="text-slate-400 hidden sm:inline flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              {BUSINESS_INFO.openingHoursText}
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 text-amber-400/90 font-medium">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Koramangala 2nd Block's Cozy Haven</span>
          </div>
        </div>

        {/* Center / Right: Address Tag & Quick Actions */}
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          {/* Address Tag with Map Link */}
          <a
            href={BUSINESS_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Open in Google Maps"
            className="flex items-center gap-1.5 text-slate-300 hover:text-amber-400 transition-colors group"
          >
            <MapPin className="w-3.5 h-3.5 text-amber-500 group-hover:scale-110 transition-transform" />
            <span className="truncate max-w-[190px] sm:max-w-xs md:max-w-sm">
              18th Main Rd, Koramangala 2nd Block
            </span>
          </a>

          <div className="h-3 w-px bg-white/10 hidden sm:block"></div>

          {/* Direct Phone Call */}
          <a
            href={`tel:${BUSINESS_INFO.phoneRaw}`}
            className="flex items-center gap-1.5 text-slate-300 hover:text-emerald-400 font-medium transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>{BUSINESS_INFO.phone}</span>
          </a>

          {/* WhatsApp Direct */}
          <a
            href={BUSINESS_INFO.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 font-medium transition-all"
          >
            <MessageCircle className="w-3 h-3 text-emerald-400" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
