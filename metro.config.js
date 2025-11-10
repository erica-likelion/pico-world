// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.transformer = {
	...config.transformer,
	babelTransformerPath: require.resolve("react-native-svg-transformer"),
};

config.resolver = {
	...config.resolver,
	assetExts: config.resolver.assetExts.filter((ext) => ext !== "svg"),
	sourceExts: [...config.resolver.sourceExts, "svg"],
};

// Storybook은 개발 환경에서만 활성화
if (process.env.NODE_ENV !== "production") {
	try {
		const withStorybook = require("@storybook/react-native/metro/withStorybook");
		module.exports = withStorybook(config);
	} catch (_error) {
		console.warn("Storybook not available, using default config");
		module.exports = config;
	}
} else {
	module.exports = config;
}

const {
	wrapWithReanimatedMetroConfig,
} = require("react-native-reanimated/metro-config");

module.exports = wrapWithReanimatedMetroConfig(config);
