import { Character } from "@/entities/character/model/character";
import {
	type CharacterName,
	DEFAULT_CHARACTER,
} from "@/entities/character/model/characterMessages";
import { getGreeting } from "@/features/friends/api/getGreeting";
import { useQuery } from "@tanstack/react-query";

export function useGreeting(context: string = "friend-invite") {
	const { data: greetingData } = useQuery({
		queryKey: ["greeting", context],
		queryFn: () => getGreeting(context),
	});

	const characterName: CharacterName =
		(greetingData?.characterName as CharacterName) || DEFAULT_CHARACTER;
	const character =
		Character.find((char) => char.name === characterName) || Character[0];

	return {
		message: greetingData?.message || "친구랑 같이 열심히 기록해봐.",
		character,
	};
}
