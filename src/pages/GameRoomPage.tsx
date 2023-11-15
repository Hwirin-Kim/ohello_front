import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Chat from "../components/Chat";
import PlayGame from "../components/PlayGame";
import Opponent, { SimpleUser } from "../components/Opponent";
import { useSocket } from "../context/SocketContext";
import { useUserContext } from "../context/UserContext";
import { CellType, RoomInfo, UserInfo } from "../types";
import CurrentTurn from "../components/CurrentTurn";

export default function GameRoomPage() {
  const socket = useSocket();
  const { userInfo } = useUserContext();
  const { id: roomId } = useParams();
  const navigation = useNavigate();
  const [ready, setReady] = useState(false);
  const [room, setRoom] = useState<RoomInfo | null>();
  const [isOwner, setIsOwner] = useState(false);
  const [opponent, setOpponent] = useState<SimpleUser | undefined>();
  const [currentTurn, setCurrentTurn] = useState<CellType>("black");
  const [timer, setTimer] = useState(0);
  const [myColor, setMyColor] = useState<CellType>("black");

  const onReadyHandler = () => {
    socket &&
      socket.emit("ready", roomId, (serverStatus: boolean) => {
        setReady(serverStatus);
      });
  };
  const onLeaveRoomHandler = () => {
    if (socket) socket.emit("leave_room", roomId);
    navigation("/lobby");
  };

  const onGameStartHandler = () => {
    if (socket) socket.emit("game_start", roomId);
  };

  const onPlacedStoneHandler = () => {
    if (socket) socket.emit("placed_stone", roomId);
  };

  //상대방 정보 가져오기
  useEffect(() => {
    if (room && room.users.length === 2) {
      const users = room.users;
      const opponent = users.find(
        (user) => user.username !== userInfo.username
      );

      setOpponent(opponent);
    } else {
      setOpponent(undefined);
    }
  }, [room]);

  //방장정보
  useEffect(() => {
    if (room?.owner.username === userInfo.username) setIsOwner(true);
    else setIsOwner(false);
  }, [room, userInfo]);

  //socket관리
  useEffect(() => {
    if (socket) {
      socket.on("room_info", (room) => {
        setRoom(room);
      });

      socket.emit("room_info", roomId, (room: RoomInfo) => {
        setRoom(room);
      });

      socket.on("update_time", (time) => {
        setTimer(time);
      });
      socket.on("game_over", (data) => {
        console.log("게임오버 :", data);
      });

      socket.on("current_turn", (data) => {
        setCurrentTurn(data.data);
      });
      socket.emit(
        "my_stone_color",
        roomId,
        (data: { success: boolean; data: CellType }) => {
          if (data.success) {
            setMyColor(data.data);
          }
        }
      );
    }
    return () => {
      if (socket) {
        socket.off("room_info");
        socket.off("current_turn");
        socket.off("game_over");
        socket.off("update_time");
      }
    };
  }, [roomId, socket]);

  return (
    <div>
      <h1>{timer}</h1>
      <h1>{myColor}</h1>
      <button onClick={onPlacedStoneHandler}>턴넘기기버튼</button>
      <button onClick={onReadyHandler}>
        {ready ? "준비완료" : "준비하기"}
      </button>
      {isOwner && room?.roomStatus !== "playing" && (
        <button onClick={onGameStartHandler}>
          {room && room.roomStatus === "ready" ? "게임시작" : "유저 대기중"}
        </button>
      )}
      <button onClick={onLeaveRoomHandler}>방나가기</button>
      <CurrentTurn currentTurn={currentTurn} />
      <Opponent opponent={opponent} />
      <PlayGame
        currentTurn={currentTurn}
        myColor={myColor}
        roomId={roomId}
        roomStatus={room?.roomStatus}
      />
      <Chat />
    </div>
  );
}
