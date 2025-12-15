import { axiosInstance } from "@/shared/api/axios";

export interface CharacterMessageResponse {
	character_name: string;
	message: string;
}

export async function getCharacterMessage(): Promise<CharacterMessageResponse> {
	const response = await axiosInstance.post<CharacterMessageResponse>(
		"/api/v1/emotion/report/character-message",
	);
	return response.data;
}
