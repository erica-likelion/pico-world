import PolygonIcon from "@/shared/assets/icons/polygon.svg";
import { Dimensions } from "react-native";
import styled from "styled-components/native";

const { width: screenWidth } = Dimensions.get("window");

export const CharacterInfoContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-top: ${({ theme }) => theme.rem(104)};
  gap: ${({ theme }) => theme.rem(38)};
`;

export const CharacterWrapper = styled.View`
  width: ${screenWidth}px;
  align-items: center;
  gap: ${({ theme }) => theme.rem(38)};
`;

export const SpeechBubbleContainer = styled.View`
  position: relative;
  display: flex;
  padding: ${({ theme }) => theme.rem(10)} ${({ theme }) => theme.rem(16)};
  justify-content: center;
  align-items: center;
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

export const CharacterNameBox = styled.View`
  gap: ${({ theme }) => theme.rem(8)};
  align-items: center;
`;

export const ImageScroll = styled.ScrollView`
  width: 100%;
  height: ${({ theme }) => theme.rem(233)};
`;

export const CharacterImageView = styled.View`
  width: ${screenWidth * 0.68}px;
  height: ${({ theme }) => theme.rem(213)};
  align-items: center;
  justify-content: center;
  margin-top: ${({ theme }) => theme.rem(10)};
  margin-bottom: ${({ theme }) => theme.rem(10)};
`;

export const CharacterImageWrapper = styled.View<{ boxShadow: string }>`
  width: ${({ theme }) => theme.rem(160)};
  height: ${({ theme }) => theme.rem(160)};
  shadow-color: ${({ boxShadow }) => boxShadow};
  shadow-offset: 0px 0px;
  shadow-opacity: 1;
  shadow-radius: 30px;

  /* Android 전용 그림자 */
  elevation: 8;
`;

export const CharacterImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const CharacterName = styled.Text`
  margin-top: -${({ theme }) => theme.rem(30)};
  color: ${({ theme }) => theme.grayscale.white};
  ${({ theme }) => theme.typography.h3};
`;

export const PersonalityContainer = styled.View`
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
