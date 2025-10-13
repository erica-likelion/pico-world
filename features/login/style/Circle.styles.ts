import styled from "styled-components/native";

export const CircleWrap = styled.View`
  display: flex;
  width: 100%;
  height: 75%;
  align-items: center;
  position: relative;
  z-index: 1;
`;

export const CircleImageLeft = styled.Image`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-100px, -91px);
  width: ${({ theme }) => theme.rem(182)};
  height: ${({ theme }) => theme.rem(182)};
  z-index: 2;
`;

export const CircleImageCenter = styled.Image`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-89px, -89px);
  width: ${({ theme }) => theme.rem(178)};
  height: ${({ theme }) => theme.rem(178)};
  z-index: 3;
`;

export const CircleImageRight = styled.Image`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-83px, -82px);
  width: ${({ theme }) => theme.rem(178)};
  height: ${({ theme }) => theme.rem(182)};
  z-index: 2;
`;
