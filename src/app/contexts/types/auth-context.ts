export type AuthContextType = {
  isAuthenticated: boolean | null;
  loading: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>;
};

export type AuthProviderProps = {
  children: React.ReactNode;
};
