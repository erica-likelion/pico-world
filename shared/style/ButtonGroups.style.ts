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
  border-top-left-radius: 60px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 60px;
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
  border-top-left-radius: 10px;
  border-top-right-radius: 60px;
  border-bottom-right-radius: 60px;
  border-bottom-left-radius: 10px;
  justify-content: center;
  align-items: center;
`;
