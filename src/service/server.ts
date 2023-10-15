import { io } from "socket.io-client";
export const socket = io("http://localhost:8080");

socket.on("connection", (socket) => {
  socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  });

  socket.on("disconnect", () => {
    console.log(socket.id); // undefined
  });
});
