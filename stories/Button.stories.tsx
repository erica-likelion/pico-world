import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import { fn } from "storybook/test";
import { Button } from "../shared/ui/Button";

const meta: Meta<typeof Button> = {
	title: "Button",
	component: Button,
	decorators: [
		(Story) => (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Story />
			</View>
		),
	],
	args: {
		onPress: fn(),
	},
	argTypes: {
		disabled: {
			control: { type: "boolean" },
			description: "버튼 비활성화 여부",
		},
		size: {
			control: { type: "select" },
			options: ["large", "medium", "small"],
			description: "버튼 크기",
		},
		color: {
			control: { type: "select" },
			options: ["white", "gray", "black"],
			description: "버튼 색상",
		},
		text: {
			control: { type: "text" },
			description: "버튼 텍스트",
		},
	},
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
	args: {
		text: "버튼",
		size: "large",
		color: "white",
		disabled: false,
	},
};

export const AllVariants: Story = {
	render: () => (
		<View
			style={{
				flexDirection: "column",
				gap: 12,
				alignItems: "center",
				padding: 20,
			}}
		>
			<View style={{ flexDirection: "row", gap: 12 }}>
				<Button text="Large" size="large" color="white" />
				<Button text="Medium" size="medium" color="white" />
				<Button text="Small" size="small" color="white" />
			</View>
			<View style={{ flexDirection: "row", gap: 12 }}>
				<Button text="Large" size="large" color="gray" />
				<Button text="Medium" size="medium" color="gray" />
				<Button text="Small" size="small" color="gray" />
			</View>
			<View style={{ flexDirection: "row", gap: 12 }}>
				<Button text="Large" size="large" color="black" />
				<Button text="Medium" size="medium" color="black" />
				<Button text="Small" size="small" color="black" />
			</View>
			<View style={{ flexDirection: "row", gap: 12 }}>
				<Button text="Disabled" size="large" color="white" disabled />
				<Button text="Disabled" size="medium" color="gray" disabled />
				<Button text="Disabled" size="small" color="black" disabled />
			</View>
		</View>
	),
};
