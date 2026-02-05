
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { UserRole, BusinessUnit } from '../types';

export interface User {
  id: string;
  name: string;
  cpf: string;
  role: UserRole;
  unit?: BusinessUnit;
  photo?: string;
  isFirstAccess: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (cpf: string, pass: string) => Promise<boolean>;
  logout: () => void;
  switchUser: (cpf: string) => void;
  isLoading: boolean;
}

export const PREDEFINED_USERS: User[] = [
  { id: '1', name: 'João Diretor', cpf: '11111111111', role: UserRole.ADMIN, unit: BusinessUnit.CONSULTORIA, isFirstAccess: false },
  { id: '2', name: 'Lidiane Silva', cpf: '22222222222', role: UserRole.HR, unit: BusinessUnit.CONSULTORIA, isFirstAccess: true },
  { id: '3', name: 'Carlos Gestor', cpf: '33333333333', role: UserRole.MANAGER, unit: BusinessUnit.JURIDICO, isFirstAccess: false },
  { id: '4', name: 'Diego Garcia', cpf: '44444444444', role: UserRole.ADMIN, unit: BusinessUnit.CONSULTORIA, isFirstAccess: false },
  { id: '5', name: 'Ricardo Mendes', cpf: '55555555555', role: UserRole.EMPLOYEE, unit: BusinessUnit.JURIDICO, isFirstAccess: false },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (cpf: string, pass: string): Promise<boolean> => {
    setIsLoading(true);
    const cleanCpf = cpf.replace(/\D/g, '');
    const foundUser = PREDEFINED_USERS.find(u => u.cpf === cleanCpf);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        if (foundUser && pass === '123456') {
          setUser(foundUser);
          setIsLoading(false);
          resolve(true);
        } else {
          setIsLoading(false);
          resolve(false);
        }
      }, 800);
    });
  };

  const logout = () => setUser(null);

  const switchUser = (cpf: string) => {
    setIsLoading(true);
    const foundUser = PREDEFINED_USERS.find(u => u.cpf === cpf);
    setTimeout(() => {
      if (foundUser) setUser(foundUser);
      setIsLoading(false);
    }, 500);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, switchUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
