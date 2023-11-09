import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomList from "../components/RoomList";
import { useSocket } from "../context/SocketContext";
import { useUserContext } from "../context/UserContext";
import { logout } from "../service/auth";
import { Room, RoomInfo } from "../types";

export default function LobbyPage() {
  const socket = useSocket();
  const [roomName, setRoomName] = useState("");
  const [roomList, setRoomList] = useState<Room[]>([]);

  const { userInfo } = useUserContext();
  console.log(userInfo, "here is lobby");

  const navigation = useNavigate();
  const onCreateRoom = () => {
    if (socket) {
      socket.emit("create_room", roomName);
      setRoomName("");
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("created_room", (data) => {
        if (data.success) {
          navigation(`/room/${data.roomId}`);
        }
      });
      socket.on("room_list", (data: Room[]) => {
        setRoomList(data);
      });
      socket.emit("get_room");
    }

    return () => {
      if (socket) {
        socket.off("created_room");
        socket.off("get_room");
        socket.off("room_list");
      }
    };
  }, [socket, navigation]);

  return (
    <section>
      <RoomList roomList={roomList} />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onCreateRoom();
        }}
      >
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <button>방 생성</button>
      </form>
    </section>
  );
}
