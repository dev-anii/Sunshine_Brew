export type ServiceCategory = 
  | 'all'
  | 'breakfast'
  | 'burgers'
  | 'coffee-boba'
  | 'desserts'
  | 'experiences';

export interface ServiceItem {
  id: string;
  name: string;
  category: ServiceCategory;
  categoryLabel: string;
  price: number;
  duration: string;
  description: string;
  image: string;
  isVeg: boolean;
  isBestseller?: boolean;
  isChefSpecial?: boolean;
  highlights: string[];
  calories?: string;
  servingSize?: string;
}

export type BookingStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';

export interface Booking {
  id: string;
  referenceNumber: string;
  customerName: string;
  phone: string;
  email?: string;
  serviceId: string;
  serviceName: string;
  guests: number;
  date: string;
  timeSlot: string;
  status: BookingStatus;
  specialRequests?: string;
  estimatedAmount: number;
  createdAt: string;
  source: 'Online' | 'Walk-in' | 'Phone';
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  avatar: string;
  comment: string;
  source: string;
  recommendedItem?: string;
}

export interface BusinessDetails {
  name: string;
  tagline: string;
  category: string;
  rating: number;
  reviewCount: number;
  costForTwo: string;
  address: string;
  landmark: string;
  city: string;
  phone: string;
  phoneRaw: string;
  whatsapp: string;
  whatsappNumber: string;
  googleMapsUrl: string;
  openingHoursText: string;
  openTimeHour: number; // 12
  openTimeMinute: number; // 30
  closeTimeHour: number; // 22
  closeTimeMinute: number; // 30
}
