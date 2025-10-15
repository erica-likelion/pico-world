import PolygonIcon from "@/shared/assets/icons/polygon.svg";
import { Dimensions } from "react-native";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";

const { width: screenWidth } = Dimensions.get("window");

export const CharacterInfoContainer = styled(Animated.ScrollView).attrs(() => ({
	horizontal: true,
	showsHorizontalScrollIndicator: false,
	pagingEnabled: true,
}))`
  width: 100%;
  height: ${({ theme }) => theme.rem(464)};
  display: flex;
  flex-direction: row;
  padding-top: ${({ theme }) => theme.rem(104)};
`;

export const CharacterWrapper = styled.View`
  width: ${screenWidth}px;
  align-items: center;
`;

export const SpeechBubbleContainer = styled.View`
  position: relative;
  display: flex;
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

export const CharacterImageView = styled.View`
  width: ${({ theme }) => theme.rem(213)};
  height: ${({ theme }) => theme.rem(213)};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.rem(106)};
  background-color: ${({ theme }) => theme.grayscale.gray900};
  margin-top: ${({ theme }) => theme.rem(38)};
  margin-bottom: ${({ theme }) => theme.rem(10)};
`;
export const CharacterImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const CharacterName = styled.Text`
  margin-top: ${({ theme }) => theme.rem(8)};
  color: ${({ theme }) => theme.grayscale.white};
  ${({ theme }) => theme.typography.h3};
`;

export const PersonalityContainer = styled.View`
  margin-top: ${({ theme }) => theme.rem(47)};
  gap: ${({ theme }) => theme.rem(8)};
  flex-direction: row;
`;

export const PersonalityBox = styled.View`
  padding: ${({ theme }) => theme.rem(10)} ${({ theme }) => theme.rem(21)};
  border-radius: 40px;
  background-color: ${({ theme }) => theme.grayscale.gray800};
`;

export const PersonalityText = styled.Text`
  color: ${({ theme }) => theme.grayscale.gray400};
  ${({ theme }) => theme.typography["title2-medium"]};
`;
