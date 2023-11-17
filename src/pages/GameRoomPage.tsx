import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Chat from "../components/Chat";
import PlayGame from "../components/PlayGame";

import { useSocket } from "../context/SocketContext";
import { useUserContext } from "../context/UserContext";
import { CellType, RoomInfo, SimpleUser } from "../types";
import CurrentTurn from "../components/CurrentTurn";
import ProfileCard from "../components/ProfileCard";
import styled from "styled-components";
import RoomButtonBox from "../components/RoomButtonBox";

export default function GameRoomPage() {
  const socket = useSocket();
  const { userInfo } = useUserContext();
  const { id: roomId } = useParams();
  const navigation = useNavigate();
  const [ready, setReady] = useState(false);
  const [room, setRoom] = useState<RoomInfo | null>();
  const [isOwner, setIsOwner] = useState(false);
  const [opponent, setOpponent] = useState<SimpleUser | undefined>();
  const [myInfo, setMyInfo] = useState<SimpleUser | undefined>();
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
    if (room?.roomStatus === "waiting") {
      alert("아직 대기중인 사용자가 있습니다.");
      return;
    }
    if (room?.roomStatus === "playing") {
      alert("이미 게임중입니다!");
      return;
    }
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

  useEffect(() => {
    if (room) {
      const users = room.users;
      const myInfo = users.find((user) => user.username === userInfo.username);
      setMyInfo(myInfo);
    } else {
      setMyInfo(undefined);
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
    <StContainer>
      <h1>{timer}</h1>

      <StProfileWrap>
        <ProfileCard userInfo={myInfo} isMe />
        <ProfileCard userInfo={opponent} />
      </StProfileWrap>
      <RoomButtonBox
        isReady={ready}
        isOwner={isOwner}
        onGameStartHandler={onGameStartHandler}
        onLeaveRoomHandler={onLeaveRoomHandler}
        onReadyHandler={onReadyHandler}
      />
      <PlayGame
        currentTurn={currentTurn}
        myColor={myColor}
        roomId={roomId}
        roomStatus={room?.roomStatus}
      />
      <Chat />
    </StContainer>
  );
}
const StContainer = styled.section`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

const StProfileWrap = styled.div`
  display: flex;
  gap: 10px;
`;
