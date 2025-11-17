import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  flex-grow: 1;
  position: relative;
  padding-top: 0;
  padding-bottom: ${({ theme }) => theme.rem(40)};
`;

export const ProfileRow = styled.View`
  flex-direction: row;
  align-items: center;
  padding-vertical: ${({ theme }) => theme.rem(8)};
  padding-horizontal: ${({ theme }) => theme.rem(16)};
  margin-horizontal: ${({ theme }) => -theme.rem(16)};
  margin-bottom: ${({ theme }) => theme.rem(6)};
  gap: ${({ theme }) => theme.rem(14)};
`;

export const ProfileButtonWrapper = styled.View`
  flex-direction: column;
  align-items: center;
  width: ${({ theme }) => theme.rem(64)};
`;

export const ProfileButtonWrapperPressable = styled.Pressable`
  flex-direction: column;
  align-items: center;
  min-width: ${({ theme }) => theme.rem(64)};
`;

export const ProfileLabel = styled.Text`
  ${({ theme }) => theme.typography["title4-medium"]};
  margin-top: ${({ theme }) => theme.rem(4)};
  color: ${({ theme }) => theme.grayscale.gray50};
  text-align: center;
  align-self: center;
`;

export const ProfileActionButton = styled.View`
  margin-left: 0;
`;

export const ProfileButtonContent = styled.View`
  width: ${({ theme }) => theme.rem(64)};
  height: ${({ theme }) => theme.rem(64)};
  align-items: center;
  justify-content: center;
`;

export const FriendsList = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.rem(14)};
  flex-shrink: 1;
`;

export const Spacing = styled.View`
  padding-horizontal: ${({ theme }) => theme.rem(16)};

  margin-bottom: ${({ theme }) => theme.rem(6)};
  align-self: stretch;
  width: 100%;
`;

export const NotificationSection = styled.View`
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.rem(24)};
  align-self: stretch;
  padding-horizontal: ${({ theme }) => theme.rem(16)};
`;

export const DividerSpacing = styled.View`
  margin-vertical: ${({ theme }) => theme.rem(8)};
  align-self: stretch;
  margin-left: ${({ theme }) => -theme.rem(16)};
  margin-right: ${({ theme }) => -theme.rem(16)};
`;

export const Footer = styled.View`
  padding-top: ${({ theme }) => theme.rem(8)};
  padding-bottom: ${({ theme }) => theme.rem(24)};
  align-items: center;
  width: 100%;
`;

export const FooterText = styled.Text`
  color: ${({ theme }) => theme.grayscale.white};
  ${({ theme }) => theme.typography["title3-medium"]};
  opacity: 0.6;
  text-align: center;
`;

export const FooterButtonWrapper = styled.View`
  margin-top: ${({ theme }) => theme.rem(16)};
`;
