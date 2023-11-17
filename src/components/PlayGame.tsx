import { useEffect, useState } from "react";
import { styled } from "styled-components";
import Row from "./Row";
import ScoreBoard from "./ScoreBoard";
import { CellType } from "../types";
import { gameInformation } from "../utils/gameInformation";
import { getFlipTargets } from "../utils/gameLogic";

import { getInitialMatrix } from "../utils/getInitialMatrix";
import { useSocket } from "../context/SocketContext";

type Props = {
  currentTurn: CellType;
  myColor: CellType;
  roomId: string | undefined;
  roomStatus: "waiting" | "ready" | "playing" | undefined;
};

export default function PlayGame({
  currentTurn,
  myColor,
  roomId,
  roomStatus,
}: Props) {
  const [matrix, setMatrix] = useState(getInitialMatrix);
  // const [turn, setTurn] = useState<CellType>("black");
  const [gameOver, setGameOver] = useState(false);
  const [count, setCount] = useState({ white: 2, black: 2 });
  const socket = useSocket();
  const handleCellClick = (index: number) => {
    if (roomStatus !== "playing") {
      alert("게임이 아직 시작되지 않았습니다.");
      return;
    }

    if (currentTurn !== myColor) {
      alert("제 턴이 아닙니다..");
      return;
    }

    const [row, col] = [Math.floor(index / 8), index % 8];
    console.log(`row:${row}, col:${col}`);

    const flipTargets =
      !matrix[row][col] && getFlipTargets(matrix, myColor, { row, col });

    if (!flipTargets || !flipTargets.length) {
      alert("둘 수 없는 위치 입니다.");
      return;
    }

    setMatrix((prev) => {
      const newMatrix = prev.map((row) => [...row]);
      flipTargets.forEach(([r, c]) => {
        newMatrix[r][c] = myColor;
      });
      newMatrix[row][col] = myColor;
      return newMatrix;
    });
    // setTurn((prev) => (prev === "white" ? "black" : "white"));
    socket &&
      socket.emit("placed_stone", roomId, {
        stoneColor: myColor,
        index: index,
      });
  };

  useEffect(() => {
    const socketClickHandler = (index: number, turn: CellType) => {
      const [row, col] = [Math.floor(index / 8), index % 8];
      console.log(`row:${row}, col:${col}`);

      const flipTargets =
        !matrix[row][col] && getFlipTargets(matrix, turn, { row, col });

      if (flipTargets)
        setMatrix((prev) => {
          const newMatrix = prev.map((row) => [...row]);
          flipTargets.forEach(([r, c]) => {
            newMatrix[r][c] = turn;
          });
          newMatrix[row][col] = turn;
          return newMatrix;
        });
    };

    socket &&
      socket.on(
        "opponent_placed_stone",
        (data: { stoneColor: CellType; index: number }) => {
          console.log("상대방 돌 착수 데이터", data);
          if (data.stoneColor !== myColor) {
            socketClickHandler(data.index, data.stoneColor);
            console.log("소켓핸들러 작동함!", myColor);
          }
        }
      );
    return () => {
      if (socket) {
        socket.off("opponent_placed_stone");
      }
    };
  }, [socket, myColor, matrix]);

  useEffect(() => {
    const { white, black, emptyCell, isAvailable } = gameInformation(
      myColor,
      matrix
    );
    setCount({ white, black });

    if (!isAvailable) {
      if (!white || !black || !emptyCell.length) {
        alert(
          `GAME OVER : ${white > black ? "winner : white" : "winner : black"}`
        );
        setGameOver(true);
      } else {
        alert("둘 수 있는 자리가 없습니다. 상대에게 턴을 넘깁니다.");
        // setTurn((prev) => (prev === "white" ? "black" : "white"));
      }
    }
  }, [matrix]);

  return (
    <StArticle>
      <ScoreBoard count={count} />
      <StMatrix>
        {matrix.map((row, index) => {
          return (
            <Row
              key={index}
              row={row}
              rowIndex={index}
              handleCellClick={handleCellClick}
              gameOver={gameOver}
            />
          );
        })}
      </StMatrix>
    </StArticle>
  );
}
const StArticle = styled.article``;

const StMatrix = styled.div`
  display: table;
  border-collapse: collapse;
  background-color: #242424ea;
`;
