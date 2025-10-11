import styled from "styled-components/native";

export const Container = styled.View`
    width: ${({ theme }) => theme.rem(343)};
    height: ${({ theme }) => theme.rem(62)};
    gap: ${({ theme }) => theme.rem(9)};
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

export const TextButtonWrapper = styled.View`
	width: ${({ theme }) => theme.rem(272)};
`;

export const IconButtonWrapper = styled.View`
	flex: 1;
`;

export const TextButton = styled.View<{
	$disabled: boolean;
	$pressed: boolean;
}>`
	width: 100%;
	height: 100%;
	background-color: ${({ theme, $disabled, $pressed }) =>
		$disabled || !$pressed ? theme.grayscale.gray800 : theme.grayscale.gray700};
	border-top-left-radius: ${({ theme }) => theme.rem(60)};
	border-top-right-radius: ${({ theme }) => theme.rem(10)};
	border-bottom-right-radius: ${({ theme }) => theme.rem(10)};
	border-bottom-left-radius: ${({ theme }) => theme.rem(60)};
	justify-content: center;
	align-items: center;
`;

export const Text = styled.Text<{ $disabled: boolean }>`
	${({ theme }) => theme.typography["title2-bold"]};
	color: ${({ theme, $disabled }) =>
		$disabled ? theme.grayscale.gray600 : theme.grayscale.white};
`;

export const IconButton = styled.View<{
	$disabled: boolean;
	$pressed: boolean;
}>`
	width: 100%;
	height: 100%;
	background-color: ${({ theme, $disabled, $pressed }) =>
		$disabled || !$pressed ? theme.grayscale.gray800 : theme.grayscale.gray700};
	border-top-left-radius: ${({ theme }) => theme.rem(10)};
	border-top-right-radius: ${({ theme }) => theme.rem(60)};
	border-bottom-right-radius: ${({ theme }) => theme.rem(60)};
	border-bottom-left-radius: ${({ theme }) => theme.rem(10)};
	justify-content: center;
	align-items: center;
`;
