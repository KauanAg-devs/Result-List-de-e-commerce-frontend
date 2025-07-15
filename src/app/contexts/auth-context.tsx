"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import api from "../(main)/lib/api";
import { setUserProfile } from "../store/user-profile-slice";
import { AuthContextType, AuthProviderProps } from "./types/auth-context";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await api.get(`/auth/me`);
        if (response.status === 200) {
          dispatch(setUserProfile(response.data));
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

    let isLoggingOut = false;

    const onLogout = () => {
      if (isLoggingOut) return;
      isLoggingOut = true;

      api.post("/auth/logout").catch(console.error);
      setIsAuthenticated(false);
      dispatch(setUserProfile(null));
    };

    window.addEventListener("logout", onLogout);

    return () => {
      window.removeEventListener("logout", onLogout);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
