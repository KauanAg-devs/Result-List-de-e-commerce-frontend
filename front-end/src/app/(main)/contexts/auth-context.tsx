"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AuthProviderProps, AuthContextType } from "@main/contexts/types/auth-context";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = document.cookie.match(/access_token=([^;]+)/)?.[1] //validate token from backend;

    if (token) setIsAuthenticated(true);
    else setIsAuthenticated(false);

    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
