import React, { useState } from 'react';
import { Sun, Calendar, ShieldCheck, Menu, X, Coffee, MapPin } from 'lucide-react';
import { BUSINESS_INFO } from '../data/cafeData';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenAdminLogin: () => void;
  isAdminLoggedIn: boolean;
  onGoToAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenAdminLogin,
  isAdminLoggedIn,
  onGoToAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="glass-panel sticky top-[41px] z-40 border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all">
              <Sun className="w-6 h-6 text-slate-950 fill-slate-950 animate-spin-slow" />
              <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  Sunshine Cafe
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  4.4 ★
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                <MapPin className="w-3 h-3 text-amber-400" /> Koramangala 2nd Block, Bangalore
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            <a href="#services" className="hover:text-amber-400 transition-colors">
              Menu & Offerings
            </a>
            <a href="#story" className="hover:text-amber-400 transition-colors">
              Our Story
            </a>
            <a href="#reviews" className="hover:text-amber-400 transition-colors">
              Reviews & Vibe
            </a>
            <a href="#location" className="hover:text-amber-400 transition-colors">
              Directions
            </a>
          </div>

          {/* Action Buttons: Book Now CTA & Discrete Admin Portal */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Discrete Admin Link */}
            <button
              onClick={isAdminLoggedIn ? onGoToAdmin : onOpenAdminLogin}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-white/10 transition-all shadow-sm"
              title="Protected Staff & Owner Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isAdminLoggedIn ? 'Admin Portal' : 'Admin Portal'}</span>
              {isAdminLoggedIn && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              )}
            </button>

            {/* Primary Conversion CTA: Reserve / Book Now */}
            <button
              onClick={onOpenBooking}
              className="btn-amber-gold inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-transform active:scale-95 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-slate-950" />
              <span>Book Now / Reserve</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenBooking}
              className="btn-amber-gold px-3 py-1.5 rounded-lg text-xs font-bold"
            >
              Reserve
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-white/10 text-slate-300 hover:text-white"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-modal border-t border-white/10 px-4 pt-4 pb-6 space-y-3">
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-200 hover:text-amber-400 border-b border-white/5"
          >
            Menu & Offerings
          </a>
          <a
            href="#story"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-200 hover:text-amber-400 border-b border-white/5"
          >
            Our Story & Ambience
          </a>
          <a
            href="#reviews"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-200 hover:text-amber-400 border-b border-white/5"
          >
            Google Reviews (4.4★)
          </a>
          <a
            href="#location"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-200 hover:text-amber-400 border-b border-white/5"
          >
            Address & Timings
          </a>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full btn-amber-gold py-2.5 rounded-xl text-center font-bold flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-slate-950" />
              <span>Book Table / Experience</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (isAdminLoggedIn) {
                  onGoToAdmin();
                } else {
                  onOpenAdminLogin();
                }
              }}
              className="w-full py-2 rounded-lg text-xs font-semibold text-slate-300 bg-slate-900/90 border border-white/10 flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Staff & Admin Dashboard</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
