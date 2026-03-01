import { createContext, useContext, ReactNode } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { User } from '@/types';

interface AuthContextType {
  currentUser: FirebaseUser | null;
  userProfile: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signInWithGoogle: () => Promise<any>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (data: Partial<User>) => Promise<void>;
}

const MockAuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(MockAuthContext);
  if (!context) {
    // Return mock data if context not available
    return {
      currentUser: null,
      userProfile: {
        uid: 'mock-user',
        email: 'user@example.com',
        displayName: 'Test User',
        photoURL: null,
        phoneNumber: null,
        language: 'en',
        educationLevel: 'Bachelor\'s Degree',
        careerGoals: [],
        currentSkills: [],
        onboardingComplete: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        preferences: {
          notifications: true,
          dataUsageMode: 'normal',
          theme: 'light',
        },
      },
      loading: false,
      signIn: async () => { console.log('Mock signIn'); },
      signUp: async () => { console.log('Mock signUp'); },
      signInWithGoogle: async () => { console.log('Mock signInWithGoogle'); },
      signOut: async () => { console.log('Mock signOut'); },
      resetPassword: async () => { console.log('Mock resetPassword'); },
      updateUserProfile: async () => { console.log('Mock updateUserProfile'); },
    };
  }
  return context;
};

interface MockAuthProviderProps {
  children: ReactNode;
}

export const MockAuthProvider = ({ children }: MockAuthProviderProps) => {
  const value: AuthContextType = {
    currentUser: null,
    userProfile: {
      uid: 'mock-user',
      email: 'user@example.com',
      displayName: 'Test User',
      photoURL: null,
      phoneNumber: null,
      language: 'en',
      educationLevel: 'Bachelor\'s Degree',
      careerGoals: [],
      currentSkills: [],
      onboardingComplete: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      preferences: {
        notifications: true,
        dataUsageMode: 'normal',
        theme: 'light',
      },
    },
    loading: false,
    signIn: async () => { console.log('Mock signIn'); },
    signUp: async () => { console.log('Mock signUp'); },
    signInWithGoogle: async () => { console.log('Mock signInWithGoogle'); return {}; },
    signOut: async () => { console.log('Mock signOut'); },
    resetPassword: async () => { console.log('Mock resetPassword'); },
    updateUserProfile: async () => { console.log('Mock updateUserProfile'); },
  };

  return <MockAuthContext.Provider value={value}>{children}</MockAuthContext.Provider>;
};
