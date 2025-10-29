import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  padding-top: ${({ theme }) => theme.rem(151)};
  padding-left: ${({ theme }) => theme.rem(16)};
  padding-right: ${({ theme }) => theme.rem(16)};
  gap: ${({ theme }) => theme.rem(32)};
`;

export const Title = styled.Text`
  ${({ theme }) => theme.typography.h4};
  color: ${({ theme }) => theme.grayscale.white};
`;
