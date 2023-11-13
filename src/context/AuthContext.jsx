import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useState, useContext, useEffect } from "react";
import { auth, db } from "../utils/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(
    () => JSON.parse(localStorage.getItem("USER")) || null
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = query(
          collection(db, "User"),
          where("email", "==", user.email)
        );

        const snapshot = await getDocs(userDocRef);
        snapshot.forEach((docRef) => {
          const data = docRef.data();
          if (data) {
            setCurrentUser(data);
            localStorage.setItem("USER", JSON.stringify(data));
          }
        });
      } else {
        navigate("sign-in");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const value = { currentUser, setCurrentUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
