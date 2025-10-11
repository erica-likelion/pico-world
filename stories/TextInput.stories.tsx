import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import { TextInput } from "../shared/ui/TextInput";

const meta: Meta<typeof TextInput> = {
	title: "TextInput",
	component: TextInput,
	decorators: [
		(Story) => (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					padding: 20,
				}}
			>
				<Story />
			</View>
		),
	],
};

export default meta;

type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
	args: {
		placeholder: "Enter your text here",
	},
};

export const Multiline: Story = {
	args: {
		placeholder: "Enter your multiline text here",
		multiline: true,
		height: 120,
	},
};
