import { createContext, useContext, useEffect, useState } from "react";
import { setAuthToken } from "../api";

const AuthContext = createContext(null);
const STORAGE_KEY = "mern-news-auth";

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : { user: null, token: null };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
    setAuthToken(auth.token);
  }, [auth]);

  const login = (payload) => {
    setAuth({
      user: {
        _id: payload._id,
        name: payload.name,
        email: payload.email
      },
      token: payload.token
    });
  };

  const logout = () => {
    setAuth({ user: null, token: null });
  };

  return (
    <AuthContext.Provider
      value={{
        user: auth.user,
        token: auth.token,
        login,
        logout,
        isAuthenticated: Boolean(auth.token)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
