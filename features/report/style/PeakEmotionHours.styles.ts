import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  padding: ${({ theme }) => theme.rem(20)};
  background: rgba(32, 32, 32, 0.6);
  border-radius: 40px;
  backdrop-filter: blur(17.5px);
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: ${({ theme }) => theme.rem(16)};
  display: inline-flex;
  margin-top: ${({ theme }) => theme.rem(16)};
`;

export const TopWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.Text`
  ${({ theme }) => theme.typography["title3-semibold"]};
  color: ${({ theme }) => theme.grayscale.gray200};
`;

export const Description = styled.Text`
  ${({ theme }) => theme.typography["title2-medium"]};
  color: ${({ theme }) => theme.grayscale.white};
`;
