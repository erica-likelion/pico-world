import type { Preview } from "@storybook/react-native-web-vite";
import { ThemeProvider } from "styled-components/native";
import { theme } from "../shared/config/theme/theme";

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	decorators: [
		(Story) => (
			<ThemeProvider theme={theme}>
				<Story />
			</ThemeProvider>
		),
	],
};

export default preview;
