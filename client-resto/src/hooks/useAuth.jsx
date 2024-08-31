import { useContext, createContext, useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../config/axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const navigate = useNavigate();
  const loginAction = async (data) => {
    try {
      const res = await axios.post("/login", data, {
        headers: {
          "Content-Type": "application/json",
        }
      });

      setToken(res.data.accessToken);
      localStorage.setItem("token", res.data.accessToken);
      navigate("/dashboard");

    } catch (err) {
      throw err;
    }
  };

  const googleLoginAction = async (url) => {
    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
  
      const data = response.data;
  
      if (response.status === 200) {
        if (data.token) {
          setToken(data.token);
          localStorage.setItem("token", data.token);
          navigate("/dashboard");
        }
      }
    } catch (err) {
      throw err;
    }
  };

  const logOut = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  useLayoutEffect(() => {
    axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      })
  })

  useLayoutEffect(() => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          setToken(null);
        }
        return Promise.reject(error);
      }
    );

  })

  return (
    <AuthContext.Provider value={{ token, loginAction, googleLoginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};