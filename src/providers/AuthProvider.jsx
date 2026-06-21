import {
  createContext,
  useEffect,
  useState,
} from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

import auth from "../firebase/firebase.config";
import api from "../services/api";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const registerUser = (email, password) => {
    setLoading(true);

    return createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
  };

  const loginUser = (email, password) => {
    setLoading(true);

    return signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const logoutUser = async () => {
    await api.post("/logout");

    setDbUser(null);

    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser) => {
        setUser(currentUser);

        if (currentUser?.email) {
          try {
            const res = await api.get(
              `/users/${currentUser.email}`
            );

            setDbUser(res.data);
          } catch (error) {
            console.log(error);
          }
        } else {
          setDbUser(null);
        }

        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    dbUser,
    loading,
    registerUser,
    loginUser,
    logoutUser,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;