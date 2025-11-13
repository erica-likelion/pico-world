import { axiosInstance } from "@/shared/api/axios";

interface CharacterMessageResponse {
	character_name: string;
	message: string;
}

export async function getCharacterMessage() {
	return axiosInstance.post<CharacterMessageResponse>(
		"/api/v1/emotion/report/character-message",
	);
}
