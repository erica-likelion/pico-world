import styled from "styled-components/native";

export const Container = styled.View`
  padding-horizontal: ${({ theme }) => theme.rem(16)};
  padding-vertical: ${({ theme }) => theme.rem(16)};
  flex-direction: column;
  align-items: flex-end;
  align-self: stretch;
`;

export const Header = styled.View`
  flex-direction: row;
  padding-bottom: ${({ theme }) => theme.rem(6)};
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  margin-bottom: ${({ theme }) => theme.rem(6)};
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
  column-gap: ${({ theme }) => theme.rem(10)};
`;

export const Name = styled.Text`
  color: ${({ theme }) => theme.grayscale.gray200};
  ${({ theme }) => theme.typography["title3-semibold"]};
`;

export const DateText = styled.Text`
  color: ${({ theme }) => theme.grayscale.gray500};
  ${({ theme }) => theme.typography["title3-semibold"]};
`;

export const EmotionBadge = styled.View`
  padding-vertical: ${({ theme }) => theme.rem(8)};
  padding-horizontal: ${({ theme }) => theme.rem(12)};
  justify-content: center;
  align-items: center;
  border-radius: 60px;
  background-color: ${({ theme }) => theme.grayscale.gray700};
`;

export const EmotionBadgeText = styled.Text`
  color: #ffffff;
  text-align: center;
  ${({ theme }) => theme.typography["title4-semibold"]};
`;

export const Body = styled.View<{ borderOffset: number }>`
  padding-top: ${({ theme }) => theme.rem(10)};
  padding-bottom: ${({ theme }) => theme.rem(10)};
  padding-left: ${({ theme }) => theme.rem(28)};
  padding-right: 0;
  margin-left: ${({ borderOffset }) => borderOffset}px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-left-width: 2px;
  border-left-color: ${({ theme }) => theme.grayscale.gray600};
`;

export const BodyText = styled.Text`
  width: ${({ theme }) => theme.rem(297)};
  color: ${({ theme }) => theme.grayscale.gray50};
  ${({ theme }) => theme.typography.b2};
`;
