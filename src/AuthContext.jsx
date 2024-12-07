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
  const [users, setUsers] = useState(null);
  const [profile, setProfile] = useState(null);

  const createUserInWebsite = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubs = onAuthStateChanged(auth, (user) => {
      const userEmail = { email: user?.email || users?.email };
      setUsers(user);
      // console.log(user);
      if (user) {
        axios
          .post("http://localhost:5000/login", userEmail, {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res.data);
          });
      } else {
        axios.post("http://localhost:5000/logout", userEmail, {
          withCredentials: true,
        });
      }
    });

    return () => unsubs();
  }, []);

  // useEffect(  () => {
  //   const unsubs = onAuthStateChanged(auth, (user) => {
  //     console.log(user, users);
  //     setUsers(user);
  //   //   const userEmail = user?.email || users?.email;
  //   //   const email = { email: userEmail };
  //   //   console.log("email", email);
  //   //   console.log("current user:", users);
  //   //   if (user) {
  //   //     axios
  //   //       .post("http://localhost:5000/users", email, { withCredentials: true })
  //   //       .then((res) => console.log(res.data));
  //   //   } else {
  //   //     axios
  //   //       .post("http://localhost:5000/logout", email, {
  //   //         withCredentials: true,
  //   //       })
  //   //       .then((res) => console.log(res.data));
  //   //   }
  //   // });
  //   return () => unsubs();
  // }, []);

  const info = { createUserInWebsite, signIn, users, setProfile, profile };

  return <AuthProvider.Provider value={info}>{children}</AuthProvider.Provider>;
}
