import { Character } from "@/entities/character/model/character";
import type { CharacterName } from "@/entities/character/model/characterMessages";

export function getCharacterImage(
	characterName: CharacterName,
	defaultCharacterName: CharacterName = "츠츠",
) {
	const defaultCharacter = Character.find(
		(c) => c.name === defaultCharacterName,
	);

	const foundCharacter = Character.find((c) => c.name === characterName);
	return foundCharacter?.image ?? defaultCharacter?.image;
}
