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
      } catch (error) {}
    };
    CheckLoaggedIn();
  });
};
