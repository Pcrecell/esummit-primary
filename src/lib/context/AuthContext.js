"use client"
import React, { createContext, useContext, useEffect, useState } from "react";
import {onAuthStateChanged } from "firebase/auth";
import {doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/utils/firebase/firebase";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log("Firebase User: ", firebaseUser)
      if (firebaseUser) {
        setUserData(firebaseUser);
        // console.log("Firebase user data:", firebaseUser);
        // Fetch user profile from Firestore
        const userDoc = await getDoc(doc(db, 'Users', firebaseUser.uid));
        // console.log("User profile data:", userDoc.exists() ? userDoc.data() : null);
        setProfile(userDoc.exists() ? userDoc.data() : null);
      } else {
        setUserData(null);
        setProfile(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ userData, setUserData, profile, setProfile, loading}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
