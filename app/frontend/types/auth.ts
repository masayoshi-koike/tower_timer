import { User } from "./user";

export interface Auth {
  user: User | null;
  loggedIn: boolean;
  total_minutes: number;
}

export interface PageProps {
  auth: Auth;
  [key: string]: unknown;
}