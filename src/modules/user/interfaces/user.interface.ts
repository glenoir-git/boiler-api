export interface User {
  id: string;
  name: string;
  surname: string;
  username: string;
  email: string;
  avatar: string;
  keywords: string[];
  subscription: {
    isActive: boolean;
    expiryDate: Date;
  };
  points: number;
}