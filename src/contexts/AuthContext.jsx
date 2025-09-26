import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth in localStorage on mount
    const savedUser = localStorage.getItem('typeaware_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password, isAdmin = false) => {
    setIsLoading(true);
    try {
      // Mock login - in real app this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (isAdmin) {
        // Admin credentials
        if (email === 'admin@typeaware.com' && password === 'admin123') {
          const adminUser = {
            id: 'admin-1',
            email: 'admin@typeaware.com',
            name: 'Admin User',
            role: 'admin'
          };
          setUser(adminUser);
          localStorage.setItem('typeaware_user', JSON.stringify(adminUser));
          return { success: true };
        }
      } else {
        // Regular user credentials
        if (email === 'user@example.com' && password === 'user123') {
          const regularUser = {
            id: 'user-1',
            email: 'user@example.com',
            name: 'John Doe',
            role: 'user'
          };
          setUser(regularUser);
          localStorage.setItem('typeaware_user', JSON.stringify(regularUser));
          return { success: true };
        }
      }
      
      return { success: false, error: 'Invalid credentials' };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    setIsLoading(true);
    try {
      // Mock signup - in real app this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newUser = {
        id: `user-${Date.now()}`,
        email,
        name,
        role: 'user'
      };
      
      setUser(newUser);
      localStorage.setItem('typeaware_user', JSON.stringify(newUser));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Signup failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('typeaware_user');
  };

  const value = {
    user,
    isLoading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};