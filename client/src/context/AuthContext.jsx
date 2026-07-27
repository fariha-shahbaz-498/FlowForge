import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  loginUser,
  registerUser,
  getCurrentUser,
  updateProfile,
} from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // LOAD USER WHEN APP STARTS
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("flowforge_token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await getCurrentUser(token);

        console.log("CURRENT USER:", res);

        if (res.success) {
          setUser(res.user);
          localStorage.setItem(
            "flowforge_user",
            JSON.stringify(res.user)
          );
        }
      } catch (error) {
        console.log("AUTH LOAD ERROR:", error);

        localStorage.removeItem("flowforge_token");
        localStorage.removeItem("flowforge_user");

        setUser(null);
      }

      setLoading(false);
    };

    loadUser();
  }, []);

  // REGISTER
  const register = async (
    firstName,
    lastName,
    username,
    email,
    password
  ) => {
    try {
      const res = await registerUser({
        firstName,
        lastName,
        username,
        email,
        password,
      });

      console.log("REGISTER RESPONSE:", res);

      if (res.success) {
        localStorage.setItem("flowforge_token", res.token);
        localStorage.setItem(
          "flowforge_user",
          JSON.stringify(res.user)
        );

        setUser(res.user);
      }

      return res;
    } catch (error) {
      console.log("REGISTER ERROR:", error);

      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Registration failed",
      };
    }
  };

  // LOGIN
  const login = async (email, password) => {
    try {
      const res = await loginUser({
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", res);

      if (res.success) {
        localStorage.setItem("flowforge_token", res.token);
        localStorage.setItem(
          "flowforge_user",
          JSON.stringify(res.user)
        );

        setUser(res.user);
      }

      return res;
    } catch (error) {
      console.log("LOGIN ERROR:", error);

      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Login failed",
      };
    }
  };

  // UPDATE PROFILE
  const updateUser = async (data) => {
    try {
      const token = localStorage.getItem("flowforge_token");

      const res = await updateProfile(token, data);

      if (res.success) {
        setUser(res.user);

        localStorage.setItem(
          "flowforge_user",
          JSON.stringify(res.user)
        );
      }

      return res;
    } catch (error) {
      console.log("UPDATE USER ERROR:", error);

      return {
        success: false,
        message: "Profile update failed",
      };
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("flowforge_token");
    localStorage.removeItem("flowforge_user");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token: localStorage.getItem("flowforge_token"),
        loading,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}