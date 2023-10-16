import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { socket } from "../service/server";

export default function Test() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [chat, setChat] = useState("");
  const [room, setRoom] = useState(0);
  const [receiveChat, setReceiveChat] = useState<string[]>([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("receive_message_from_room", (message) => {
      setReceiveChat((prev) => [...prev, message]);
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("receive_message_from_room");
    };
  }, []);
  const sendMessage = () => {
    socket.emit("send_message_to_room", { room, chat });
    setChat("");
  };
  const joinRoom = () => {
    socket.emit("join_room", room);
  };

  return (
    <div className="App">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          joinRoom();
        }}
      >
        <input
          type="number"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setRoom(parseInt(e.target.value));
          }}
        />
        <button>join room</button>
      </form>
      <h1>Hello, Socket.io!</h1>
      <div>
        {receiveChat.map((chat) => (
          <p>{chat}</p>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
      >
        <input
          value={chat}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setChat(e.target.value)
          }
        />

        <button>전송</button>
      </form>
    </div>
  );
}
