module.exports = (api) => {
	api.cache(true);
	return {
		presets: ["babel-preset-expo"],
		plugins: [
			[
				"module-resolver",
				{
					root: ["./"],
					alias: {
						"@": "./",
					},
				},
			],
			"babel-plugin-styled-components",
			"react-native-reanimated/plugin",
		],
	};
};
