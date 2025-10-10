import styled from "styled-components/native";

export const DividerContainer = styled.View`
  display: flex;
  width: 100%;
  height: ${({ theme }) => theme.rem(6)};
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.grayscale.gray800};
`;
