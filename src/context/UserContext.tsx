import { createContext, useContext, useEffect, useState } from "react";

type UserContext = {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserContext = createContext<UserContext>({
  isLogin: false,
  setIsLogin: () => {},
});

type UserContextProviderProps = {
  children: React.ReactNode;
};
export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (localStorage.accessToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);

  return (
    <UserContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
