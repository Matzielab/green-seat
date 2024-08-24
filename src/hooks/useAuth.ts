import { useState, useEffect } from "react";
import {
  User,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { firebaseAuth, firebaseDB } from "libs/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { hasAllowedAuth } from "libs/hasAllowedAuth";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(firebaseAuth, provider);
      const user = result.user;

      if (!hasAllowedAuth(user.email || "")) {
        signOutUser();
        navigate("/unauthorized");
        return;
      }

      // Update or create user document in Firestore
      await setDoc(
        doc(firebaseDB, "users", user.uid),
        {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          lastLogin: serverTimestamp(),
        },
        { merge: true }
      );

      navigate("/app");
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(firebaseAuth);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  return { user, signIn, signOut: signOutUser, isLoading };
}
