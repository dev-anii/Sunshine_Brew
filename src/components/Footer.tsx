import React from 'react';
import { Sun, Phone, MapPin, Clock, MessageCircle, Heart, ShieldCheck, ArrowUp } from 'lucide-react';
import { BUSINESS_INFO } from '../data/cafeData';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenAdminLogin: () => void;
  isAdminLoggedIn: boolean;
  onGoToAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBooking,
  onOpenAdminLogin,
  isAdminLoggedIn,
  onGoToAdmin,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-white/10 text-slate-400 text-xs relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-amber-500/20">
                <Sun className="w-5 h-5 fill-slate-950" />
              </div>
              <span className="font-extrabold text-lg text-white">Sunshine Cafe</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Koramangala’s beloved cozy cafe for artisan all-day breakfasts, smashed patties, cold brews, and decadent boba shakes.
            </p>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
              <span>★ 4.4 on Google Maps</span>
              <span>•</span>
              <span>380+ Diners</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-white">Explore</p>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  All-Day Breakfast Menu
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  Gourmet Smash Burgers
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  Specialty Coffee & Boba
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-amber-400 transition-colors">
                  Our Ambience & Story
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-amber-400 transition-colors">
                  Verified Diner Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-white">Visit & Timings</p>
            <p className="text-slate-300">
              <strong className="text-white block font-semibold">Address:</strong>
              {BUSINESS_INFO.address}, Koramangala 2nd Block, Bangalore - 560034
            </p>
            <p className="text-slate-300">
              <strong className="text-white block font-semibold">Timings:</strong>
              {BUSINESS_INFO.openingHoursText}
            </p>
            <p className="text-slate-300">
              <strong className="text-white block font-semibold">Reservations & Takeaway:</strong>
              <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="text-amber-400 hover:underline">
                {BUSINESS_INFO.phone}
              </a>
            </p>
          </div>

          {/* Actions & Staff Access */}
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-wider text-white">Reservations</p>
            <p className="text-xs text-slate-400">
              Planning a visit with family or friends? Book in advance for guaranteed seating.
            </p>
            <button
              onClick={onOpenBooking}
              className="w-full btn-amber-gold py-2.5 rounded-xl text-xs font-bold"
            >
              Book Table Online
            </button>

            {/* Discrete Admin Portal Entry in Footer */}
            <div className="pt-2 border-t border-white/5">
              <button
                onClick={isAdminLoggedIn ? onGoToAdmin : onOpenAdminLogin}
                className="w-full py-2 px-3 rounded-lg text-[11px] font-semibold text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-white/10 flex items-center justify-center gap-1.5 transition-colors"
                title="Management Portal for Staff"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>{isAdminLoggedIn ? 'Open Admin Dashboard' : 'Staff Admin Portal (Protected)'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Sunshine Cafe • All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <a
              href={BUSINESS_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors"
            >
              Google Maps Listing
            </a>
            <span>•</span>
            <a
              href={BUSINESS_INFO.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline flex items-center gap-1"
            >
              <MessageCircle className="w-3 h-3" /> WhatsApp
            </a>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="hover:text-white flex items-center gap-1 transition-colors"
              title="Scroll to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3 text-amber-400" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
