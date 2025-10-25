import styled from "styled-components/native";

export const TitleBox = styled.View`
  display: flex;
  height: ${({ theme }) => theme.rem(24)};
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.rem(6)};
`;

export const TitleText = styled.Text`
  color: ${({ theme }) => theme.grayscale.gray200};
  ${({ theme }) => theme.typography["title3-medium"]};
`;
