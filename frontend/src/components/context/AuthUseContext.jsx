import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const CheckLoaggedIn = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/check-auth`,
          {}
        );
      } catch (error) {}
    };
    CheckLoaggedIn();
  });
};
