import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const envUrl = process.env.REACT_APP_API_URL;
  const baseUrl = envUrl ? envUrl + "/api" : "http://localhost:3001/api";

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const decodeToken = (token) => {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      return null;
    }
  };

  const register = async (values) => {
    try {
      const response = await axios.post(baseUrl + "/auth/register", {
        email: values.email,
        nickname: values.nickname,
        password: values.password,
      });

      setUser(response.data.user);
      setToken(response.data.token);

      localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.error("Erro ao registrar:", error.response.data);
    }
  };

  const login = async (values) => {
    try {
      console.log(baseUrl);
      const response = await axios.post(baseUrl + "/auth/login", {
        email: values.email,
        password: values.password,
      });

      setUser(response.data.user);
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.error("Erro ao fazer login:", error.response.data);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.setItem("observerNickname", user?.nickname);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    let tk = localStorage.getItem("token");

    if (tk) {
      setUser(decodeToken(tk)?.user);
      setToken(tk);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, token, register, login, logout, decodeToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
