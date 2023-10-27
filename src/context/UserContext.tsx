import { createContext, useContext, useEffect, useState } from "react";

type UserContext = {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
  userInfo: UserInfo;
};

const UserContext = createContext<UserContext>({
  isLogin: false,
  setIsLogin: () => {},
  userInfo: { username: "", nickname: "" },
  setUserInfo: () => {},
});

type UserContextProviderProps = {
  children: React.ReactNode;
};

type UserInfo = {
  username: string;
  nickname: string;
};

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(() => !!localStorage.accessToken);
  const [userInfo, setUserInfo] = useState({ username: "", nickname: "" });

  useEffect(() => {
    if (localStorage.accessToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  useEffect(() => {
    const getJSONItem = localStorage.getItem("userInfo");
    if (getJSONItem) {
      // 값이 있는지 확인
      const parsedUserInfo: UserInfo = JSON.parse(getJSONItem);
      setUserInfo(parsedUserInfo);
      setIsLoading(true);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ isLogin, setIsLogin, userInfo, setUserInfo }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
