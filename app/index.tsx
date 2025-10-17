import { Link } from "expo-router";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  ${({ theme }) => theme.typography.h3};
  color: ${({ theme }) => theme.colors.text};
`;

export default function Home() {
	return (
		<Container>
			<Title>Hello Expo Router 👋</Title>
			<Link href="/login" style={{ color: "blue" }}>
				Go to Logindd
			</Link>
			<Link href="/explore" style={{ color: "blue" }}>
				Go to Explore
			</Link>
		</Container>
	);
}
