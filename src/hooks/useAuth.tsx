import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authorization } from "../service/auth";
export default function useAuth() {
  const [isLogin, setIsLogin] = useState(false);
  const navigation = useNavigate();

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      try {
        const authStatus = await authorization();
        if (authStatus.isAuthenticated) {
          setIsLogin(true);
        } else {
          setIsLogin(false);
        }
      } catch (error) {
        setIsLogin(false);
      }
    };

    checkAuthAndRedirect();
  }, [navigation]);

  return { isLogin };
}
