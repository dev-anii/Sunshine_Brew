import React, { useState, useMemo } from 'react';
import { 
  Users, CheckCircle, Clock, AlertTriangle, Trash2, Check, XCircle, 
  Search, Plus, RotateCcw, ArrowLeft, LogOut, Phone, Calendar, 
  IndianRupee, Sparkles, Filter, ChevronDown, CheckCheck, Database,
  RefreshCw, Copy, CheckCircle2, Code
} from 'lucide-react';
import { Booking, BookingStatus } from '../types';
import { SERVICES_DATA, TIME_SLOTS } from '../data/cafeData';
import { SUPABASE_SETUP_SQL, isSupabaseConfigured } from '../lib/supabase';

interface AdminDashboardProps {
  bookings: Booking[];
  onUpdateStatus: (bookingId: string, newStatus: BookingStatus) => void;
  onDeleteBooking: (bookingId: string) => void;
  onAddManualBooking: (booking: Booking) => void;
  onResetMockData: () => void;
  onExitAdmin: () => void;
  onLogout: () => void;
  onRefreshBookings?: () => Promise<void> | void;
  isRefreshing?: boolean;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  bookings,
  onUpdateStatus,
  onDeleteBooking,
  onAddManualBooking,
  onResetMockData,
  onExitAdmin,
  onLogout,
  onRefreshBookings,
  isRefreshing = false,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | BookingStatus>('All');
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [isSqlModalOpen, setIsSqlModalOpen] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  // Manual booking form state
  const [manualName, setManualName] = useState('');
  const [manualPhone, setManualPhone] = useState('');
  const [manualServiceId, setManualServiceId] = useState(SERVICES_DATA[0].id);
  const [manualGuests, setManualGuests] = useState(2);
  const [manualDate, setManualDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [manualTime, setManualTime] = useState('08:00 PM');
  const [manualNotes, setManualNotes] = useState('');
  const [manualSource, setManualSource] = useState<'Walk-in' | 'Phone'>('Phone');

  // KPI Calculations
  const stats = useMemo(() => {
    const total = bookings.length;
    const pending = bookings.filter(b => b.status === 'Pending').length;
    const confirmed = bookings.filter(b => b.status === 'Confirmed').length;
    const completed = bookings.filter(b => b.status === 'Completed').length;
    const cancelled = bookings.filter(b => b.status === 'Cancelled').length;
    const totalRevenue = bookings
      .filter(b => b.status !== 'Cancelled')
      .reduce((acc, curr) => acc + (curr.estimatedAmount || 0), 0);

    return { total, pending, confirmed, completed, cancelled, totalRevenue };
  }, [bookings]);

  // Filtered Bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter(booking => {
      if (statusFilter !== 'All' && booking.status !== statusFilter) {
        return false;
      }
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = booking.customerName.toLowerCase().includes(query);
        const matchesPhone = booking.phone.toLowerCase().includes(query);
        const matchesService = booking.serviceName.toLowerCase().includes(query);
        const matchesRef = booking.referenceNumber.toLowerCase().includes(query);
        if (!matchesName && !matchesPhone && !matchesService && !matchesRef) {
          return false;
        }
      }
      return true;
    });
  }, [bookings, statusFilter, searchTerm]);

  const handleCreateManual = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName.trim() || !manualPhone.trim()) return;

    const s = SERVICES_DATA.find(item => item.id === manualServiceId) || SERVICES_DATA[0];
    const newEntry: Booking = {
      id: 'bkg-' + Date.now(),
      referenceNumber: 'SC-' + Math.floor(1000 + Math.random() * 9000),
      customerName: manualName.trim(),
      phone: manualPhone.trim().startsWith('+91') ? manualPhone.trim() : `+91 ${manualPhone.trim()}`,
      serviceId: s.id,
      serviceName: s.name,
      guests: manualGuests,
      date: manualDate,
      timeSlot: manualTime,
      status: 'Confirmed',
      specialRequests: manualNotes.trim() || undefined,
      estimatedAmount: s.price * (s.category === 'experiences' ? 1 : Math.max(1, Math.ceil(manualGuests / 2))),
      createdAt: new Date().toISOString(),
      source: manualSource,
    };

    onAddManualBooking(newEntry);
    setManualName('');
    setManualPhone('');
    setManualNotes('');
    setIsManualModalOpen(false);
  };

  const copySqlToClipboard = () => {
    navigator.clipboard.writeText(SUPABASE_SETUP_SQL);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header Bar */}
        <div className="glass-panel p-4 sm:p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4 border border-white/10">
          <div className="flex items-center gap-3">
            <button
              onClick={onExitAdmin}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 flex items-center gap-1.5 text-xs font-semibold transition-colors"
              title="Return to Customer Website"
            >
              <ArrowLeft className="w-4 h-4 text-amber-400" />
              <span>Back to Cafe</span>
            </button>
            <div className="h-5 w-px bg-white/10"></div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg sm:text-xl text-white">
                  Sunshine Cafe • Executive Portal
                </span>
                {isSupabaseConfigured ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Supabase Live</span>
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-800 text-slate-400 border border-white/10">
                    Local Storage
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                Koramangala 2nd Block • Table Reservations & Guest CRM
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* Supabase SQL Editor helper modal trigger */}
            <button
              onClick={() => setIsSqlModalOpen(true)}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-cyan-400 bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/30 flex items-center gap-1.5 transition-colors"
              title="View copy-paste SQL schema for Supabase"
            >
              <Code className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Supabase SQL</span>
            </button>

            {/* Live refresh trigger */}
            {onRefreshBookings && (
              <button
                onClick={() => onRefreshBookings()}
                disabled={isRefreshing}
                className="p-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-white/10 hover:border-white/20 transition-colors disabled:opacity-50"
                title="Fetch live records from database"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-amber-400' : ''}`} />
              </button>
            )}

            <button
              onClick={onResetMockData}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 border border-white/10 hover:border-amber-400/30 flex items-center gap-1.5 transition-colors"
              title="Reset to 4 default realistic entries"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sample Data</span>
            </button>

            <button
              onClick={() => setIsManualModalOpen(true)}
              className="btn-amber-gold px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4 text-slate-950" />
              <span>New Reservation</span>
            </button>

            <button
              onClick={onLogout}
              className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Lock Admin Portal"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Lock</span>
            </button>
          </div>
        </div>

        {/* 4 KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Total Bookings */}
          <div className="glass-card p-5 rounded-2xl border border-white/10 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-400">Total Bookings</span>
              <p className="text-3xl font-black text-white">{stats.total}</p>
              <span className="text-[11px] text-slate-500">Live in database</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>

          {/* Card 2: Pending Requests */}
          <div className="glass-card p-5 rounded-2xl border border-white/10 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-400">Pending Requests</span>
              <p className="text-3xl font-black text-amber-400">{stats.pending}</p>
              <span className="text-[11px] text-amber-500/80 font-medium">Requires staff review</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          {/* Card 3: Confirmed Appointments */}
          <div className="glass-card p-5 rounded-2xl border border-white/10 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-400">Confirmed Tables</span>
              <p className="text-3xl font-black text-emerald-400">{stats.confirmed}</p>
              <span className="text-[11px] text-emerald-400 font-medium">Ready for arrival</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>

          {/* Card 4: Estimated Revenue */}
          <div className="glass-card p-5 rounded-2xl border border-white/10 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-400">Estimated Revenue</span>
              <p className="text-3xl font-black text-amber-300">₹{stats.totalRevenue.toLocaleString('en-IN')}</p>
              <span className="text-[11px] text-slate-400">Active table billings</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center">
              <IndianRupee className="w-6 h-6" />
            </div>
          </div>

        </div>

        {/* Filter and Search Bar */}
        <div className="glass-panel p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/10">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {(['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'] as const).map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-colors ${
                  statusFilter === status
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by guest, phone, or service..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950/80 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Active Bookings Table */}
        <div className="glass-panel rounded-2xl overflow-hidden border border-white/10 shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 border-b border-white/10 text-slate-400 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3.5 px-4">Ref #</th>
                  <th className="py-3.5 px-4">Guest Info</th>
                  <th className="py-3.5 px-4">Offering / Experience</th>
                  <th className="py-3.5 px-4">Date & Slot</th>
                  <th className="py-3.5 px-4 text-center">Party</th>
                  <th className="py-3.5 px-4">Est. Bill</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredBookings.map(b => (
                  <tr key={b.id} className="hover:bg-slate-900/40 transition-colors">
                    {/* Ref # & Source */}
                    <td className="py-4 px-4 font-mono font-bold text-amber-400">
                      <div>{b.referenceNumber}</div>
                      <span className="text-[10px] font-sans font-normal text-slate-500">
                        {b.source}
                      </span>
                    </td>

                    {/* Guest Name & Phone */}
                    <td className="py-4 px-4">
                      <div className="font-bold text-white text-sm">{b.customerName}</div>
                      <a
                        href={`tel:${b.phone}`}
                        className="text-slate-400 hover:text-emerald-400 flex items-center gap-1 mt-0.5"
                      >
                        <Phone className="w-3 h-3 text-emerald-400" />
                        <span>{b.phone}</span>
                      </a>
                      {b.specialRequests && (
                        <p className="text-[11px] text-amber-400/90 italic mt-1 line-clamp-1" title={b.specialRequests}>
                          "{b.specialRequests}"
                        </p>
                      )}
                    </td>

                    {/* Chosen Service */}
                    <td className="py-4 px-4 text-slate-200 font-medium max-w-xs">
                      {b.serviceName}
                    </td>

                    {/* Date & Time Slot */}
                    <td className="py-4 px-4">
                      <div className="font-medium text-white">{b.date}</div>
                      <div className="text-amber-400 font-bold mt-0.5">{b.timeSlot}</div>
                    </td>

                    {/* Party Size */}
                    <td className="py-4 px-4 text-center">
                      <span className="inline-block px-2 py-1 rounded-md bg-slate-900 border border-white/10 font-bold text-white">
                        {b.guests}p
                      </span>
                    </td>

                    {/* Est. Bill */}
                    <td className="py-4 px-4 font-extrabold text-emerald-400 text-sm">
                      ₹{b.estimatedAmount}
                    </td>

                    {/* Real-time Status Badge */}
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          b.status === 'Confirmed'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : b.status === 'Pending'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 animate-pulse'
                            : b.status === 'Completed'
                            ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        {b.status}
                      </span>
                    </td>

                    {/* Action Triggers: Confirm, Cancel, Delete, Complete */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Confirm Button */}
                        {b.status !== 'Confirmed' && (
                          <button
                            onClick={() => onUpdateStatus(b.id, 'Confirmed')}
                            className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 border border-emerald-500/30 transition-all cursor-pointer"
                            title="Confirm Booking (Updates Supabase live)"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {/* Complete Button */}
                        {b.status === 'Confirmed' && (
                          <button
                            onClick={() => onUpdateStatus(b.id, 'Completed')}
                            className="p-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500 text-cyan-400 hover:text-slate-950 border border-cyan-500/30 transition-all cursor-pointer"
                            title="Mark as Completed"
                          >
                            <CheckCheck className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {/* Cancel Button */}
                        {b.status !== 'Cancelled' && (
                          <button
                            onClick={() => onUpdateStatus(b.id, 'Cancelled')}
                            className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-slate-950 border border-amber-500/30 transition-all cursor-pointer"
                            title="Cancel Booking (Updates Supabase live)"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {/* Delete Button */}
                        <button
                          onClick={() => onDeleteBooking(b.id)}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white border border-rose-500/30 transition-all cursor-pointer"
                          title="Delete Record (Deletes from Supabase)"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredBookings.length === 0 && (
              <div className="text-center py-12 text-slate-400">
                <p>No bookings found matching current filters.</p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Supabase SQL Setup Modal */}
      {isSqlModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl glass-modal rounded-3xl p-6 shadow-2xl border border-white/20 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Supabase SQL Editor Script</h3>
                  <p className="text-xs text-slate-400">Copy & paste into Supabase SQL Editor to initialize table & RLS</p>
                </div>
              </div>
              <button
                onClick={() => setIsSqlModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto mt-4 p-3 bg-slate-950/90 rounded-xl border border-white/10 font-mono text-xs text-slate-300">
              <pre className="whitespace-pre-wrap">{SUPABASE_SETUP_SQL}</pre>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Project: <code className="text-amber-400">mpssqqcmpxgjkirevhig.supabase.co</code>
              </span>
              <button
                onClick={copySqlToClipboard}
                className="btn-amber-gold px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"
              >
                {copiedSql ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-slate-950" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-950" />
                    <span>Copy SQL Script</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manual Booking Modal for Staff */}
      {isManualModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg glass-modal rounded-3xl p-6 shadow-2xl border border-white/20">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-amber-400" />
                <span>New Walk-in / Phone Reservation</span>
              </h3>
              <button
                onClick={() => setIsManualModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateManual} className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Source</label>
                  <select
                    value={manualSource}
                    onChange={e => setManualSource(e.target.value as any)}
                    className="w-full bg-slate-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="Phone">Phone Call</option>
                    <option value="Walk-in">Direct Walk-in</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Guests</label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={manualGuests}
                    onChange={e => setManualGuests(parseInt(e.target.value) || 1)}
                    className="w-full bg-slate-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Guest Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sameer Kapoor"
                  value={manualName}
                  onChange={e => setManualName(e.target.value)}
                  className="w-full bg-slate-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98800 11223"
                  value={manualPhone}
                  onChange={e => setManualPhone(e.target.value)}
                  className="w-full bg-slate-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Select Offering</label>
                <select
                  value={manualServiceId}
                  onChange={e => setManualServiceId(e.target.value)}
                  className="w-full bg-slate-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                >
                  {SERVICES_DATA.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name} (₹{s.price})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Date</label>
                  <input
                    type="date"
                    value={manualDate}
                    onChange={e => setManualDate(e.target.value)}
                    className="w-full bg-slate-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Slot</label>
                  <select
                    value={manualTime}
                    onChange={e => setManualTime(e.target.value)}
                    className="w-full bg-slate-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    {TIME_SLOTS.map(t => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Staff Notes / Requests</label>
                <input
                  type="text"
                  placeholder="e.g. VIP table requested, birthday cake arranged"
                  value={manualNotes}
                  onChange={e => setManualNotes(e.target.value)}
                  className="w-full bg-slate-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsManualModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-amber-gold px-5 py-2 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Confirm & Add to Table
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
