export type AccountType = 'general' | 'professional' | 'contractor' | 'dealer' | 'trader' | 'farmer';

export interface User {
  id: string;
  email: string;
  name: string;
  accountType: AccountType;
  avatar?: string;
  bio?: string;
  location?: string;
  verified: boolean;
  rating: number;
  createdAt: string;
}

export interface Post {
  id: string;
  userId: string;
  user: User;
  content: string;
  images?: string[];
  videos?: string[];
  type: 'general' | 'marketplace' | 'workplace';
  category?: string;
  price?: number;
  location?: string;
  createdAt: string;
  likes: number;
  comments: number;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  type: 'text' | 'image' | 'video';
  createdAt: string;
  read: boolean;
}

export interface MarketplaceItem {
  id: string;
  userId: string;
  user: User;
  title: string;
  description: string;
  price: number;
  category: 'equipment' | 'products' | 'services';
  images: string[];
  location: string;
  condition?: 'new' | 'used' | 'refurbished';
  availability: boolean;
  createdAt: string;
}

export interface WorkplaceJob {
  id: string;
  userId: string;
  user: User;
  title: string;
  description: string;
  category: string;
  location: string;
  budget?: number;
  duration?: string;
  requirements: string[];
  applications: number;
  createdAt: string;
  deadline?: string;
}