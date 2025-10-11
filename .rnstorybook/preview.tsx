import type { Preview } from "@storybook/react";
import { ThemeProvider } from "styled-components/native";
import { theme } from "../shared/config/theme/theme";
import React from "react";

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
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
