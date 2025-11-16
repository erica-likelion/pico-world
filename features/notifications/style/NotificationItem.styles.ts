import styled from "styled-components/native";

export const ItemContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.rem(8)};
  align-self: stretch;
`;

export const ItemTitle = styled.Text`
  color: ${({ theme }) => theme.colors.happy};
  ${({ theme }) => theme.typography["title4-bold"]};
  padding: ${({ theme }) => theme.rem(0)} ${({ theme }) => theme.rem(16)};
`;

export const ItemBox = styled.View`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.rem(0)} ${({ theme }) => theme.rem(16)};
`;

export const ItemMessage = styled.Text`
  color: ${({ theme }) => theme.grayscale.white};
  ${({ theme }) => theme.typography["title2-medium"]};
`;

export const Time = styled.Text`
  color: ${({ theme }) => theme.grayscale.gray400};
  ${({ theme }) => theme.typography["title4-medium"]};
`;

export const Line = styled.View`
  align-self: stretch;
  height: 2px;
  margin-top: ${({ theme }) => theme.rem(24)};
  background-color: ${({ theme }) => theme.grayscale.gray800};
`;
