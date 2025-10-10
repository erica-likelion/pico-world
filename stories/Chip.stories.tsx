import type { Meta, StoryObj } from "@storybook/react";
import { Chip } from "../shared/ui/Chip";
import { useState } from "react";
import { View } from "react-native";

const meta: Meta<typeof Chip> = {
	title: "Chip",
	component: Chip,
	decorators: [
		(Story) => (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Story />
			</View>
		),
	],
};

export default meta;

type Story = StoryObj<typeof Chip>;

export const Default: Story = {
	args: {
		text: "Chip",
		selected: false,
	},
};

export const Selected: Story = {
	args: {
		text: "Chip",
		selected: true,
	},
};

export const Interactive: Story = {
	render: (args) => {
		const [selected, setSelected] = useState(false);
		return <Chip {...args} selected={selected} setSelected={setSelected} />;
	},
	args: {
		text: "Interactive Chip",
	},
};
