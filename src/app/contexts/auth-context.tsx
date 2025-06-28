"use client";
import { createContext, useContext, useEffect, useState, useRef } from "react";
import { AuthProviderProps, AuthContextType } from "@/app/contexts/types/auth-context";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); 
  const [loading, setLoading] = useState(true);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;

    const token = document.cookie.match(/access_token=([^;]+)/)?.[1];
    setIsAuthenticated(!!token); 
    setLoading(false);
    hasInitialized.current = true;
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