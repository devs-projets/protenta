import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { User } from "@/types/user";
import { toast } from "sonner";

interface AuthContextType {
  access_token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  access_token: null,
  user: null,
  loading: false,
  error: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return Date.now() >= payload.exp * 1000;
  } catch {
    return true;
  }
};

const getStoredToken = (): string | null => {
  const token = localStorage.getItem("access_token");
  return token && !isTokenExpired(token) ? token : null;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [access_token, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const token = getStoredToken();

    if (token) {
      setAccessToken(token);
      loadUser(token);
    } else {
      setLoading(false);
    }
  }, []);

  const loadUser = async (token: string): Promise<User | null> => {
    try {
      setLoading(true);
      const userData = await getCurrentUser(token);
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      logout();
      return null;
    } finally {
      setLoading(false);
    }
  };

  const login = (newToken: string) => {
    if (isTokenExpired(newToken)) {
      setError("Token expiré");
      return;
    }

    localStorage.setItem("access_token", newToken);
    setAccessToken(newToken);
    toast.promise(loadUser(newToken), {
      loading: "Chargement des données de l'utilisateur ...",
      success: "Utilisateur chargé avec succès !",
      error: "Erreur lors de la récupération des données de l'utilisateur !",
    });
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setAccessToken(null);
    setUser(null);
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{ access_token, user, loading, error, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
