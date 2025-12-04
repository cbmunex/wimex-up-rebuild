import { useEffect, useState } from "react";
import { Auth } from "aws-amplify";

export function useAuth() {
  const [user, setUser] = useState(null);

  async function checkUser() {
    try {
      const current = await Auth.currentAuthenticatedUser();
      setUser(current);
    } catch (err) {
      setUser(null);
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  return { user, checkUser };
}
