import PolygonIcon from "@/shared/assets/icons/polygon.svg";
import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  padding: ${({ theme }) => theme.rem(16)};
  border-top-left-radius: ${({ theme }) => theme.rem(36)};
  border-top-right-radius: ${({ theme }) => theme.rem(36)};
  background-color: ${({ theme }) => theme.grayscale.gray950};
  gap: ${({ theme }) => theme.rem(16)};
`;

export const BottomSheet = styled.View`
  z-index: 1000;
  elevation: 1000;
`;

export const Header = styled.View`
  align-items: center;
  align-self: stretch;
  gap: ${({ theme }) => theme.rem(16)};
`;

export const TitleWrapper = styled.View`
  align-items: center;
  gap: ${({ theme }) => theme.rem(16)};
`;

export const Title = styled.Text`
  ${({ theme }) => theme.typography["title2-semibold"]};
  overflow: hidden;
  color: ${({ theme }) => theme.grayscale.gray100};
  text-align: center;
`;

export const ContentGroup = styled.View`
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  gap: ${({ theme }) => theme.rem(16)};
`;

export const SpeechBubbleContainer = styled.View`
  position: relative;
  align-self: stretch;
  align-items: center;
`;

export const SpeechBubble = styled.View`
  padding-vertical: ${({ theme }) => theme.rem(10)};
  padding-horizontal: ${({ theme }) => theme.rem(16)};
  border-radius: 20px;
  background-color: ${({ theme }) => theme.grayscale.gray800};
  max-width: 100%;
`;

export const SpeechBubbleText = styled.Text`
  color: ${({ theme }) => theme.grayscale.gray100};
  ${({ theme }) => theme.typography.b2};
`;

export const SpeechBubbleArrow = styled(PolygonIcon)`
  position: absolute;
  bottom: -10px;
  width: ${({ theme }) => theme.rem(23)};
  height: ${({ theme }) => theme.rem(23)};
`;

export const CharacterWrapper = styled.View`
  align-items: center;
  justify-content: center;
`;

export const CharacterGradient = styled.View<{ boxShadow: string }>`
  width: ${({ theme }) => theme.rem(124)};
  height: ${({ theme }) => theme.rem(124)};
  border-radius: ${({ theme }) => theme.rem(62)};
  align-items: center;
  justify-content: center;
  shadow-color: ${({ boxShadow }) => boxShadow};
  shadow-offset: ${({ theme }) => theme.rem(4)} ${({ theme }) => theme.rem(4)};
  shadow-opacity: 1;
  shadow-radius: ${({ theme }) => theme.rem(30)};
  elevation: 12;
  overflow: visible;
`;

export const CharacterImage = styled.Image`
  width: ${({ theme }) => theme.rem(108)};
  height: ${({ theme }) => theme.rem(108)};
  resize-mode: contain;
`;

export const CodeOwnerRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.rem(10)};
  align-self: stretch;
`;

export const CodeOwnerTexts = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.rem(4)};
`;

export const FriendName = styled.Text`
  color: ${({ theme }) => theme.grayscale.white};
  ${({ theme }) => theme.typography["title3-semibold"]};
`;

export const FriendCodeLabel = styled.Text`
  color: ${({ theme }) => theme.grayscale.gray200};
  ${({ theme }) => theme.typography["title3-medium"]};
`;

export const CodeDisplay = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  align-self: stretch;
  padding-top: ${({ theme }) => theme.rem(8)};
  padding-bottom: ${({ theme }) => theme.rem(8)};
  padding-right: ${({ theme }) => theme.rem(8)};
  padding-left: ${({ theme }) => theme.rem(16)};
  border-radius: ${({ theme }) => theme.rem(20)};
  border-width: 1px;
  border-color: ${({ theme }) => theme.grayscale.gray700};
  background-color: ${({ theme }) => theme.grayscale.black};
  gap: ${({ theme }) => theme.rem(8)};
`;

export const CodeText = styled.Text`
  color: ${({ theme }) => theme.grayscale.gray50};
  ${({ theme }) => theme.typography.b2};
`;

export const CopyButton = styled.TouchableOpacity<{ active?: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-vertical: ${({ theme }) => theme.rem(10)};
  padding-horizontal: ${({ theme }) => theme.rem(14)};
  border-radius: 40px;
  background-color: ${({ theme }) => theme.grayscale.gray800};
  border-width: 1px;
  border-color: ${({ active, theme }) =>
		active ? theme.grayscale.gray500 : "transparent"};
  gap: ${({ theme }) => theme.rem(4)};
`;

export const CopyButtonText = styled.Text<{ active?: boolean }>`
  color: ${({ active, theme }) =>
		active ? theme.grayscale.white : theme.grayscale.gray200};
  ${({ theme }) => theme.typography["title2-medium"]};
`;

export const CopyButtonIcon = styled.View`
  margin-left: 0;
`;

export const InfoText = styled.Text`
  color: ${({ theme }) => theme.grayscale.gray200};
  text-align: center;
  ${({ theme }) => theme.typography.b3};
  align-self: stretch;
`;

export const PromptRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.rem(4)};
  align-self: stretch;
`;

export const PromptQuestion = styled.Text`
  color: ${({ theme }) => theme.grayscale.white};
  ${({ theme }) => theme.typography["title3-semibold"]};
`;

export const PromptAction = styled.Text`
  color: ${({ theme }) => theme.grayscale.gray200};
  ${({ theme }) => theme.typography["title3-medium"]};
`;

export const CodeEntryContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  align-self: stretch;
  padding-vertical: ${({ theme }) => theme.rem(8)};
  padding-right: ${({ theme }) => theme.rem(8)};
  padding-left: ${({ theme }) => theme.rem(16)};
  border-radius: 20px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.grayscale.gray700};
  background-color: ${({ theme }) => theme.grayscale.black};
  gap: ${({ theme }) => theme.rem(8)};
`;

export const CodeEntryButton = styled.TouchableOpacity`
  height: ${({ theme }) => theme.rem(44)};
  padding-vertical: ${({ theme }) => theme.rem(10)};
  padding-horizontal: ${({ theme }) => theme.rem(14)};
  border-radius: 40px;
  background-color: ${({ theme }) => theme.grayscale.gray800};
  align-items: center;
  justify-content: center;
`;

export const CodeEntryButtonText = styled.Text`
  color: ${({ theme }) => theme.grayscale.gray200};
  ${({ theme }) => theme.typography["title2-medium"]};
`;
