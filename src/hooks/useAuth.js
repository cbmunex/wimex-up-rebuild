import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "@aws-amplify/auth";
import { Hub } from "aws-amplify/utils";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadUser() {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // 🔹 carrega o usuário ao iniciar
    loadUser();

    // 🔹 escuta eventos de autenticação
    const unsubscribe = Hub.listen("auth", ({ payload }) => {
      switch (payload.event) {
        case "signedIn":
          loadUser();
          break;
        case "signedOut":
          setUser(null);
          break;
        case "tokenRefresh":
          loadUser();
          break;
        default:
          break;
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
