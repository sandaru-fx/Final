export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  status: 'active' | 'suspended' | 'pending';
  joinedDate: string;
  avatar: string;
  dogName?: string;
  dogBreed?: string;
}

export interface Dog {
  id: string;
  name: string;
  breed: string;
  age: number;
  gender: 'Male' | 'Female';
  weight: number;
  status: 'pending' | 'approved' | 'rejected';
  image: string;
  ownerId: string;
  ownerName: string;
  ownerAvatar: string;
  ownerHandle: string;
}

export interface Stats {
  totalUsers: number;
  totalDogs: number;
  activeMatches: number;
  revenue: number;
  userGrowth: number; // percentage
  dogGrowth: number;
  matchGrowth: number;
}
