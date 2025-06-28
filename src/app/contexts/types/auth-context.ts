export type AuthContextType = {
  isAuthenticated: boolean;
  loading: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

export type AuthProviderProps = {
  children: React.ReactNode;
};
