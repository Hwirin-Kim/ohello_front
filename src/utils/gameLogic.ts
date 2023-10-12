import {
  CellCoordinatesType,
  CellType,
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
const sliceArray = (arr: CellCoordinatesType[], targetIndex: number) => {
  const prevArr = arr.slice(0, targetIndex).filter((v) => !!v);
  const nextArr = arr.slice(targetIndex + 1).filter((v) => !!v);
  return [prevArr, nextArr];
};

/**
 * 착수한 돌을 기준으로 특정 방향(가로,세로, 왼대각, 오른대각)의 [이전배열,이후배열] 을 받아서 뒤집어야 할 돌을 반환한다.
 * 고차함수 형태로 단일로 사용하지 않고 [가로,세로,왼대각,오른대각] 배열의 map 메서드 인자로 받아서 사용한다.
 * @param matrix : 보드판 배열 2*2
 * @param stoneValue : white,black 중, 현재 턴을 value로 한다.
 * @returns 뒤집어야 할 셀의 좌표배열이 담긴 배열
 */
const getFlipTargetArrAtDirection =
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

export { getFlipTargetArrAtDirection };
