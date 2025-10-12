import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { fn } from "storybook/test";
import { IconButton } from "../shared/ui/IconButton";

const BellIcon = () => (
	<Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
		<Path
			d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"
			stroke="white"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</Svg>
);

const meta: Meta<typeof IconButton> = {
	title: "IconButton",
	component: IconButton,
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
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const AllVariants: Story = {
	render: () => (
		<View style={{ flexDirection: "column", gap: 16, alignItems: "center" }}>
			<View style={{ flexDirection: "row", gap: 16 }}>
				<IconButton size="large" icon={<BellIcon />} color="default" />
				<IconButton size="medium" icon={<BellIcon />} color="default" />
			</View>
			<View style={{ flexDirection: "row", gap: 16 }}>
				<IconButton size="large" icon={<BellIcon />} color="happy" />
				<IconButton size="medium" icon={<BellIcon />} color="happy" />
			</View>
		</View>
	),
};
