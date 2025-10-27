import { ScrollView } from "react-native";
import styled from "styled-components/native";

export const Footer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  align-items: center;
  padding-left: ${({ theme }) => theme.rem(12)};
  padding-right: ${({ theme }) => theme.rem(12)};
  z-index: 100;
`;

export const FooterContent = styled.View`
  width: 100%;
  align-items: center;
`;

export const ChipsScrollView = styled(ScrollView).attrs({
	horizontal: true,
	showsHorizontalScrollIndicator: false,
	contentContainerStyle: {
		alignItems: "center",
		justifyContent: "center",
		flexGrow: 1,
		gap: 10,
	},
})``;

export const NextButton = styled.View`
  margin-top: ${({ theme }) => theme.rem(24)};
  align-items: center;
`;
