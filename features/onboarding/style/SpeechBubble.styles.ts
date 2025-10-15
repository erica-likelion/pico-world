import PolygonIcon from "@/shared/assets/icons/polygon.svg";
import styled from "styled-components/native";

export const SpeechBubbleContainer = styled.View`
  position: relative;
  display: flex;
  align-self: flex-start;
  padding: ${({ theme }) => theme.rem(10)} ${({ theme }) => theme.rem(16)};
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.rem(10)};
  border-radius: 20px;
  background-color: ${({ theme }) => theme.grayscale.gray800};
`;

export const SpeechBubbleText = styled.Text`
  color: ${({ theme }) => theme.grayscale.gray100};
  ${({ theme }) => theme.typography.b2};
`;

export const Polygon = styled(PolygonIcon)`
  position: absolute;
  width: ${({ theme }) => theme.rem(23)};
  height: ${({ theme }) => theme.rem(23)};
  bottom: -${({ theme }) => theme.rem(13)};
`;
