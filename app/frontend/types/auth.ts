import { User } from "./user";

export interface Auth {
  user: User | null;
  loggedIn: boolean;
}

export interface PageProps {
  auth: Auth;
  [key: string]: unknown;
}