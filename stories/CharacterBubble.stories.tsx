import { CharacterBubble } from "@/shared/ui/CharacterBubble";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof CharacterBubble> = {
	title: "CharacterBubble",
	component: CharacterBubble,
	parameters: {
		layout: "padded",
	},
	argTypes: {
		character: {
			control: "text",
			description: "캐릭터 이름",
		},
		message: {
			control: "text",
			description: "전할 메시지",
		},
		enableTypewriter: {
			control: "boolean",
			description: "타이핑 효과 활성화",
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		character: "츠츠",
		message: "안녕하세요! 오늘 하루는 어떠셨나요?",
		enableTypewriter: false,
	},
};

export const WithTypewriter: Story = {
	args: {
		character: "츠츠",
		message: "타이핑 효과 여부를 설정할 수 있습니다",
		enableTypewriter: true,
	},
};
