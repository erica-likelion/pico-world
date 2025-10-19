import PlusIconSvg from "@/shared/assets/icons/plus.svg";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";

export const CircleOut = styled(Animated.View)`
  width: ${({ theme }) => theme.rem(441)};
  height: ${({ theme }) => theme.rem(441)};
  border-radius: 441px;
  border: 1px solid #ffffff14;
  align-items: center;
  justify-content: center;
  margin-top: -${({ theme }) => theme.rem(60)};
`;

export const CircleIn = styled.View`
  position: relative;
  width: ${({ theme }) => theme.rem(309)};
  height: ${({ theme }) => theme.rem(309)};
  border-radius: 309px;
  border: 1px solid #ffffff14;
  align-items: center;
  justify-content: center;
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
  justify-content: center;
  align-items: center;
`;

export const CircleText = styled.Text`
  position: absolute;
  bottom: 21px;
  color: ${({ theme }) => theme.grayscale.white};
  ${({ theme }) => theme.typography["title3-medium"]};
`;

export const PlusingEffectBox = styled(Animated.View)`
  position: absolute;
  top: 30%;
  right: 5%;
  width: ${({ theme }) => theme.rem(360)};
  height: ${({ theme }) => theme.rem(360)};
  z-index: 30;
`;

export const PlusingEffect = styled.Image`
  width: 100%;
  height: 100%;
`;

export const PlusIcon = styled(PlusIconSvg)`
  position: absolute;
  z-index: 50;
  color: ${({ theme }) => theme.grayscale.white};
  width: ${({ theme }) => theme.rem(28)};
  height: ${({ theme }) => theme.rem(28)};
`;
