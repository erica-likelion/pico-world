import styled from "styled-components/native";

export const Container = styled.View`
  padding: 0 ${({ theme }) => theme.rem(12)};
`;

export const EmotionWrapper = styled.View`
  padding: ${({ theme }) => theme.rem(32)} 0;
  gap: ${({ theme }) => theme.rem(16)};
`;

export const PrivacyRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: ${({ theme }) => theme.rem(32)};
`;

export const PrivacyText = styled.Text`
  ${({ theme }) => theme.typography["title2-medium"]};
  color: ${({ theme }) => theme.grayscale.gray300};
`;
