import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

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
  const navigation = useNavigate();

  useEffect(() => {
    const newSocket = io("http://localhost:8080", {
      withCredentials: true,
    });
    setSocket(newSocket);
    newSocket.on("error", (err) => {
      console.log(err);
    });
    return () => {
      newSocket.close();
      newSocket.off("error");
      navigation("/lobby");
    };
  }, []);

  return (
    <socketContext.Provider value={socket}>{children}</socketContext.Provider>
  );
};
