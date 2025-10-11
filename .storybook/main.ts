import type { StorybookConfig } from "@storybook/react-native-web-vite";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
	stories: [
		"../stories/**/*.mdx",
		"../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
	],
	addons: ["@storybook/addon-docs"],
	framework: {
		name: "@storybook/react-native-web-vite",
		options: {},
	},

	// ✅ 여기서 Vite 설정을 수정할 수 있음
	viteFinal: async (config) => {
		return mergeConfig(config, {
			resolve: {
				alias: {
					// ✅ Node 버전 debug 대신 브라우저 버전 사용
					"debug/src/node": "debug/src/browser",
				},
			},
			define: {
				// ✅ process나 global 같은 Node 전역 객체 참조 방지
				"process.env": {},
				global: "globalThis",
			},
		});
	},
};

export default config;
