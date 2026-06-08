import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { authApi } from "./api/auth";
import { clearToken, getToken } from "./api/client";
import type { User } from "@/types";

interface AuthState {
  user: User | null;
  isLoading: boolean;
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ user: null, isLoading: true });

  useEffect(() => {
    if (!getToken()) {
      setState({ user: null, isLoading: false });
      return;
    }
    authApi
      .me()
      .then((user) => setState({ user, isLoading: false }))
      .catch(() => {
        clearToken();
        setState({ user: null, isLoading: false });
      });
  }, []);

  async function login(email: string, password: string) {
    const res = await authApi.login({ email, password });
    setState({ user: res.user, isLoading: false });
  }

  function logout() {
    clearToken();
    setState({ user: null, isLoading: false });
    window.location.href = "/login";
  }

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
