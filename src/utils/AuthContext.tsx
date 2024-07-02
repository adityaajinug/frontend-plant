import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "universal-cookie";

interface AuthContextType {
  isAuthenticated: boolean;
  user: string | null;
  token: string | null;
  login: (user: string, token: string) => void;
  logout: () => void;
}

// Definisikan default value untuk AuthContext
const initialAuthContext: AuthContextType = {
  isAuthenticated: false,
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
};

const cookies = new Cookies(); // Membuat instance dari universal-cookie

const AuthContext = createContext<AuthContextType>(initialAuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = cookies.get("token");
    const storedUser = cookies.get("email");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (user: string, token: string) => {
    setIsAuthenticated(true);
    setUser(user);
    setToken(token);
    cookies.set("token", token, { path: "/" }); // Set cookie token
    cookies.set("email", user, { path: "/" }); // Set cookie email
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
    cookies.remove("token", { path: "/" }); // Hapus cookie token
    cookies.remove("email", { path: "/" }); // Hapus cookie email
  };

  const authContextValue: AuthContextType = {
    isAuthenticated,
    user,
    token,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
