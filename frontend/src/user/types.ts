export enum UserRole {
  USER = 'user',
  ADMIN = 'admin'
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
}

export enum DogStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

export interface Dog {
  _id: string;
  name: string;
  breed: string;
  age: number; // in years
  gender: 'Male' | 'Female';
  weight: number; // in lbs
  location: string;
  distance?: number; // calculated field
  images: string[];
  description: string;
  ownerId: string;
  ownerName?: string;
  status: DogStatus;
  isNew?: boolean;
  
  // Extended Health & Profile Fields
  spayedNeutered?: boolean;
  microchipped?: boolean;
  breedingRights?: boolean;
  lastRabiesShot?: string; // Date string
  nextVaccinationDue?: string; // Date string
  knownAllergies?: string;
  geneticConditions?: string[];
  
  healthStatus?: {
    vaccinated: boolean;
    geneticScreening: boolean;
  };
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface MatchRequest {
  id: string;
  type: 'incoming' | 'sent';
  dog: {
    name: string;
    breed: string;
    age: number;
    image: string;
  };
  owner?: {
    name: string;
    image: string;
  };
  timestamp: string;
  status?: 'pending' | 'accepted' | 'rejected';
  matchPercent?: number;
  isNew?: boolean;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'me' | 'them';
  timestamp: string;
  isRead?: boolean;
}

export interface ChatConversation {
  id: string;
  dogName: string;
  ownerName: string;
  dogImage: string;
  ownerImage?: string; // Optional owner avatar
  lastMessage: string;
  lastMessageTime: string;
  unreadCount?: number;
  isOnline?: boolean;
  dogBreed?: string; // For the header
}

export interface Notification {
  id: string;
  type: 'match_request' | 'system' | 'match_accepted' | 'payment' | 'match_rejected';
  title: string; // Used for simple text or constructing the message
  timestamp: string;
  isRead: boolean;
  category: 'Matches' | 'System' | 'Payments';
  data?: {
    dogName?: string;
    dogBreed?: string;
    dogImage?: string;
    planName?: string;
  };
}