import React, { useEffect, useRef, useState } from "react";
import { socket } from "../service/server";

export default function Test() {
  const [chat, setChat] = useState("");

  const sendMessage = () => {
    socket.emit("send_message", chat);
    setChat("");
  };

  return (
    <div className="App">
      <h1>Hello, Socket.io!</h1>
      <input
        value={chat}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setChat(e.target.value)
        }
      />
      <button onClick={() => sendMessage()}>전송</button>
    </div>
  );
}
