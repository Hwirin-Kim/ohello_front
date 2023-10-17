import React, { useEffect } from "react";
import { useSocket } from "../context/SocketContext";

export default function LobbyPage() {
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      console.log("hi");
      socket.on("connect", () => {
        console.log("연결됨!!!");
      });
      socket.emit("message", "하위이이이");
    }

    return () => {
      if (socket) {
        socket.off("connect", () => {});
      }
    };
  }, [socket]);

  return <div>hi</div>;
}
