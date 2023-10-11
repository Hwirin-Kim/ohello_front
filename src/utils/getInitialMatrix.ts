const SIZE = 8; // 8*8
const WHITE = "white";
const BLACK = "black";

type Matrix = "white" | "black" | undefined;

export const getInitialMatrix = () => {
  const matrix: Matrix[][] = Array.from({ length: SIZE }, () =>
    Array.from({ length: SIZE }, () => undefined)
  );
  matrix[3][3] = WHITE;
  matrix[3][4] = BLACK;
  matrix[4][3] = BLACK;
  matrix[4][4] = WHITE;

  return matrix;
};
