import styled from "styled-components/native";

export const PermissionGuideContainer = styled.View`
	justify-content: start;
	align-items: start;
	padding: ${({ theme }) => theme.rem(24)} ${({ theme }) => theme.rem(16)};
`;

export const ButtonContainer = styled.View`
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
`;

export const Title = styled.Text`
	color: ${({ theme }) => theme.grayscale.white};
	${({ theme }) => theme.typography["title3-semibold"]};
	margin-bottom: ${({ theme }) => theme.rem(8)};
`;

export const Description = styled.Text`
	color: ${({ theme }) => theme.grayscale.gray400};
	${({ theme }) => theme.typography["title4-medium"]};
	margin-bottom: ${({ theme }) => theme.rem(16)};
`;
