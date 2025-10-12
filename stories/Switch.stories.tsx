import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import { fn } from "storybook/test";
import { Switch } from "../shared/ui/Switch";

const meta: Meta<typeof Switch> = {
	title: "Switch",
	component: Switch,
	decorators: [
		(Story) => (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: "#000",
				}}
			>
				<Story />
			</View>
		),
	],
	args: {
		onValueChange: fn(),
	},
	argTypes: {
		value: {
			control: { type: "boolean" },
			description: "스위치 활성화 상태",
		},
		disabled: {
			control: { type: "boolean" },
			description: "스위치 비활성화 상태",
		},
	},
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
	render: () => <Switch />,
};

export const Active: Story = {
	render: () => <Switch defaultValue={true} />,
};

export const Disabled: Story = {
	render: () => <Switch disabled />,
};

export const DisabledActive: Story = {
	render: () => <Switch defaultValue={true} disabled />,
};
