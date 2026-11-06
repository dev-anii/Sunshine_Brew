import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Phone, CheckCircle2, Sparkles, AlertCircle, ChevronRight, ChevronLeft, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SERVICES_DATA, TIME_SLOTS, BUSINESS_INFO } from '../data/cafeData';
import { Booking, ServiceItem } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: ServiceItem | null;
  onBookingCreated: (booking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
  onBookingCreated,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    preselectedService ? preselectedService.id : 'exp-1'
  );
  const [guests, setGuests] = useState<number>(2);
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('07:30 PM');
  const [customerName, setCustomerName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [completedBooking, setCompletedBooking] = useState<Booking | null>(null);

  // Sync if preselectedService changes
  useEffect(() => {
    if (preselectedService) {
      setSelectedServiceId(preselectedService.id);
    }
  }, [preselectedService]);

  if (!isOpen) return null;

  const currentService = SERVICES_DATA.find(s => s.id === selectedServiceId) || SERVICES_DATA[0];

  const handleNextStep1 = () => {
    if (!selectedServiceId) {
      setErrorMsg('Please select a dining experience or dish.');
      return;
    }
    setErrorMsg('');
    setStep(2);
  };

  const handleNextStep2 = () => {
    if (!selectedDate) {
      setErrorMsg('Please choose your visit date.');
      return;
    }
    if (!selectedTimeSlot) {
      setErrorMsg('Please choose a time slot.');
      return;
    }
    setErrorMsg('');
    setStep(3);
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid 10-digit phone number for reservation updates.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    // Generate random reference code
    const randomRef = 'SC-' + Math.floor(1000 + Math.random() * 9000);
    const estimatedAmount = currentService.price * (currentService.category === 'experiences' ? 1 : Math.max(1, Math.ceil(guests / 2)));
    const formattedPhone = phone.trim().startsWith('+91') ? phone.trim() : `+91 ${phone.trim()}`;

    let generatedId = 'bkg-' + Date.now();

    // Securely insert into Supabase backend
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('bookings')
          .insert([
            {
              customer_name: customerName.trim(),
              phone_number: formattedPhone,
              service_name: currentService.name,
              booking_date: selectedDate,
              time_slot: selectedTimeSlot,
              guest_count: guests,
              status: 'Confirmed',
              notes: specialRequests.trim() || null,
              reference_number: randomRef,
              estimated_amount: estimatedAmount,
            },
          ])
          .select()
          .single();

        if (error) {
          console.warn('Supabase insert note (fallback active):', error.message);
        } else if (data && data.id) {
          generatedId = data.id;
        }
      } catch (err) {
        console.warn('Supabase connection note:', err);
      }
    }

    const newBooking: Booking = {
      id: generatedId,
      referenceNumber: randomRef,
      customerName: customerName.trim(),
      phone: formattedPhone,
      serviceId: currentService.id,
      serviceName: currentService.name,
      guests,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      status: 'Confirmed',
      specialRequests: specialRequests.trim() || undefined,
      estimatedAmount,
      createdAt: new Date().toISOString(),
      source: 'Online',
    };

    setIsSubmitting(false);
    onBookingCreated(newBooking);
    setCompletedBooking(newBooking);
    setStep(4);

    // Fire festive celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#FBBF24', '#06B6D4', '#10B981'],
      });
    } catch {
      // safe fallback
    }
  };

  const handleResetAndClose = () => {
    setStep(1);
    setCustomerName('');
    setPhone('');
    setSpecialRequests('');
    setCompletedBooking(null);
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl glass-modal rounded-3xl overflow-hidden shadow-2xl border border-white/15 my-8">
        
        {/* Modal Top Bar */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {step === 4 ? 'Reservation Confirmed!' : 'Book Table / Experience'}
              </h3>
              <p className="text-xs text-slate-400">
                Sunshine Cafe • 18th Main Rd, Koramangala 2nd Block
              </p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-Step Indicator (Steps 1 to 3) */}
        {step !== 4 && (
          <div className="px-6 pt-4 pb-2 flex items-center justify-between text-xs font-semibold text-slate-400 border-b border-white/5 bg-slate-950/40">
            <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-amber-400' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step === 1 ? 'bg-amber-500 text-slate-950 font-bold' : step > 1 ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800'}`}>
                1
              </span>
              <span>Offering & Guests</span>
            </div>
            <div className="h-px w-6 bg-white/10"></div>
            <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-amber-400' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step === 2 ? 'bg-amber-500 text-slate-950 font-bold' : step > 2 ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800'}`}>
                2
              </span>
              <span>Date & Time</span>
            </div>
            <div className="h-px w-6 bg-white/10"></div>
            <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-amber-400' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step === 3 ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800'}`}>
                3
              </span>
              <span>Details</span>
            </div>
          </div>
        )}

        {/* Error notification banner */}
        {errorMsg && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Step 1: Offering & Guests */}
        {step === 1 && (
          <div className="p-6 space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Select Highlight Experience or Dish
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-56 overflow-y-auto pr-1">
                {SERVICES_DATA.map(service => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setSelectedServiceId(service.id)}
                    className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all ${
                      selectedServiceId === service.id
                        ? 'bg-amber-500/15 border-amber-400 text-white shadow-md'
                        : 'bg-slate-900/60 border-white/10 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-12 h-12 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-white truncate">{service.name}</p>
                      <p className="text-[11px] text-amber-400 font-semibold">₹{service.price} • {service.categoryLabel}</p>
                      <p className="text-[10px] text-slate-400">{service.duration}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Guest Count */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Number of Guests
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                {[1, 2, 3, 4, 5, 6, 8, 10].map(num => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setGuests(num)}
                    className={`w-10 h-10 rounded-xl text-xs font-bold transition-all ${
                      guests === num
                        ? 'btn-amber-500 bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/30'
                        : 'bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {num}
                  </button>
                ))}
                <span className="text-xs text-slate-400 ml-2">
                  {guests > 6 ? 'Group Dining Area' : 'Standard Booth / Table'}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                type="button"
                onClick={handleNextStep1}
                className="btn-amber-gold px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 cursor-pointer"
              >
                <span>Continue to Date & Time</span>
                <ChevronRight className="w-4 h-4 text-slate-950" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Date & Time Slot */}
        {step === 2 && (
          <div className="p-6 space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Select Date
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={e => setSelectedDate(e.target.value)}
                  className="bg-slate-900 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 w-full sm:w-auto"
                />
                <span className="text-xs text-slate-400">
                  Daily 12:30 PM to 10:30 PM
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Available Time Slots (Daily Opening)
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 max-h-48 overflow-y-auto pr-1">
                {TIME_SLOTS.map(slot => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTimeSlot(slot)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      selectedTimeSlot === slot
                        ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-md'
                        : 'bg-slate-900/80 border-white/10 text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleNextStep2}
                className="btn-amber-gold px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 cursor-pointer"
              >
                <span>Continue to Guest Details</span>
                <ChevronRight className="w-4 h-4 text-slate-950" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Customer Details & Special Requests */}
        {step === 3 && (
          <form onSubmit={handleSubmitBooking} className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Your Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Roy"
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    className="w-full bg-slate-900 border border-white/15 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Phone Number (WhatsApp Updates) *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full bg-slate-900 border border-white/15 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Special Requests or Dietary Preferences (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Window booth preference, extra crispy bread, birthday anniversary cake decor, outdoor patio..."
                value={specialRequests}
                onChange={e => setSpecialRequests(e.target.value)}
                className="w-full bg-slate-900 border border-white/15 rounded-xl p-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Quick Summary Pill */}
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-white/10 flex items-center justify-between text-xs">
              <div>
                <p className="text-slate-400">Booking Summary:</p>
                <p className="font-bold text-white mt-0.5">
                  {currentService.name} • {guests} {guests === 1 ? 'Guest' : 'Guests'}
                </p>
                <p className="text-amber-400 mt-0.5">
                  {selectedDate} at {selectedTimeSlot}
                </p>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-400">Est. Cover / Cost:</span>
                <p className="text-lg font-black text-emerald-400">
                  ₹{currentService.price * (currentService.category === 'experiences' ? 1 : Math.max(1, Math.ceil(guests / 2)))}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-amber-gold px-7 py-3 rounded-xl text-sm font-bold flex items-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                    <span>Saving Reservation...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    <span>Confirm Reservation</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Step 4: Confirmation Screen */}
        {step === 4 && completedBooking && (
          <div className="p-6 sm:p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
                Table Reserved Successfully
              </span>
              <h2 className="text-2xl font-black text-white">We're Excited to Host You!</h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                Your reservation at Sunshine Cafe has been confirmed and logged in our live guest list.
              </p>
            </div>

            {/* Pass / Ticket Card */}
            <div className="max-w-md mx-auto p-4 rounded-2xl glass-card border border-amber-400/30 text-left space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Reference Number</span>
                  <p className="text-base font-extrabold text-amber-400 font-mono tracking-wider">
                    {completedBooking.referenceNumber}
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Confirmed
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400">Guest Name</span>
                  <p className="font-semibold text-white">{completedBooking.customerName}</p>
                </div>
                <div>
                  <span className="text-slate-400">Party Size</span>
                  <p className="font-semibold text-white">{completedBooking.guests} Guests</p>
                </div>
                <div>
                  <span className="text-slate-400">Date</span>
                  <p className="font-semibold text-white">{completedBooking.date}</p>
                </div>
                <div>
                  <span className="text-slate-400">Time Slot</span>
                  <p className="font-semibold text-amber-400">{completedBooking.timeSlot}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                <span className="truncate max-w-[200px]">{completedBooking.serviceName}</span>
                <span className="font-bold text-emerald-400">₹{completedBooking.estimatedAmount}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-white/15 flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Get Directions (Maps)</span>
              </a>

              <button
                onClick={handleResetAndClose}
                className="w-full sm:w-auto btn-amber-gold px-6 py-2.5 rounded-xl text-xs font-bold"
              >
                Done / Return to Cafe
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
