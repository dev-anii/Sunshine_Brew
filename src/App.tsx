import React, { useState, useEffect, useCallback } from 'react';
import { TopBar } from './components/TopBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesGrid } from './components/ServicesGrid';
import { StorySection } from './components/StorySection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationCard } from './components/LocationCard';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboard } from './components/AdminDashboard';
import { INITIAL_BOOKINGS } from './data/cafeData';
import { Booking, BookingStatus, ServiceItem } from './types';
import { supabase, isSupabaseConfigured, mapRowToBooking } from './lib/supabase';
import { CheckCircle2, ShieldCheck, X } from 'lucide-react';

const STORAGE_KEY_BOOKINGS = 'sunshine_cafe_bookings_v1';
const STORAGE_KEY_ADMIN_AUTH = 'sunshine_cafe_admin_auth_v1';

export default function App() {
  // Bookings state initialized from localStorage or mock data
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BOOKINGS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_BOOKINGS;
  });

  // Admin authentication state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_ADMIN_AUTH) === 'true';
    } catch {
      return false;
    }
  });

  // Navigation / Modal States
  const [isAdminViewOpen, setIsAdminViewOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<ServiceItem | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Quick toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  }, []);

  // Fetch bookings from Supabase
  const fetchSupabaseBookings = useCallback(async () => {
    if (!isSupabaseConfigured) return;
    setIsRefreshing(true);
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Supabase fetch notice (fallback in use):', error.message);
      } else if (data && data.length > 0) {
        const mapped = data.map(mapRowToBooking);
        setBookings(mapped);
        try {
          localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(mapped));
        } catch {
          // safe
        }
      }
    } catch (err) {
      console.warn('Supabase connection note:', err);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  // Initial fetch and Supabase Realtime Subscription
  useEffect(() => {
    fetchSupabaseBookings();

    if (!isSupabaseConfigured) return;

    // Real-time listener for postgres changes on bookings table
    const channel = supabase
      .channel('realtime:bookings')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'bookings' },
        (payload) => {
          console.log('Real-time event from Supabase:', payload.eventType);
          // Auto refresh on remote changes
          fetchSupabaseBookings();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchSupabaseBookings]);

  // Sync bookings to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(bookings));
    } catch {
      // storage error
    }
  }, [bookings]);

  // Handle customer booking submission
  const handleBookingCreated = (newBooking: Booking) => {
    setBookings(prev => [newBooking, ...prev]);
    showToast(`Reservation #${newBooking.referenceNumber} created for ${newBooking.customerName}!`);
  };

  // Admin status update trigger: Confirm, Cancel, Completed
  const handleUpdateStatus = async (bookingId: string, newStatus: BookingStatus) => {
    // 1. Optimistic local update
    setBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );
    showToast(`Booking status updated to "${newStatus}"`);

    // 2. Direct update to Supabase backend
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase
          .from('bookings')
          .update({ status: newStatus })
          .eq('id', bookingId);

        if (error) {
          // Try matching by reference_number if id was a legacy client ID
          const target = bookings.find(b => b.id === bookingId);
          if (target && target.referenceNumber) {
            await supabase
              .from('bookings')
              .update({ status: newStatus })
              .eq('reference_number', target.referenceNumber);
          }
        }
      } catch (err) {
        console.warn('Supabase update note:', err);
      }
    }
  };

  // Admin delete booking trigger
  const handleDeleteBooking = async (bookingId: string) => {
    // 1. Optimistic local delete
    const target = bookings.find(b => b.id === bookingId);
    setBookings(prev => prev.filter(b => b.id !== bookingId));
    showToast('Booking record removed.');

    // 2. Direct delete on Supabase backend
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase
          .from('bookings')
          .delete()
          .eq('id', bookingId);

        if (error && target && target.referenceNumber) {
          await supabase
            .from('bookings')
            .delete()
            .eq('reference_number', target.referenceNumber);
        }
      } catch (err) {
        console.warn('Supabase delete note:', err);
      }
    }
  };

  // Admin add manual reservation (Walk-in / Phone)
  const handleAddManualBooking = async (manualBooking: Booking) => {
    // 1. Optimistic local update
    setBookings(prev => [manualBooking, ...prev]);
    showToast(`Manual reservation recorded for ${manualBooking.customerName}`);

    // 2. Direct insert into Supabase backend
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('bookings')
          .insert([
            {
              customer_name: manualBooking.customerName,
              phone_number: manualBooking.phone,
              service_name: manualBooking.serviceName,
              booking_date: manualBooking.date,
              time_slot: manualBooking.timeSlot,
              guest_count: manualBooking.guests,
              status: manualBooking.status,
              notes: manualBooking.specialRequests || null,
              reference_number: manualBooking.referenceNumber,
              estimated_amount: manualBooking.estimatedAmount,
            },
          ])
          .select()
          .single();

        if (data && data.id) {
          // Update id with generated Supabase uuid
          setBookings(prev =>
            prev.map(b => (b.id === manualBooking.id ? { ...b, id: data.id } : b))
          );
        }
      } catch (err) {
        console.warn('Supabase manual insert note:', err);
      }
    }
  };

  // Reset to original mock data
  const handleResetMockData = () => {
    setBookings(INITIAL_BOOKINGS);
    showToast('Reset to 4 default sample bookings.');
  };

  // Login success handler
  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    try {
      localStorage.setItem(STORAGE_KEY_ADMIN_AUTH, 'true');
    } catch {
      // safe
    }
    setIsLoginModalOpen(false);
    setIsAdminViewOpen(true);
    showToast('Welcome to Sunshine Cafe Admin Portal');
  };

  // Logout handler
  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    try {
      localStorage.removeItem(STORAGE_KEY_ADMIN_AUTH);
    } catch {
      // safe
    }
    setIsAdminViewOpen(false);
    showToast('Admin session locked.');
  };

  const handleSelectServiceForBooking = (service: ServiceItem) => {
    setSelectedServiceForBooking(service);
    setIsBookingModalOpen(true);
  };

  const handleOpenGeneralBooking = () => {
    setSelectedServiceForBooking(null);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Toast Feedback Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
          <div className="glass-modal px-4 py-3 rounded-2xl border border-amber-400/50 text-xs font-semibold text-white shadow-2xl flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="text-slate-400 hover:text-white ml-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content: Admin View or Customer Facing Website */}
      {isAdminViewOpen && isAdminLoggedIn ? (
        <AdminDashboard
          bookings={bookings}
          onUpdateStatus={handleUpdateStatus}
          onDeleteBooking={handleDeleteBooking}
          onAddManualBooking={handleAddManualBooking}
          onResetMockData={handleResetMockData}
          onExitAdmin={() => setIsAdminViewOpen(false)}
          onLogout={handleLogout}
          onRefreshBookings={fetchSupabaseBookings}
          isRefreshing={isRefreshing}
        />
      ) : (
        <>
          {/* Top Bar with dynamic live open status, clean address, phone, WhatsApp - No backend debug labels */}
          <TopBar />

          {/* Sticky Glass Navbar */}
          <Navbar
            onOpenBooking={handleOpenGeneralBooking}
            onOpenAdminLogin={() => setIsLoginModalOpen(true)}
            isAdminLoggedIn={isAdminLoggedIn}
            onGoToAdmin={() => setIsAdminViewOpen(true)}
          />

          {/* Hero Section */}
          <main className="flex-1">
            <Hero onOpenBooking={handleOpenGeneralBooking} />

            {/* Menu & Offerings Grid */}
            <ServicesGrid onSelectServiceForBooking={handleSelectServiceForBooking} />

            {/* Cafe Ambience & Story */}
            <StorySection />

            {/* Real Diner Reviews & Google Rating */}
            <ReviewsSection />

            {/* Location & Directions */}
            <LocationCard />
          </main>

          {/* Customer Facing Footer */}
          <Footer
            onOpenBooking={handleOpenGeneralBooking}
            onOpenAdminLogin={() => setIsLoginModalOpen(true)}
            isAdminLoggedIn={isAdminLoggedIn}
            onGoToAdmin={() => setIsAdminViewOpen(true)}
          />
        </>
      )}

      {/* Interactive Multi-step Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => {
          setIsBookingModalOpen(false);
          setSelectedServiceForBooking(null);
        }}
        preselectedService={selectedServiceForBooking}
        onBookingCreated={handleBookingCreated}
      />

      {/* Credential Gate Modal */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
