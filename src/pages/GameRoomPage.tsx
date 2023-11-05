import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Chat from "../components/Chat";
import PlayGame from "../components/PlayGame";
import { useSocket } from "../context/SocketContext";
import { useUserContext } from "../context/UserContext";
import { RoomInfo } from "../types";

export default function GameRoomPage() {
  const socket = useSocket();
  const { userInfo } = useUserContext();
  const { id: roomId } = useParams();
  const navigation = useNavigate();
  const [ready, setReady] = useState(false);
  const [room, setRoom] = useState<RoomInfo | null>();
  console.log(room);
  const onReadyHandler = () => {
    setReady((prev) => !prev);
  };
  const onLeaveRoomHandler = () => {
    if (socket) socket.emit("leave_room", roomId);
    navigation("/lobby");
  };

  useEffect(() => {
    if (socket) {
      socket.emit("ready", ready);
    }
  }, [ready]);

  useEffect(() => {
    console.log(roomId);
    if (socket) {
      socket.emit(
        "join_room",
        roomId,
        (res: { success: boolean; data: RoomInfo }) => {
          if (!res.success) {
            alert(res.data);
            navigation("/lobby");
          } else {
            setRoom(res.data);
          }
        }
      );
    }
    return () => {
      if (socket) socket.off("join_room");
    };
  }, [socket, roomId, navigation]);

  return (
    <div>
      <button onClick={onReadyHandler}>Ready!</button>
      <button onClick={onLeaveRoomHandler}>방나가기</button>
      <Chat />
      <PlayGame />
    </div>
  );
}
