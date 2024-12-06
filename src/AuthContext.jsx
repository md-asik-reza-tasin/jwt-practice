import { createContext, useEffect, useState } from "react";
import auth from "./firebase.config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import axios from "axios";

export const AuthProvider = createContext();

export default function AuthContext({ children }) {
  const [users, setUser] = useState(null);

  const createUserInWebsite = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubs = onAuthStateChanged(auth, (user) => {
      const userEmail = user.email || users.email;
      const email = { email: userEmail };
      console.log(email)
      setUser(user);
      console.log("current user:", user);
      if (user) {
        axios
          .post("http://localhost:5000/users", email, { withCredentials: true })
          .then((res) => console.log(res.data));
      } else {
        axios.post("http://localhost:5000/logout", {
          withCredentials: true,
        })
        .then(res => console.log(res.data))
      }
    });
    return () => unsubs();
  }, []);

  const info = { createUserInWebsite, signIn, users };

  return <AuthProvider.Provider value={info}>{children}</AuthProvider.Provider>;
}
