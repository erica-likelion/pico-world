import styled from "styled-components/native";

export const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.grayscale.black};
`;

export const CanvasContainer = styled.View`
	flex: 1;
	position: relative;
`;
