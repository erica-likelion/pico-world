import styled from "styled-components/native";

export const DividerContainer = styled.View<{ size: "small" | "large" }>`
  display: flex;
  width: 100%;
  height: ${({ theme, size }) =>
		size === "small" ? theme.rem(2) : theme.rem(6)};
  background-color: ${({ theme }) => theme.grayscale.gray800};
`;
