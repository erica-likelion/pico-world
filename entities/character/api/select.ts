import { axiosInstance } from "@/shared/api/axios";

export const selectCharacter = async (characterId: number) => {
	await axiosInstance.post("/api/v1/characters/select", {
		characterId,
	});
};

export const updateUserCharacter = async (characterId: number) => {
	await axiosInstance.put("/api/v1/users/me/character", {
		characterId,
	});
};
