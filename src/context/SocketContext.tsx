import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { io, Socket } from "socket.io-client";

const socketContext = createContext<Socket | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export const useSocket = () => {
  return useContext(socketContext);
};

export const SocketProvider = ({ children }: Props) => {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const newSocket = io("http://localhost:8080", {
      withCredentials: true,
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
