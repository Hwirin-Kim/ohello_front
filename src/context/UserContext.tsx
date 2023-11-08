import { createContext, useContext, useEffect, useState } from "react";
import { authorization } from "../service/auth";
import { AuthResponse } from "../types";

type UserContextType = {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
  userInfo: UserInfo;
  isLoading: boolean;
};

const UserContext = createContext<UserContextType>({
  isLogin: false,
  setIsLogin: () => {},
  userInfo: { username: "", nickname: "" },
  setUserInfo: () => {},
  isLoading: false,
});

type UserContextProviderProps = {
  children: React.ReactNode;
};

type UserInfo = {
  username: string;
  nickname: string;
};
const INITIAL_USER = { username: "", nickname: "" };
export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(INITIAL_USER);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authStatus = await authorization();
        if (authStatus.isAuthenticated) {
          setIsLogin(true);
          if (authStatus.user)
            setUserInfo({
              username: authStatus.user.username,
              nickname: authStatus.user.nickname,
            });
        } else {
          setIsLogin(false);
          setUserInfo(INITIAL_USER);
        }
      } catch (error) {
        setIsLogin(false);
        setUserInfo(INITIAL_USER);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <UserContext.Provider
      value={{ isLogin, setIsLogin, userInfo, setUserInfo, isLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
