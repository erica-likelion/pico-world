import styled from "styled-components/native";

export const MyPageSelectContainer = styled.View`
  width: 100%;
  padding: ${({ theme }) => theme.rem(0)} ${({ theme }) => theme.rem(16)}
    ${({ theme }) => theme.rem(203)} ${({ theme }) => theme.rem(16)};
  flex-direction: column;
  align-items: center;
`;

export const MyPageSelectWrapper = styled.View`
  padding: ${({ theme }) => theme.rem(16)} 0;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.rem(24)};
`;

export const UserImageNameBox = styled.View`
  display: flex;
  flex-direction: row;
  width: ${({ theme }) => theme.rem(343)};
  align-items: center;
  gap: ${({ theme }) => theme.rem(16)};
`;

export const UserName = styled.Text`
  ${({ theme }) => theme.typography["title1-semibold"]};
  color: ${({ theme }) => theme.grayscale.gray50};
`;

export const TextBox = styled.TouchableOpacity`
  display: flex;
  width: ${({ theme }) => theme.rem(343)};
`;

export const Text = styled.Text`
  ${({ theme }) => theme.typography["title2-medium"]};
  color: ${({ theme }) => theme.grayscale.white};
`;
