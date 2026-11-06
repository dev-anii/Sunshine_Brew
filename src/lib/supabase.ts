import { createClient } from '@supabase/supabase-js';
import { Booking, BookingStatus } from '../types';

// Supabase configuration
const SUPABASE_URL = 
  import.meta.env.VITE_SUPABASE_URL || 'https://mpssqqcmpxgjkirevhig.supabase.co';

const SUPABASE_ANON_KEY = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_j_ZBxkhP1GESD4K0bAVH6Q_KT8fpQBS';

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false,
  },
});

export interface SupabaseBookingRow {
  id: string;
  created_at?: string;
  customer_name: string;
  phone_number: string;
  service_name: string;
  booking_date: string;
  time_slot: string;
  guest_count: number;
  status: string;
  notes?: string | null;
  reference_number?: string | null;
  estimated_amount?: number | null;
}

// Convert DB row to UI Booking type
export function mapRowToBooking(row: SupabaseBookingRow): Booking {
  return {
    id: row.id,
    referenceNumber: row.reference_number || `SC-${row.id.slice(-4).toUpperCase()}`,
    customerName: row.customer_name,
    phone: row.phone_number,
    serviceId: 'custom',
    serviceName: row.service_name,
    guests: row.guest_count || 2,
    date: row.booking_date,
    timeSlot: row.time_slot,
    status: (row.status as BookingStatus) || 'Confirmed',
    specialRequests: row.notes || undefined,
    estimatedAmount: Number(row.estimated_amount) || 0,
    createdAt: row.created_at || new Date().toISOString(),
    source: 'Online',
  };
}

// Convert UI Booking to Supabase row format
export function mapBookingToRow(booking: Booking): Partial<SupabaseBookingRow> {
  return {
    customer_name: booking.customerName,
    phone_number: booking.phone,
    service_name: booking.serviceName,
    booking_date: booking.date,
    time_slot: booking.timeSlot,
    guest_count: booking.guests,
    status: booking.status,
    notes: booking.specialRequests || '',
    reference_number: booking.referenceNumber,
    estimated_amount: booking.estimatedAmount,
  };
}

// SQL Script for user
export const SUPABASE_SETUP_SQL = `-- Run this in your Supabase SQL Editor:
-- 1. Create the bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  customer_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  service_name TEXT NOT NULL,
  booking_date TEXT NOT NULL,
  time_slot TEXT NOT NULL,
  guest_count INTEGER DEFAULT 2 NOT NULL,
  status TEXT DEFAULT 'Confirmed' NOT NULL,
  notes TEXT,
  reference_number TEXT,
  estimated_amount NUMERIC DEFAULT 0
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Allow public to insert new bookings (Reservation Modal)
CREATE POLICY "Allow public insert to bookings"
ON public.bookings
FOR INSERT
TO public
WITH CHECK (true);

-- 4. Policy: Allow public to view bookings (Demo & Admin Portal)
CREATE POLICY "Allow public read from bookings"
ON public.bookings
FOR SELECT
TO public
USING (true);

-- 5. Policy: Allow public update (Status Confirm / Cancel in Admin)
CREATE POLICY "Allow public update on bookings"
ON public.bookings
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- 6. Policy: Allow public delete (Admin Portal)
CREATE POLICY "Allow public delete on bookings"
ON public.bookings
FOR DELETE
TO public
USING (true);

-- 7. Insert initial demo bookings
INSERT INTO public.bookings (customer_name, phone_number, service_name, booking_date, time_slot, guest_count, status, notes, reference_number, estimated_amount)
VALUES 
  ('Rohan Mehta', '+91 98450 12389', 'Cozy Table Reservation (2-6 Guests)', '2026-11-06', '07:30 PM', 4, 'Confirmed', 'Prefer window booth with garden view. Celebrating birthday.', 'SC-8492', 200),
  ('Ananya Sharma', '+91 97412 88765', 'Sunset Chef’s 4-Course Tasting for Two', '2026-11-06', '08:15 PM', 2, 'Pending', 'One guest is vegetarian, please customize tasting burger.', 'SC-8493', 1499),
  ('Dr. Vikram Rao', '+91 98860 33421', 'Cozy Table Reservation (2-6 Guests)', '2026-11-07', '01:30 PM', 3, 'Confirmed', 'Quiet corner for lunch discussion. Need WiFi.', 'SC-8494', 200),
  ('Priyal & Tanmay', '+91 99001 77654', 'Artisan Avocado on Toasted Sourdough', '2026-11-07', '12:45 PM', 2, 'Completed', 'Extra crispy sourdough, outdoor high table if open.', 'SC-8495', 598)
ON CONFLICT DO NOTHING;
`;
