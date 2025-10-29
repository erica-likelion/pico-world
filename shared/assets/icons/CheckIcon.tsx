import type React from "react";
import { Path, Svg } from "react-native-svg";

interface CheckIconProps {
	width?: number;
	height?: number;
	color?: string;
}

export const CheckIcon: React.FC<CheckIconProps> = ({
	width = 24,
	height = 24,
	color = "currentColor",
}) => {
	return (
		<Svg viewBox="0 0 24 24" width={width} height={height} fill="none">
			<Path
				d="M18.0195 7.04991C18.41 6.65938 19.043 6.65956 19.4336 7.04991C19.8241 7.44032 19.8249 8.07338 19.4346 8.46397L10.9502 16.9503C10.7627 17.1377 10.5083 17.2432 10.2432 17.2433C9.97805 17.2433 9.72367 17.1377 9.53614 16.9503L5.29297 12.7071C4.90248 12.3166 4.90253 11.6836 5.29297 11.2931C5.6835 10.9025 6.31651 10.9025 6.70704 11.2931L10.2422 14.8282L18.0195 7.04991Z"
				fill={color}
			/>
		</Svg>
	);
};
