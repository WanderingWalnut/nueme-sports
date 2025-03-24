import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../config/firebase.config";

// User data type interface
interface UserType {
  email: string | null;
  uid: string | null;
}

// interface AuthContext {
//     user: UserType | null;
//     signUp: (email: string, password: string) => Promise<void>;
//     logIn: (email: string, password: string) => Promise<void>;
//     logOut: () => Promise<void>;
// }

// Create auth context
const AuthContext = createContext({});

// Make auth context available across the app by exporting it
export const useAuth = () => useContext<any>(AuthContext);

// Create the auth context provider
export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Define the constants for the user and loading state
  const [user, setUser] = useState<UserType>({ email: null, uid: null });
  const [loading, setLoading] = useState<boolean>(true);

  // Update the state depending on auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          email: user.email,
          uid: user.uid,
        });
      } else {
        setUser({ email: null, uid: null });
      }
    });

    setLoading(false);

    return () => unsubscribe();
  }, []);

  // Sign up the user
  const signUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User Registered Successfully");
    } catch (error) {
      console.error("User wasn't registered", error);
    }
  };

  // Login the user
  const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout the user
  const logOut = async () => {
    setUser({ email: null, uid: null });
    return await signOut(auth);
  };

  // Wrap the children with the context provider
  return (
    <AuthContext.Provider value={{ user, signUp, logIn, logOut }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
