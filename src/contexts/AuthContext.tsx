import React, { createContext, useContext, useEffect, useState } from 'react';

interface MockUser {
  id: string;
  email: string;
  user_metadata: {
    role: 'manager' | 'employee';
  };
}

interface AuthContextType {
  user: MockUser | null;
  session: any;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, role: 'manager' | 'employee') => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo credentials
const DEMO_CREDENTIALS = {
  manager: { email: 'manager@demo.com', password: 'manager123' },
  employee: { email: 'employee@demo.com', password: 'employee123' }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session in localStorage
    const savedUser = localStorage.getItem('mockUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setSession({ user: userData });
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    // Check demo credentials
    const isManager = email === DEMO_CREDENTIALS.manager.email && password === DEMO_CREDENTIALS.manager.password;
    const isEmployee = email === DEMO_CREDENTIALS.employee.email && password === DEMO_CREDENTIALS.employee.password;
    
    if (isManager || isEmployee) {
      const mockUser: MockUser = {
        id: isManager ? 'manager-123' : 'employee-456',
        email,
        user_metadata: {
          role: isManager ? 'manager' : 'employee'
        }
      };
      
      setUser(mockUser);
      setSession({ user: mockUser });
      localStorage.setItem('mockUser', JSON.stringify(mockUser));
      return { error: null };
    }
    
    return { error: { message: 'Invalid credentials. Use manager@demo.com/manager123 or employee@demo.com/employee123' } };
  };

  const signUp = async (email: string, password: string, role: 'manager' | 'employee') => {
    // For demo, just create a mock user
    const mockUser: MockUser = {
      id: `${role}-${Date.now()}`,
      email,
      user_metadata: { role }
    };
    
    setUser(mockUser);
    setSession({ user: mockUser });
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    return { error: null };
  };

  const signOut = async () => {
    setUser(null);
    setSession(null);
    localStorage.removeItem('mockUser');
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}