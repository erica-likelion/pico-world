import styled from "styled-components/native";

export const Text = styled.Text`
  color: ${({ theme }) => theme.grayscale.white};
  ${({ theme }) => theme.typography["title2-semibold"]};
`;

export const MenuHeader = styled.View`
  padding: ${({ theme }) => theme.rem(24)} ${({ theme }) => theme.rem(16)};
`;

export const MenuItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.rem(8)};
  padding: ${({ theme }) => theme.rem(24)} ${({ theme }) => theme.rem(16)};
`;
