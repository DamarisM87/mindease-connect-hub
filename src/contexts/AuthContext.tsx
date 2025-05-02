
import React, { createContext, useState, useEffect, useContext } from "react";
import { toast } from "@/components/ui/sonner";

// Define types
export type User = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  avatar?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<boolean>;
  isAdmin: () => boolean;
};

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  forgotPassword: async () => false,
  isAdmin: () => false,
});

// Sample user data for mock authentication
const SAMPLE_USERS = [
  {
    id: "1",
    name: "John Doe",
    email: "user@example.com",
    password: "password",
    role: "user" as const,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
  },
  {
    id: "2",
    name: "Admin User",
    email: "admin@example.com",
    password: "password",
    role: "admin" as const,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on load
  useEffect(() => {
    const storedUser = localStorage.getItem("mindease_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("mindease_user");
      }
    }
    setLoading(false);
  }, []);

  // Mock login function
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const foundUser = SAMPLE_USERS.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem("mindease_user", JSON.stringify(userWithoutPassword));
      toast.success(`Welcome back, ${foundUser.name}!`);
      return true;
    }
    
    toast.error("Invalid email or password");
    return false;
  };

  // Mock register function
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (SAMPLE_USERS.some(u => u.email === email)) {
      toast.error("Email already registered");
      return false;
    }
    
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      role: "user" as const,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`
    };
    
    setUser(newUser);
    localStorage.setItem("mindease_user", JSON.stringify(newUser));
    toast.success("Registration successful!");
    return true;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("mindease_user");
    toast.info("You've been logged out");
  };

  // Mock forgot password function
  const forgotPassword = async (email: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const userExists = SAMPLE_USERS.some(u => u.email === email);
    
    if (userExists) {
      toast.success("Password reset link sent to your email");
      return true;
    }
    
    toast.error("Email not found");
    return false;
  };

  // Check if current user is admin
  const isAdmin = () => {
    return user?.role === "admin";
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, forgotPassword, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
