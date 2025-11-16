import { theme } from "@/shared/config/theme/theme";
import styled from "styled-components/native";

export const TabContainer = styled.View`
  flex-direction: row;
  background-color: ${theme.grayscale.black};
  margin-bottom: ${({ theme }) => theme.rem(24)};
`;

export const TabButton = styled.TouchableOpacity<{ active: boolean }>`
  flex: 1;
  align-items: center;
  padding: 12px 0;
  border-bottom-width: 2px;
  border-bottom-color: ${({ active }) =>
		active ? theme.grayscale.white : "transparent"};
`;

export const TabLabel = styled.Text<{ active: boolean }>`
  font-family: "Pretendard-Bold";
  font-size: 16px;
  line-height: 20px;
  color: ${({ active }) =>
		active ? theme.grayscale.white : theme.grayscale.gray400};
`;
