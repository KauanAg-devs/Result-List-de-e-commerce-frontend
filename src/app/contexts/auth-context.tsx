"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AuthProviderProps, AuthContextType } from "@/app/contexts/types/auth-context";
import { setUserProfile } from "../store/user-profile-slice";
import { useDispatch } from "react-redux";
import api from "../lib/api";
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useDispatch()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await api.get(`/auth/me`);

        const userProfile = response.data 
        if (response.status === 200) {
          dispatch(setUserProfile(userProfile));
          console.log(userProfile);
          
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
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
