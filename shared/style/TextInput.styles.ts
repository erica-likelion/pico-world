import styled from "styled-components/native";

export const TextInputContainer = styled.TextInput<{ height?: number }>`
  display: flex;
  width: 100%;
  height: ${({ height, theme }) => theme.rem(height || 56)};
  padding: ${({ theme }) => theme.rem(16)};
  align-items: flex-start;
  gap: 10px;
  border-radius: 20px;

  color: ${({ theme }) => theme.grayscale.gray50};
  ${({ theme }) => theme.typography.b2};

  &::placeholder {
    color: ${({ theme }) => theme.grayscale.gray400};
  }
`;
