import { UserIcon as UserIconComponent } from "@/shared/assets/icons/UserIcon";
import { Image } from "react-native";
import styled from "styled-components/native";

export const UserIcon = styled(UserIconComponent).attrs(({ theme }) => ({
	width: theme.rem(48),
	height: theme.rem(48),
	color: theme.grayscale.white,
}))``;

export const ProfileImage = styled(Image).attrs({
	resizeMode: "cover",
})`
  width: 100%;
  height: 100%;
  border-radius: 999px;
`;

export const Container = styled.View`
  width: ${({ theme }) => theme.rem(64)};
  height: ${({ theme }) => theme.rem(64)};
  border-radius: 999px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.grayscale.gray900};
`;

export const Background = styled.View<{ $logged: boolean }>`
  position: relative;
  width: ${({ theme }) => theme.rem(64)};
  height: ${({ theme }) => theme.rem(64)};
  border-radius: 999px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.grayscale.gray900};
  border-width: ${({ theme, $logged }) =>
		$logged ? theme.rem(2) : theme.rem(1)};
  border-color: ${({ theme, $logged }) =>
		$logged ? theme.grayscale.gray900 : theme.grayscale.gray600};
`;

export const OuterBorder = styled.View`
  position: absolute;
  width: ${({ theme }) => theme.rem(66)};
  height: ${({ theme }) => theme.rem(66)};
  border-radius: 999px;
  border-width: ${({ theme }) => theme.rem(2)};
  border-color: ${({ theme }) => theme.colors.happy};
  pointer-events: none;
`;

export const Guard = styled.View`
  width: ${({ theme }) => theme.rem(64)};
  height: ${({ theme }) => theme.rem(64)};
  border-radius: 999px;
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

export const Text = styled.Text`
  ${({ theme }) => theme.typography["title4-bold"]};
  color: ${({ theme }) => theme.grayscale.white};
`;
