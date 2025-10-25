import styled from "styled-components/native";

export const Container = styled.View`
  display: flex;
  width: 100%;
  padding: ${({ theme }) =>
		`${theme.rem(13)} ${theme.rem(24)} ${theme.rem(0)} ${theme.rem(24)}`};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.grayscale.gray600};
  background-color: ${({ theme }) => theme.grayscale.black};
`;

export const NavItem = styled.View`
  display: flex;
  width: ${({ theme }) => theme.rem(48)};
  padding: ${({ theme }) => theme.rem(4)};
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.rem(4)};
`;

export const IconContainer = styled.View`
  width: ${({ theme }) => theme.rem(24)};
  height: ${({ theme }) => theme.rem(24)};
  align-items: center;
  justify-content: center;
`;

interface LabelProps {
	$active?: boolean;
}

export const Label = styled.Text<LabelProps>`
  color: ${({ theme, $active }) =>
		$active ? theme.grayscale.white : theme.grayscale.gray300};
  font-family: Pretendard;
  font-size: ${({ theme }) => theme.rem(12)};
  font-style: normal;
  font-weight: 500;
  line-height: ${({ theme }) => theme.rem(16)};
  letter-spacing: ${({ theme }) => theme.rem(-0.24)};
  text-align: center;
`;
