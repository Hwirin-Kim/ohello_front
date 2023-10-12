export type CellType = "white" | "black";
export type CellOrEmptyType = CellType | undefined;
export type RowType = CellOrEmptyType[];
export type MatrixType = RowType[];
export type CellCoordinatesType = [number, number];
export type FlipTargetsType = CellCoordinatesType[];
export type GetFlipTargetType = [FlipTargetsType, FlipTargetsType];

//findLastIndex
declare global {
  interface Array<T> {
    findLastIndex(
      predicate: (value: T, index: number, obj: T[]) => unknown,
      thisArg?: any
    ): number;
  }
}
