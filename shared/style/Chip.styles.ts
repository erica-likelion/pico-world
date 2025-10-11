import { CheckIcon as CheckIconComponent } from "@/shared/assets/icons/CheckIcon";
import styled from "styled-components/native";

export const ChipContainer = styled.View<{ selected: boolean }>`
  display: flex;
  padding: ${({ theme }) => theme.rem(10)} ${({ theme }) => theme.rem(14)};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 4px;
  height: ${({ theme }) => theme.rem(44)};
  border-radius: 40px;
  background-color: ${({ theme }) => theme.grayscale.gray800};
  border: ${({ selected, theme }) =>
		selected ? `1px solid ${theme.grayscale.gray500}` : "none"};
`;

export const ChipText = styled.Text`
  color: ${({ theme }) => theme.grayscale.gray200};
  ${({ theme }) => theme.typography["title2-medium"]};
`;

export const CheckIcon = styled(CheckIconComponent).attrs(({ theme }) => ({
	color: theme.grayscale.gray200,
}))`
  width: ${({ theme }) => theme.rem(24)};
  height: ${({ theme }) => theme.rem(24)};
`;
