import { useCallback, useEffect, useState } from "react";

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [ready, setReady] = useState<boolean | null>(false);
  const authDataName = "authData";

  const login = useCallback((token: string, userId: string) => {
    setToken(token);
    setUserId(userId);

    localStorage.setItem(
      authDataName,
      JSON.stringify({
        token,
        userId,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(authDataName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(authDataName) || "{}");
    if (data?.token) {
      login(data.token, data.userId);
    }
    setReady(true)
  }, [login]);

  return { login, logout, token, userId, ready };
};
