import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import { Divider } from "../shared/ui/Divider";

const meta: Meta<typeof Divider> = {
	title: "Divider",
	component: Divider,
	decorators: [
		(Story) => (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Story />
			</View>
		),
	],
};

export default meta;

type Story = StoryObj<typeof Divider>;

export const Default: Story = {};
