import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthProvider } from "./AuthContext";

export default function Profile() {
  const { profile } = useContext(AuthProvider);

  console.log(profile);

  return (
    <div className="w-full max-w-sm px-4 py-3 bg-white rounded-md shadow-md dark:bg-gray-800">
      <h1>{profile?.email}</h1>
    </div>
  );
}
