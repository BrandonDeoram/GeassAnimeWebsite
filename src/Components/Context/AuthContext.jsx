import { createContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        loading,
        error,
        isLoggedIn,
        isRegistering,
        setLoading,
        setError,
        setIsLoggedIn,
        setIsRegistering,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
