import {
	selectCharacter,
	updateUserCharacter,
} from "@/entities/character/api/select";
import { Character } from "@/entities/character/model/character";
import type { CharacterProps } from "@/entities/character/model/type";
import { MyCharacter } from "@/entities/character/store/myCharacter";
import { useInvalidateUserInfo } from "@/entities/user/model/userQueries";
import { useAuthStore } from "@/shared/store/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";

export function useCharacterSelection(selectedCharacter: CharacterProps) {
	const router = useRouter();
	const { setName } = MyCharacter();
	const { setIsOnboarding } = useAuthStore();
	const invalidateUserInfo = useInvalidateUserInfo();

	const characterId =
		Character.findIndex((char) => char.name === selectedCharacter.name) + 1;

	const { mutate: selectMutate } = useMutation({
		mutationFn: () => selectCharacter(characterId),
		onSuccess: async () => {
			setName(selectedCharacter.name);
			setIsOnboarding(false);
			await AsyncStorage.removeItem("isOnboardingNeeded");
			router.push("/home");
		},
		onError: (error) => {
			console.log(error);
		},
	});

	const { mutate: updateMutate } = useMutation({
		mutationFn: () => updateUserCharacter(characterId),
		onSuccess: () => {
			invalidateUserInfo();
			setName(selectedCharacter.name);
			router.replace("/my?characterUpdated=true");
		},
	});

	return {
		selectCharacter: selectMutate,
		updateCharacter: updateMutate,
	};
}
