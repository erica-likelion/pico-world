import CheckIconSvg from "@/shared/assets/icons/check.svg";
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
  color: ${({ theme }) => theme.colors.text};
  ${({ theme }) => theme.typography["title2-medium"]};
`;

export const CheckIcon = styled(CheckIconSvg)`
  width: ${({ theme }) => theme.rem(24)};
  height: ${({ theme }) => theme.rem(24)};
  color: ${({ theme }) => theme.grayscale.gray200};
`;
