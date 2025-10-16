import { Circle, LoginBackground, LoginButton } from "@/features/login/ui";
import { useBottomNavStore } from "@/widgets/BottomNav";
import { useEffect } from "react";
import styled from "styled-components/native";

const Container = styled.View`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: ${({ theme }) => theme.rem(101)};
  padding-left: ${({ theme }) => theme.rem(16)};
  padding-right: ${({ theme }) => theme.rem(16)};
`;

export default function Login() {
	const { show, hide } = useBottomNavStore();

	useEffect(() => {
		hide();
		return () => {
			show();
		};
	}, [hide, show]);
	return (
		<Container>
			<LoginBackground />
			<Circle />
			<LoginButton />
		</Container>
	);
}
