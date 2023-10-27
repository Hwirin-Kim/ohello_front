import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { io, Socket } from "socket.io-client";
import { useUserContext } from "./UserContext";

const socketContext = createContext<Socket | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export const useSocket = () => {
  return useContext(socketContext);
};

export const SocketProvider = ({ children }: Props) => {
  const [socket, setSocket] = useState<Socket>();
  const getUserInfo = localStorage.getItem("userInfo");
  const userInfo = getUserInfo
    ? JSON.parse(getUserInfo)
    : { username: "", nickname: "" };
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    const newSocket = io("http://localhost:8080", {
      query: { ...userInfo, accessToken },
    });
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <socketContext.Provider value={socket}>{children}</socketContext.Provider>
  );
};
