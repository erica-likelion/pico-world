import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import { ProfileButton } from "../shared/ui/ProfileButton";

const meta: Meta<typeof ProfileButton> = {
	title: "ProfileButton",
	component: ProfileButton,
	decorators: [
		(Story) => (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Story />
			</View>
		),
	],
	argTypes: {
		logged: {
			control: { type: "boolean" },
		},
		imageUrl: {
			control: { type: "select" },
			options: [
				undefined,
				"https://i.pinimg.com/736x/8a/c3/36/8ac336d9394ef01ba7b165816a42f5c5.jpg",
			],
		},
	},
};

export default meta;

type Story = StoryObj<typeof ProfileButton>;

export const Default: Story = {
	args: {
		logged: false,
		imageUrl: undefined,
	},
};

export const AllStates: Story = {
	render: () => (
		<View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
			<ProfileButton
				logged={false}
				imageUrl="https://i.pinimg.com/736x/8a/c3/36/8ac336d9394ef01ba7b165816a42f5c5.jpg"
			/>
			<ProfileButton
				logged={true}
				imageUrl="https://i.pinimg.com/736x/8a/c3/36/8ac336d9394ef01ba7b165816a42f5c5.jpg"
			/>

			<ProfileButton logged={false} />
			<ProfileButton logged={true} />
		</View>
	),
};
