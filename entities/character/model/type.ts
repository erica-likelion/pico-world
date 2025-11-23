import type { CharacterName } from "./characterMessages";

export interface CharacterProps {
	id?: number;
	name: CharacterName;
	speech: string;
	personality: string[];
	image: number;
	boxShadow: string;
}
