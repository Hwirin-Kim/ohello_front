import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Chat from "../components/Chat";
import PlayGame from "../components/PlayGame";
import { useSocket } from "../context/SocketContext";
import { useUserContext } from "../context/UserContext";

export default function GameRoomPage() {
  const socket = useSocket();
  const { userInfo } = useUserContext();
  const { id: roomId } = useParams();
  const navigation = useNavigate();
  console.log(userInfo);
  const onLeaveRoomHandler = () => {
    if (socket) socket.emit("leave_room", roomId);
    navigation("/lobby");
  };
  useEffect(() => {
    console.log(roomId);
    if (socket) {
      socket.emit("join_room", roomId);
    }
    return () => {
      if (socket) socket.off("join_room");
    };
  }, [socket, roomId]);

  return (
    <div>
      <button onClick={onLeaveRoomHandler}>방나가기</button>
      <Chat />
      <PlayGame />
    </div>
  );
}
