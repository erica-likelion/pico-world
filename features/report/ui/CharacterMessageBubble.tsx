import type { CharacterName } from "@/entities/character/model/characterMessages";
import { getCharacterMessage } from "@/features/report/api/GetCharacterMessage";
import { CharacterBubble } from "@/shared/ui/CharacterBubble";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const CharacterMessageBubble: React.FC = () => {
	const [characterName, setCharacterName] = useState<CharacterName>("츠츠");
	const [message, setMessage] = useState<string>("...");

	const characterMessageMutation = useMutation({
		mutationFn: getCharacterMessage,
		onSuccess: (response) => {
			const payload = response.data;

			if (payload?.character_name) {
				setCharacterName(payload.character_name as CharacterName);
			} else {
				setCharacterName("츠츠");
			}

			setMessage(payload?.message ?? "생각하는 중...");
		},
		onError: (error) => {
			console.error(error);
			setCharacterName("츠츠");
			setMessage("생각하는 중...");
		},
	});

	useEffect(() => {
		characterMessageMutation.mutate();
	}, [characterMessageMutation.mutate]);

	return <CharacterBubble character={characterName} message={message} />;
};
