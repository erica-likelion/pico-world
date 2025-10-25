import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import { PlusButton } from "@/shared/ui/PlusButton";

const meta: Meta<typeof PlusButton> = {
	title: "shared/PlusButton",
	component: PlusButton,
	decorators: [
		(Story) => (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Story />
			</View>
		),
	],
};

export default meta;

type Story = StoryObj<typeof PlusButton>;

export const Default: Story = {
	args: {},
};
