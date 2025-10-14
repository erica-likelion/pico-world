import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { View, Text } from "react-native";

const BottomNavPlaceholder = () => (
	<View
		style={{
			width: "100%",
			height: 90,
			backgroundColor: "#000",
			borderTopWidth: 1,
			borderTopColor: "#444",
			padding: 12,
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
		}}
	>
		{["홈", "기록", "친구", "리포트", "마이"].map((label, index) => (
			<View
				key={label}
				style={{
					alignItems: "center",
					gap: 4,
				}}
			>
				<View
					style={{
						width: 24,
						height: 24,
						backgroundColor: "#666",
						borderRadius: 4,
					}}
				/>
				<Text
					style={{
						color: index === 0 ? "#fff" : "#999",
						fontSize: 12,
						fontWeight: "500",
					}}
				>
					{label}
				</Text>
			</View>
		))}
	</View>
);

const meta: Meta = {
	title: "BottomNavBar",
	component: BottomNavPlaceholder,
	decorators: [
		(Story) => (
			<View
				style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}
			>
				<Story />
			</View>
		),
	],
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const Note: Story = {
	render: () => (
		<View style={{ padding: 20, backgroundColor: "#111", flex: 1 }}>
			<Text style={{ color: "#999", fontSize: 14, marginBottom: 20 }}>
				스토리북에서는 SVG transformer 이슈로 플레이스홀더를 보여줍니다.
				{"\n\n"}
				실제 컴포넌트 확인: widgets/BottomNav/ui/BottomNav.tsx
			</Text>
			<View style={{ flex: 1 }} />
			<BottomNavPlaceholder />
		</View>
	),
};
