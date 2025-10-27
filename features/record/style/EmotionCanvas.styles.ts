import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding-bottom: ${({ theme }) => theme.rem(86)};
`;

export const CanvasContainer = styled.View`
  flex: 1;
  position: relative;
  width: 100%;
`;
