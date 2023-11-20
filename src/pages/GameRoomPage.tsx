import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Chat from "../components/GameRoom/Chat/Chat";
import PlayGame from "../components/GameRoom/GameMatrix/PlayGame";
import { useSocket } from "../context/SocketContext";
import { useUserContext } from "../context/UserContext";
import { CellType, RoomInfo, SimpleUser } from "../types";
import ProfileCard from "../components/GameRoom/Status/ProfileCard";
import styled from "styled-components";
import RoomButtonBox from "../components/GameRoom/Status/RoomButtonBox";
import TimerBar from "../components/GameRoom/Status/TimerBar";
import { devices } from "../styles/devices";
import Swal from "sweetalert2";

export default function GameRoomPage() {
  const socket = useSocket();
  const { userInfo } = useUserContext();
  const { id: roomId } = useParams();
  const navigation = useNavigate();
  const [room, setRoom] = useState<RoomInfo | null>();
  const [isOwner, setIsOwner] = useState(false);
  const [opponent, setOpponent] = useState<SimpleUser | undefined>();
  const [myInfo, setMyInfo] = useState<SimpleUser | undefined>();
  const [currentTurn, setCurrentTurn] = useState<CellType>("black");
  const [timer, setTimer] = useState(0);
  const [myColor, setMyColor] = useState<CellType>("black");

  const onReadyHandler = () => {
    socket && socket.emit("ready", roomId);
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

  //내 정보 가져오기
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
        if (data.winner.username === userInfo.username) {
          Swal.fire({
            title: "승리",
            text: `${data.how}로 승리`,
            icon: "success",
            confirmButtonText: "확인",
          });
        } else {
          Swal.fire({
            title: "패배",
            text: `${data.how}로 패배`,
            icon: "error",
            confirmButtonText: "확인",
          });
        }
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
      <TimerBar timer={timer} />

      <PlayGame
        currentTurn={currentTurn}
        myColor={myColor}
        roomId={roomId}
        roomStatus={room?.roomStatus}
      />
      <StWrap>
        <StProfileWrap>
          <ProfileCard userInfo={myInfo} roomStatus={room?.roomStatus} isMe />
          <ProfileCard userInfo={opponent} roomStatus={room?.roomStatus} />
        </StProfileWrap>
        <RoomButtonBox
          isReady={myInfo?.isReady}
          isOwner={isOwner}
          roomStatus={room?.roomStatus}
          onGameStartHandler={onGameStartHandler}
          onLeaveRoomHandler={onLeaveRoomHandler}
          onReadyHandler={onReadyHandler}
        />
        <Chat />
      </StWrap>
    </StContainer>
  );
}
const StContainer = styled.section`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media ${devices.md} {
    margin: 0 auto;
    max-width: 1000px;
    flex-direction: row;
    justify-content: center;
    gap: 2rem;
  }
`;

const StProfileWrap = styled.div`
  width: 100%;
  max-width: 25rem;
  display: flex;
  justify-content: space-between;
`;

const StWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
