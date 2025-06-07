
import { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  const login = async (email, password) => {
    await axiosInstance.post("/auth/login", {
      email,
      password,
    });

    setAuthenticated(true);
  };

  const logout = async() =>{
    await axiosInstance.post("/auth/logout")
    setAuthenticated(false)
  }

  const checkAuth = async () => {
    try {
      await axiosInstance.get("/auth/check");
      setAuthenticated(true);
    } catch  {
      setAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, login,logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
