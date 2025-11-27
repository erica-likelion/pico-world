import styled from "styled-components/native";

interface ContainerProps {
	$showBorder?: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: ${({ theme }) => theme.rem(44)};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `0 ${theme.rem(16)}`};
  gap: ${({ theme }) => theme.rem(17)};
`;

export const LeftSection = styled.View`
  width: ${({ theme }) => theme.rem(24)};
  align-items: flex-start;
  justify-content: center;
`;

export const CenterSection = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `0 ${theme.rem(17)}`};
`;

export const RightSection = styled.View`
  width: ${({ theme }) => theme.rem(24)};
  align-items: flex-end;
  justify-content: center;
`;

export const IconContainer = styled.View`
  width: ${({ theme }) => theme.rem(24)};
  height: ${({ theme }) => theme.rem(24)};
  align-items: center;
  justify-content: center;
`;

interface TitleProps {
	$hasLeftIcon?: boolean;
}

export const Title = styled.Text<TitleProps>`
  color: ${({ theme }) => theme.grayscale.white};
  ${({ theme, $hasLeftIcon }) =>
		$hasLeftIcon ? theme.typography["title2-semibold"] : theme.typography.h4};
  ${({ $hasLeftIcon, theme }) =>
		$hasLeftIcon
			? `
    width: ${theme.rem(200)};
    text-align: center;
  `
			: `
    flex: 1;
  `}
`;
