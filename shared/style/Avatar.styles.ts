import { Image } from "react-native";
import styled from "styled-components/native";

type IconProps = { $size: number };

export const AvatarImage = styled(Image)<IconProps>`
  width: ${({ theme, $size }) => theme.rem($size)};
  height: ${({ theme, $size }) => theme.rem($size)};
  resize-mode: cover;
  border-radius: 999px;
  overflow: hidden;
`;

export const Background = styled.View<IconProps>`
  width: ${({ theme, $size }) => theme.rem($size)};
  height: ${({ theme, $size }) => theme.rem($size)};
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.grayscale.gray900};
  border: 1px solid ${({ theme }) => theme.grayscale.gray600};
  overflow: hidden;
`;
