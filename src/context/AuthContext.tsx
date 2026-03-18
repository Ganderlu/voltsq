"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { auth } from "../app/firebase/firebaseClient";

type AuthContextType = {
  currentUser: User | null;
  isAdmin: boolean;
  loading: boolean;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isAdmin: false,
  loading: true,
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const token = await user.getIdTokenResult();
        setIsAdmin(!!token.claims.admin);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ currentUser, isAdmin, loading, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
