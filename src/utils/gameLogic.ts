import {
  CellCoordinatesType,
  CellType,
  Coordinate,
  FlipTargetsType,
  GetFlipTargetType,
  MatrixType,
} from "../types";

/**
 * 착수한 돌 기준으로 특정 방향(가로, 세로, 왼대각, 오른대각)의 배열을 받아 착수한 돌을 제외시키고 이전과 이후 배열로 나눈다.
 * @param arr : 착수한 돌의 특정 방향 배열
 * @param targetIndex : 착수한 돌이 위치한 index
 * @returns : [이전배열, 이후배열]
 */
const sliceArray = (
  arr: (CellCoordinatesType | undefined)[],
  targetIndex: number
) => {
  const prevArr = arr.slice(0, targetIndex).filter((v) => !!v);
  const nextArr = arr.slice(targetIndex + 1).filter((v) => !!v);
  return [prevArr, nextArr] as [[number, number][], [number, number][]];
};

/**
 * @param matrix
 * @param value : click한 사람의 돌 value (turn과 같음)
 * @param coordinate : click한 위치
 * @returns 뒤집어야할 target좌표들의 배열
 */
const getFlipTargets = (
  matrix: MatrixType,
  value: CellType,
  coordinate: Coordinate
) => {
  //마지막에 flat()을 하게 되면 각 방향별로 묶여있던것들이 방향과 상관없이 좌표만 모인 배열이 된다.
  return getDirectionalArray(matrix, coordinate)
    .map(getFlipTargetsArray(matrix, value))
    .flat();
};

/**
 * 착수한 돌을 기준으로 가로, 세로, 왼대각, 오른대각의 배열을 얻는다.
 * @param matrix
 * @param param1
 * @returns [가로배열,세로배열,왼대각배열,오른대각배열]
 */
const getDirectionalArray = (matrix: MatrixType, { row, col }: Coordinate) => {
  const horizontalArray = sliceArray(
    matrix[row].map((_, i) => [row, i]),
    col
  );
  const verticalArray = sliceArray(
    matrix.map((_, i) => [i, col]),
    row
  );
  const diagonalArray = sliceArray(
    matrix.map((_, i) => {
      const diagonalCol = col - row + i;
      return diagonalCol > -1 && diagonalCol < 8 ? [i, diagonalCol] : undefined;
    }),
    row
  );

  const antiDiagonalArray = sliceArray(
    matrix.map((_, i) => {
      const antiDiagonalCol = col + row - i;
      return antiDiagonalCol > -1 && antiDiagonalCol < 8
        ? [i, antiDiagonalCol]
        : undefined;
    }),
    row
  );

  return [horizontalArray, verticalArray, diagonalArray, antiDiagonalArray];
};

/**
 * 입력받은 배열에서 뒤집어야하는 target 배열을 얻는다.
 * 사용법 : getFlipTargetsArray를 맵핑할때 인자로 넣어준다.
 * @param matrix : 보드판 배열 2*2
 * @param stoneValue : white,black 중, 현재 턴을 value로 한다.
 * @returns 뒤집어야 할 셀의 좌표배열이 담긴 배열
 */
const getFlipTargetsArray =
  (matrix: MatrixType, stoneValue: CellType) =>
  ([prevArr, nextArr]: GetFlipTargetType) => {
    const flipTargets: FlipTargetsType = [];

    /**** 착수한 돌 이전 배열 가공 *****/
    const indexOfSameValueInPrevArr = prevArr.findLastIndex(
      ([r, c]) => matrix[r][c] === stoneValue
    );

    const prevTargetArr = prevArr.slice(indexOfSameValueInPrevArr + 1);

    if (
      indexOfSameValueInPrevArr >= 0 &&
      prevTargetArr.every(
        ([r, c]) => !!matrix[r][c] && matrix[r][c] !== stoneValue
      )
    ) {
      flipTargets.push(...prevTargetArr);
    }

    const indexOfSameValueInNextArr = nextArr.findIndex(
      ([r, c]) => matrix[r][c] === stoneValue
    );

    /**** 착수한 돌 이후 배열 가공 *****/
    const nextTargetArr = nextArr.slice(0, indexOfSameValueInNextArr);
    if (
      indexOfSameValueInNextArr >= 0 &&
      nextTargetArr.every(
        ([r, c]) => !!matrix[r][c] && matrix[r][c] !== stoneValue
      )
    ) {
      flipTargets.push(...nextTargetArr);
    }

    return flipTargets;
  };

export { getFlipTargets };
