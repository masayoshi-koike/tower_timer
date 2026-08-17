import { User } from "./user";

export interface Auth {
  user: User | null;
  loggedIn: boolean;
  total_minutes: number;
}

export interface Flash {
  success?: string;
  error?: string;
}

export interface PageProps {
  auth: Auth;
  [key: string]: unknown;
}

export interface FlashProps {
  flash: Flash;
  [key: string]: unknown;
}