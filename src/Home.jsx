import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import { signOut } from "firebase/auth";
import auth from "./firebase.config";

export default function Home() {
  const { users, setProfile } = useContext(AuthProvider);

  const handleSignOut = () => {
    signOut(auth)
      .then((result) => {
        console.log(result);
      })
      .catch();
  };

  const handleProfile = email => {
    fetch(`http://localhost:5000/users/${email}`)
    .then(res => res.json())
    .then(data => setProfile(data))
  }

  return (
    <div>
      <div className="text-center mt-24">
        {users ? (
          <button className="mr-5" onClick={handleSignOut}>
            Log out
          </button>
        ) : (
          <NavLink className="mr-5" to="/login">
            Log in
          </NavLink>
        )}
        <NavLink to="/">Home</NavLink>
        <NavLink className="ml-5" to="/register">
          Register
        </NavLink>
        <NavLink
          
          onClick={() => handleProfile(users?.email)}
          to={`/users/${users?.email}`}
          className="ml-5"
        >
          My Profile
        </NavLink>
      </div>
      <Outlet></Outlet>
    </div>
  );
}
