import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  User as FirebaseUser,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/config/firebase';
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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set loading to false immediately if Firebase is not configured
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000); // Reduced to 1 second

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      clearTimeout(timeout); // Clear timeout if auth state changes
      setCurrentUser(user);
      
      if (user) {
        // Fetch user profile from Firestore - with error handling
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserProfile(userDoc.data() as User);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return () => {
      unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update display name
    await updateProfile(userCredential.user, { displayName });
    
    // Create user profile in Firestore
    const userProfile: User = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName,
      photoURL: null,
      phoneNumber: null,
      language: 'en',
      educationLevel: null,
      careerGoals: [],
      currentSkills: [],
      onboardingComplete: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      preferences: {
        notifications: true,
        dataUsageMode: 'normal',
        theme: 'light',
      },
    };
    
    await setDoc(doc(db, 'users', userCredential.user.uid), userProfile);
    setUserProfile(userProfile);
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    
    // Check if user profile exists
    const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
    
    if (!userDoc.exists()) {
      // Create user profile for new Google sign-in
      const userProfile: User = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL,
        phoneNumber: userCredential.user.phoneNumber,
        language: 'en',
        educationLevel: null,
        careerGoals: [],
        currentSkills: [],
        onboardingComplete: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        preferences: {
          notifications: true,
          dataUsageMode: 'normal',
          theme: 'light',
        },
      };
      
      await setDoc(doc(db, 'users', userCredential.user.uid), userProfile);
      setUserProfile(userProfile);
    }
    
    return userCredential;
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUserProfile(null);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const updateUserProfile = async (data: Partial<User>) => {
    if (!currentUser) throw new Error('No user logged in');
    
    const updatedProfile = {
      ...data,
      updatedAt: new Date(),
    };
    
    await setDoc(doc(db, 'users', currentUser.uid), updatedProfile, { merge: true });
    
    if (userProfile) {
      setUserProfile({ ...userProfile, ...updatedProfile } as User);
    }
  };

  const value: AuthContextType = {
    currentUser,
    userProfile,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    resetPassword,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
