import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // API URL
  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/auth`;

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        return { success: true };
      } else {
        return { success: false, message: data.message || "Login failed" };
      }
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: error.message || "Server error. Please try again later.",
      };
    }
  };

  const signup = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        return { success: true };
      } else {
        return {
          success: false,
          message: data.message || "Registration failed",
        };
      }
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: error.message || "Server error. Please try again later.",
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const updateProfile = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        // Preserver the token from the existing user object
        const updatedUser = { ...data, token: user.token };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        return { success: true };
      } else {
        return { success: false, message: data.message || "Update failed" };
      }
    } catch (error) {
      console.error("Update profile error:", error);
      return { success: false, message: error.message || "Server error" };
    }
  };

  const deleteAccount = async () => {
    try {
      const response = await fetch(`${API_URL}/users/${user._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        logout();
        return { success: true };
      } else {
        const data = await response.json();
        return { success: false, message: data.message || "Delete failed" };
      }
    } catch (error) {
      console.error("Delete account error:", error);
      return { success: false, message: error.message || "Server error" };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        loading,
        updateProfile,
        deleteAccount,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
