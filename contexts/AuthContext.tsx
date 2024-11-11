import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role_id: number;
}

interface AuthContextData {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

const API_URL = 'http://10.2.5.206:3001/api/auth/login';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Load stored auth data on initialization
  useEffect(() => {
    const loadStoredAuthData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        const storedUser = await AsyncStorage.getItem('user');

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Failed to load stored auth data:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false); // Authentication check complete
      }
    };

    loadStoredAuthData();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await axios.post(API_URL, {
        email,
        password,
        role_id: 2,
        appType: 'mobile',
      });

      const { token, user } = response.data;

      if (user.role_id !== 2) {
        throw new Error('Access denied for this application type');
      }

      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      setToken(token);
      setUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      throw new Error(
        axios.isAxiosError(error) && error.response
          ? error.response.data?.message || 'Login failed'
          : 'Login failed'
      );
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
