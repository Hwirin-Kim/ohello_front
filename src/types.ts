export type CellType = "white" | "black";
export type CellOrEmptyType = CellType | undefined;
export type RowType = CellOrEmptyType[];
export type MatrixType = RowType[];
export type CellCoordinatesType = [number, number];
export type FlipTargetsType = CellCoordinatesType[];
export type GetFlipTargetType = [FlipTargetsType, FlipTargetsType];
export type Coordinate = { row: number; col: number };
export type Information = {
  white: number;
  black: number;
  emptyCell: Coordinate[];
  isAvailable: boolean;
};

//findLastIndex
declare global {
  interface Array<T> {
    findLastIndex(
      predicate: (value: T, index: number, obj: T[]) => unknown,
      thisArg?: any
    ): number;
  }
}

export type Room = {
  sockets: string[];
  title: string;
  roomId: number;
  createdAt: number;
};

export type RegisterForm = {
  username: string;
  password: string;
  nickname: string;
};

export type AxiosErrorType = {
  response: ServerResponseType;
};

export type ServerResponseType = {
  status: number;
  data: ErrorType;
};

export type ErrorType = {
  error: string;
};

export type UserLogin = {
  username: string;
  password: string;
};
