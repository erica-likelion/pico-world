import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import { Avatar } from "../shared/ui/Avatar";

const meta: Meta<typeof Avatar> = {
	title: "Avatar",
	component: Avatar,
	decorators: [
		(Story) => (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Story />
			</View>
		),
	],
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const AllSizes: Story = {
	render: () => (
		<View style={{ flexDirection: "column", gap: 16 }}>
			<View
				style={{
					flexDirection: "row",
					gap: 16,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Avatar
					imageUrl="https://i.pinimg.com/736x/8a/c3/36/8ac336d9394ef01ba7b165816a42f5c5.jpg"
					size="large"
				/>
				<Avatar
					imageUrl="https://i.pinimg.com/736x/8a/c3/36/8ac336d9394ef01ba7b165816a42f5c5.jpg"
					size="medium"
				/>
				<Avatar
					imageUrl="https://i.pinimg.com/736x/8a/c3/36/8ac336d9394ef01ba7b165816a42f5c5.jpg"
					size="small"
				/>
				<Avatar
					imageUrl="https://i.pinimg.com/736x/8a/c3/36/8ac336d9394ef01ba7b165816a42f5c5.jpg"
					size="xsSmall"
				/>
				<Avatar
					imageUrl="https://i.pinimg.com/736x/8a/c3/36/8ac336d9394ef01ba7b165816a42f5c5.jpg"
					size="xxsSmall"
				/>
			</View>

			<View
				style={{
					flexDirection: "row",
					gap: 16,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Avatar size="large" />
				<Avatar size="medium" />
				<Avatar size="small" />
				<Avatar size="xsSmall" />
				<Avatar size="xxsSmall" />
			</View>
		</View>
	),
};
