import UserIconSvg from "@/shared/assets/icons/user.svg";
import { Image } from "react-native";
import styled from "styled-components/native";

type IconProps = { $size: number };

export const UserIcon = styled(UserIconSvg).attrs<IconProps>(
	({ $size, theme }) => ({
		width: theme.rem($size),
		height: theme.rem($size),
		color: theme.grayscale.gray300,
	}),
)``;

export const AvatarImage = styled(Image)<IconProps>`
	width: ${({ theme, $size }) => theme.rem($size)};
	height: ${({ theme, $size }) => theme.rem($size)};
	resize-mode: cover;
	border-radius: ${({ theme }) => theme.rem(100)};
	overflow: hidden;
`;

export const Background = styled.View<IconProps>`
	width: ${({ theme, $size }) => theme.rem($size)};
	height: ${({ theme, $size }) => theme.rem($size)};
	border-radius: ${({ theme }) => theme.rem(100)};
	align-items: center;
	justify-content: center;
	background-color: ${({ theme }) => theme.grayscale.gray900};
	border-width: 1px;
	border-color: ${({ theme }) => theme.grayscale.gray600};
	overflow: hidden;
`;
