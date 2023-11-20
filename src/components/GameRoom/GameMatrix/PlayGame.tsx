import { useEffect, useState } from "react";
import { styled } from "styled-components";
import Row from "./Row";
import ScoreBoard from "./ScoreBoard";
import { CellType } from "../../../types";
import { gameInformation } from "../../../utils/gameInformation";
import { getFlipTargets } from "../../../utils/gameLogic";

import { getInitialMatrix } from "../../../utils/getInitialMatrix";
import { useSocket } from "../../../context/SocketContext";
import CurrentTurn from "../Status/CurrentTurn";
import Swal from "sweetalert2";

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

  const Toast = Swal.mixin({
    toast: true,
    position: "center",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const handleCellClick = (index: number) => {
    if (roomStatus !== "playing") {
      Toast.fire({
        icon: "success",
        title: "게임 시작 후 이용하세요",
      });
      return;
    }

    if (currentTurn !== myColor) {
      Toast.fire({
        icon: "error",
        title: "상대 턴입니다..",
        timer: 500,
      });
      return;
    }

    const [row, col] = [Math.floor(index / 8), index % 8];
    console.log(`row:${row}, col:${col}`);

    const flipTargets =
      !matrix[row][col] && getFlipTargets(matrix, myColor, { row, col });

    if (!flipTargets || !flipTargets.length) {
      Toast.fire({
        position: "top",
        icon: "error",
        title: "둘 수 없는 위치입니다.",
        timer: 500,
      });
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
          if (data.stoneColor !== myColor) {
            socketClickHandler(data.index, data.stoneColor);
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
      <StWrap>
        <ScoreBoard count={count} />
        <CurrentTurn currentTurn={currentTurn} myColor={myColor} />
      </StWrap>
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
const StArticle = styled.article`
  margin-bottom: 1.5rem;
`;

const StMatrix = styled.div`
  display: table;
  border-collapse: collapse;
  border: 1px solid white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.matrix.shadow};
`;

const StWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
