import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { View } from "react-native";
import { BottomNav } from "@/widgets/BottomNav";

const meta: Meta<typeof BottomNav> = {
	title: "BottomNavBar",
	component: BottomNav,
	decorators: [
		(Story) => (
			<View
				style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}
			>
				<Story />
			</View>
		),
	],
	argTypes: {
		activeIndex: {
			control: { type: "number", min: 0, max: 4 },
			description: "활성화된 탭 인덱스",
		},
	},
};

export default meta;

type Story = StoryObj<typeof BottomNav>;

export const Default: Story = {
	args: {
		activeIndex: 0,
	},
};

export const Interactive: Story = {
	render: () => {
		const [activeIndex, setActiveIndex] = useState(0);
		return (
			<BottomNav activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
		);
	},
};
