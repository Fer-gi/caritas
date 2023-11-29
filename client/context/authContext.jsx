import { createContext, useContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, 
  sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut,
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

      const userSnapshot = await get(child(ref(db), `users/${userCredential.uid}`));

      if (!userSnapshot.exists()) {
        await set(child(ref(db), `users/${userCredential.uid}`), {
          email: userCredential.email,
          displayName: userCredential.displayName,
          phoneNumber: userCredential.phoneNumber || '',
          type: 'student',
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
      return userCredential; 
    } catch (error) {
      console.error(error);
      throw error; 
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
