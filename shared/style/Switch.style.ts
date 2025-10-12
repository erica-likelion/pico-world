import styled from "styled-components/native";

interface TrackProps {
	$active?: boolean;
	$disabled?: boolean;
}

interface ThumbProps {
	$disabled?: boolean;
}

export const Track = styled.View<TrackProps>`
  width: ${({ theme }) => theme.rem(52)};
  height: ${({ theme }) => theme.rem(32)};
  display: flex;
  flex-direction: row;
  padding: ${({ theme }) => theme.rem(4)};
  align-items: center;
  justify-content: flex-start;
  border-radius: ${({ theme }) => theme.rem(60)};
  background-color: ${({ theme, $active }) =>
		$active ? theme.colors.happy : theme.grayscale.gray700};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
`;

export const Thumb = styled.View<ThumbProps>`
  width: ${({ theme }) => theme.rem(24)};
  height: ${({ theme }) => theme.rem(24)};
  aspect-ratio: 1;
  border-radius: ${({ theme }) => theme.rem(60)};
  background-color: ${({ theme }) => theme.grayscale.white};
`;
