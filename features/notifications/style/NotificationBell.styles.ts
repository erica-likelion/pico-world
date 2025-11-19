import styled from "styled-components/native";

export const Container = styled.View`
  position: relative;
`;

export const BadgeContainer = styled.View`
  position: absolute;
  right: -6px;
  top: -6px;
  background-color: ${({ theme }) => theme.colors.happy};
  border-radius: 12px;
  min-width: 20px;
  height: 20px;
  justify-content: center;
  align-items: center;
  padding: 2px;
`;

export const BadgeText = styled.Text`
  color: white;
  font-size: 12px;
  font-weight: bold;
`;
