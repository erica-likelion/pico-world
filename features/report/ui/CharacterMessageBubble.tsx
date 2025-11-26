import type { CharacterName } from "@/entities/character/model/characterMessages";
import { getCharacterMessage } from "@/features/report/api/GetCharacterMessage";
import { MyCharacter } from "@/shared/store/myCharacter";
import { CharacterBubble } from "@/shared/ui/CharacterBubble";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const CharacterMessageBubble: React.FC = () => {
	const { name } = MyCharacter();

	const {
		data: characterMessageData,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["report", "characterMessage"],
		queryFn: async () => {
			const response = await getCharacterMessage();
			return response.data;
		},
	});

	const characterName = useMemo<CharacterName>(() => {
		if (characterMessageData?.character_name) {
			return characterMessageData.character_name as CharacterName;
		}
		return (name as CharacterName) ?? "츠츠";
	}, [characterMessageData?.character_name, name]);

	const message = useMemo<string>(() => {
		if (isLoading) {
			return "...";
		}
		if (error) {
			return "생각하는 중...";
		}
		return characterMessageData?.message ?? "생각하는 중...";
	}, [characterMessageData?.message, isLoading, error]);

	return <CharacterBubble character={characterName} message={message} />;
};
