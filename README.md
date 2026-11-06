# ☕ Sunshine Cafe & Artisan Brews

An executive-grade, client-facing web application and reservation management system built for **Sunshine Cafe (Koramangala, Bangalore)**. Designed with a deep slate glassmorphic aesthetic, modern micro-interactions, full Supabase database persistence, and a protected staff portal.

---

## 🌟 Key Features

### 1. Customer Experience & Front-of-House UI
- **Dynamic Status Header**: Displays real-time store operating status (`Open Now` / `Closed`), operational hours, physical address badge, direct one-touch calling, and WhatsApp messaging.
- **High-Conversion Hero**: Live Google review metrics (4.4★ / 380+ reviews), clear value hooks, and direct reservation triggers.
- **Interactive Menu & Services**: Categorized filtering tabs (Breakfasts, Smash Burgers, Artisanal Brews, Tasting Menus) with detailed descriptions, pricing in INR (₹), and dietary tags.
- **Multi-Step Reservation Modal**: Real-time booking pipeline capturing guest count, date, time slots, contact credentials, and dietary preferences with instant toast validation.

### 2. Discrete Staff & Admin Management Portal
- **Credential-Gated Security**: Accessible via a discrete portal trigger in the navigation/footer secured with passcode authentication (`admin` / `1234`) and quick-demo auto-fill for reviews.
- **KPI Metrics Dashboard**: High-level operational cards displaying Total Bookings, Pending Approvals, Confirmed Covers, and Estimated Revenue.
- **Live Reservation Pipeline**: Tabular management interface offering instant `Confirm`, `Cancel`, and `Delete` controls that mutate cloud records in real time.

### 3. Production Polish & Security
- **Deep Slate Visual System**: Handcrafted `#090D16` palette layered with ambient backdrops (`backdrop-blur-md`), subtle translucent borders (`border-white/10`), and warm amber (`#F59E0B`) conversion accents.
- **Zero-Clutter Architecture**: Free of internal prompt boilerplate, debug badges, or leaked project IDs. Completely client-ready.

---

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Custom Glassmorphism & Dark Slate Theme)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL + PostgREST Engine)
- **State & Notifications**: Reactive Context API & Glass Toast Engine

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed locally:
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

# Install Dependencies
npm install

# Setup Environment Variables
Create a .env file in the root directory:

Code snippet
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_public_key

# Database Setup (Supabase)
Run the following SQL snippet inside your Supabase SQL Editor to initialize the table, configure Row Level Security (RLS), and populate mock data:

-- 1. Create table
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    customer_name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    service_name TEXT NOT NULL,
    booking_date DATE NOT NULL,
    time_slot TEXT NOT NULL,
    guest_count INT DEFAULT 2,
    status TEXT DEFAULT 'Pending',
    notes TEXT,
    reference_number TEXT,
    estimated_amount NUMERIC DEFAULT 0
);

-- 2. Enable Row Level Security
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- 3. Setup Public Demo Policies
CREATE POLICY "Allow public read-access" ON public.bookings FOR SELECT TO public USING (true);
CREATE POLICY "Allow public insert-access" ON public.bookings FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Allow public update-access" ON public.bookings FOR UPDATE TO public USING (true);
CREATE POLICY "Allow public delete-access" ON public.bookings FOR DELETE TO public USING (true);

5. Launch Local Server
Bash
npm run dev

Open your browser and navigate to http://localhost:5173.
🔐 Staff Portal Access CredentialsFor evaluation and demonstration purposes, 
use the credentials below at the /admin modal gate:

Parameter       Value
Username        admin 
Password        1234 
Quick Action    Click "Demo Auto-Fill" on the modal window

📂 Project Architecture

sunshine-cafe/
├── public/              # Static assets & brand media
├── src/
│   ├── components/      # Glassmorphic UI components
│   │   ├── Admin/       # KPI cards, data tables, status chips
│   │   ├── Booking/     # Multi-step reservation wizard
│   │   ├── Layout/      # Dynamic topbar, header, footer
│   │   └── Menu/        # Filterable offerings grid
│   ├── lib/             # Supabase client instantiation
│   ├── types/           # Database schema & domain interfaces
│   ├── App.jsx          # Core route aggregator
│   └── main.jsx         # DOM mounting & configuration
├── .env.example         # Template for environment secrets
├── tailwind.config.js   # Tailored palette & backdrop settings
└── vite.config.js       # Vite bundle configuration

📄 License
Distributed under the MIT License. Built for production delivery.
