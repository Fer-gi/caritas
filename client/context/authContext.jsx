import { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { get, child, ref, set } from 'firebase/database';
import { auth, db } from "../../server/firebase/firebase";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const loginWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userCredential = result.user;

      // Check if the user already exists in the database
      const userSnapshot = await get(child(ref(db), `users/${userCredential.uid}`));

      if (!userSnapshot.exists()) {
        // If the user doesn't exist, add them to the database with type "student"
        await set(child(ref(db), `users/${userCredential.uid}`), {
          email: userCredential.email,
          displayName: userCredential.displayName,
          phoneNumber: userCredential.phoneNumber || '',
          type: 'student', // Default type for Google sign-in
        });
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential; // Return the user credentials
    } catch (error) {
      console.error(error);
      throw error; // Re-throw the error for handling in the Login component
    }
  };

  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userId = currentUser.uid;
        const userSnapshot = await get(child(ref(db), `users/${userId}`));
        if (userSnapshot.exists()) {
          currentUser.type = userSnapshot.val().type;
        }
      }
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ signup, login, user, logout, loading, loginWithGoogle, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}
