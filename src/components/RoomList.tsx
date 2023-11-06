import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { useSocket } from "../context/SocketContext";
import { Room } from "../types";
import { elapsedTime } from "../utils/dateLogic";

type Props = {
  roomList: Room[];
};

export default function RoomList({ roomList }: Props) {
  const socket = useSocket();
  const navigation = useNavigate();
  console.log(roomList);

  const joinRoomHandler = (roomId: number) => {
    navigation(`/room/${roomId}`);
  };

  return (
    <StContainer>
      <StTable>
        <StThead>
          <StTr>
            <StTh>Title</StTh>
            <StTh>Created</StTh>
          </StTr>
        </StThead>
        <StTbody>
          {roomList.map(({ title, createdAt, roomId }) => (
            <StTr
              key={createdAt}
              onClick={() => joinRoomHandler(roomId)}
              $isBody={true}
            >
              <StTd>{title}</StTd>
              <StTd>{elapsedTime(createdAt)}</StTd>
            </StTr>
          ))}
        </StTbody>
      </StTable>
    </StContainer>
  );
}

const StContainer = styled.section``;

const StTable = styled.table`
  border: 1px solid rgb(229 231 235);
  border-collapse: collapse;
`;
const StThead = styled.thead``;
const StTbody = styled.tbody``;
const StTr = styled.tr<{ $isBody?: boolean }>`
  ${({ $isBody }) =>
    $isBody &&
    `&:hover {
    background-color: #fafafa;
    cursor: pointer;
  }`}
`;
const StTh = styled.th`
  border-bottom: 1px solid rgb(229 231 235);
`;
const StTd = styled.td`
  border-bottom: 1px solid rgb(229 231 235);

  padding: 0.5rem 2rem;
`;
