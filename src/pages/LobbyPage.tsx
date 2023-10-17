import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketContext";

type RoomList = {
  sockets: string[];
  title: string;
  roomId: string;
};

export default function LobbyPage() {
  const socket = useSocket();
  const [roomName, setRoomName] = useState("");
  const [roomList, setRoomList] = useState<RoomList[]>([]);
  const navigation = useNavigate();
  const onCreateRoom = () => {
    if (socket) {
      socket.emit("create_room", roomName);
      setRoomName("");
    }
  };

  const onEnterRoom = (id: string) => {
    navigation(`/room/${id}`);
  };

  useEffect(() => {
    if (socket) {
      socket.emit("message", "하위이이이");
      socket.on("created_room", (data) => {
        if (data.success) {
          navigation(`/room/${data.roomId}`);
        }
      });
      socket.on("room_list", (data: RoomList[]) => {
        setRoomList(data);
      });
    }

    return () => {
      if (socket) {
        socket.off("connect", () => {});
      }
    };
  }, [socket]);

  return (
    <div>
      <ul>
        {roomList.map((room) => (
          <li key={room.roomId} onClick={() => onEnterRoom(room.roomId)}>
            {room.title}
          </li>
        ))}
      </ul>
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
    </div>
  );
}
