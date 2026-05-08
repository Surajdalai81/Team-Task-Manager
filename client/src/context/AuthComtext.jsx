import { useState } from "react";
import { AuthContext } from "./authContext";

const AuthProvider = ({ children }) => {

  const storedUser = localStorage.getItem("user");

 const [user, setUser] = useState(() => {
  try {
    return storedUser &&
      storedUser !== "undefined"
      ? JSON.parse(storedUser)
      : null;
  } catch {
    return null;
  }
});

  // LOGIN
  const login = (userData) => {
    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    setUser(userData);
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("user");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;