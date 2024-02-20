import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext({});

import { api } from "../services/api";

function AuthProvider({ children }) {
  const [data, setData] = useState({});

  async function getProfile() {
    try {
      const response = await api.get("/users/profile", {
        withCredentials: true,
      });

      const { user } = response.data;

      return { user };
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message)

        if (error.response.status === 401) {
          signOut();
        }
      }
    }
  }

  async function signIn({ email, password }) {
    try {
      await api.post(
        "sessions",
        { email, password },
        {
          withCredentials: true,
        }
      );

      const response = await getProfile();

      if (response?.user) {
        const { user } = response;

        localStorage.setItem("@estock:user", JSON.stringify(user));
        setData({ user });
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível entrar.");
      }
    }
  }

  async function signOut() {
    await api.post('/sessions/logout', {}, { withCredentials: true });

    localStorage.removeItem("@estock:user");

    setData({});
  }

  useEffect(() => {
    const user = localStorage.getItem("@estock:user");

    if (user) {
      getProfile().then((response) => {
        if (response?.user) {
          const { user } = response;

          localStorage.setItem("@estock:user", JSON.stringify(user));
          setData({ user });
        }
      });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        user: data.user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
