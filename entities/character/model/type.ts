import type { ImageSourcePropType } from "react-native";

export interface CharacterProps {
	name: string;
	speech: string;
	personality: string[];
	image: ImageSourcePropType;
	boxShadow: string;
}
