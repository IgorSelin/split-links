import { createContext } from "react";

interface IAuthContext {
  token: null | string;
  userId: null | string;
  login(token: string, userId: string): void;
  logout(): void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<IAuthContext>({
  token: null,
  userId: null,
  login() {},
  logout() {},
  isAuthenticated: false,
});
