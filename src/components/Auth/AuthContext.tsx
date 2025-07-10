import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';

interface TeacherProfile {
  fullName: string;
  email: string;
  school: string;
  location: string;
  subjects: string[];
  grades: string[];
  preferredLanguage: string;
  createdAt: string;
  lastLogin: string;
}

interface AuthContextType {
  user: User | null;
  profile: TeacherProfile | null;
  loading: boolean;
  updateProfile: (data: Partial<TeacherProfile>) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<TeacherProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        try {
          const profileDoc = await getDoc(doc(db, 'teachers', user.uid));
          if (profileDoc.exists()) {
            setProfile(profileDoc.data() as TeacherProfile);
            
            // Update last login
            await updateDoc(doc(db, 'teachers', user.uid), {
              lastLogin: new Date().toISOString()
            });
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      } else {
        setProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const updateProfile = async (data: Partial<TeacherProfile>) => {
    if (!user) return;
    
    try {
      await updateDoc(doc(db, 'teachers', user.uid), data);
      setProfile(prev => prev ? { ...prev, ...data } : null);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const value = {
    user,
    profile,
    loading,
    updateProfile,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};