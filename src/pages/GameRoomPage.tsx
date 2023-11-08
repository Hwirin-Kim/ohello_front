import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Chat from "../components/Chat";
import PlayGame from "../components/PlayGame";
import Opponent from "../components/Opponent";
import { useSocket } from "../context/SocketContext";
import { useUserContext } from "../context/UserContext";
import { CellType, RoomInfo, UserInfo } from "../types";

export default function GameRoomPage() {
  const socket = useSocket();
  const { userInfo } = useUserContext();
  const { id: roomId } = useParams();
  const navigation = useNavigate();
  const [ready, setReady] = useState(false);
  const [room, setRoom] = useState<RoomInfo | null>();
  const [isOwner, setIsOwner] = useState(false);
  const [opponent, setOpponent] = useState<UserInfo | undefined>();
  const [isPossible, setIsPossible] = useState(false);
  const [currentTurn, setCurrentTurn] = useState<CellType>("black");
  const [timer, setTimer] = useState(0);

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
  console.log("턴정보", currentTurn);
  //방장정보
  useEffect(() => {
    if (room?.owner.username === userInfo.username) setIsOwner(true);
    else setIsOwner(false);
  }, [room, userInfo]);

  //socket관리
  useEffect(() => {
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

      socket.on("room_info", (room) => {
        setRoom(room);
      });

      socket.on("possible_game_start", (data) => {
        setIsPossible(data);
      });

      socket.on(
        "current_turn",
        (data: { success: boolean; data: CellType }) => {
          if (data.success === true) {
            setCurrentTurn(data.data);

            // 타이머 초기화 및 시작
            setTimer(15);
            const timerId = setInterval(() => {
              setTimer((prevTime) => {
                if (prevTime <= 1) {
                  return 0;
                }
                return prevTime - 1;
              });
            }, 1000);
            return () => clearInterval(timerId);
          }
        }
      );
    }
    return () => {
      if (socket) {
        socket.off("join_room");

        socket.off("room_info");
        socket.off("current_turn");
        socket.off("possible_game_start");
      }
    };
  }, [roomId, socket]);

  return (
    <div>
      <h1>{timer}</h1>
      <button onClick={onReadyHandler}>
        {ready ? "준비완료" : "준비하기"}
      </button>
      {isOwner && (
        <button onClick={onGameStartHandler}>
          {isPossible ? "게임시작" : "유저 대기중"}
        </button>
      )}
      <button onClick={onLeaveRoomHandler}>방나가기</button>
      <Opponent opponent={opponent} />

      <PlayGame />
      <Chat />
    </div>
  );
}
