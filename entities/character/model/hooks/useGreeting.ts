import { fetchGreeting } from "@/entities/character/api/greeting";
import { Character } from "@/entities/character/model/character";
import {
	type CharacterName,
	DEFAULT_CHARACTER,
} from "@/entities/character/model/characterMessages";
import { useAuthStore } from "@/shared/store/auth";
import { useQuery } from "@tanstack/react-query";

export function useGreeting(context: string = "friend-invite") {
	const { isLoggedIn } = useAuthStore();
	const { data: greetingData } = useQuery({
		queryKey: ["greeting", context],
		queryFn: () => fetchGreeting({ context }),
		enabled: !!isLoggedIn,
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
