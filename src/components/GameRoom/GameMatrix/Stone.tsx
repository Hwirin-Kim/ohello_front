import React from "react";
import styled from "styled-components";

type Props = {
  color: string;
  width: string;
  height: string;
};
export default function Stone({ color, width, height }: Props) {
  return <StStone $color={color} $width={width} $height={height} />;
}

const StStone = styled.div<{ $color: string; $width: string; $height: string }>`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  margin: auto;

  border-radius: 50%;
  border: 1px solid white;

  background: ${(props) =>
    props.$color === "white"
      ? props.theme.stone.white_background
      : props.theme.stone.black_background};

  box-shadow: ${(props) =>
    props.$color === "white"
      ? props.theme.stone.white_shadow
      : props.theme.stone.black_shadow};
`;
