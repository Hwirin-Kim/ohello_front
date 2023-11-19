import { styled } from "styled-components";

type Props = {
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
};
export default function LoginInput({ onChangeHandler, name, label }: Props) {
  return (
    <StContainer>
      <StLabel>{label}</StLabel>
      <StInput name={name} onChange={onChangeHandler} />
    </StContainer>
  );
}

const StContainer = styled.div``;
const StInput = styled.input``;
const StLabel = styled.label``;
