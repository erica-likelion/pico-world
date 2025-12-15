import { Character } from "@/entities/character/model/character";
import type { CharacterProps } from "@/entities/character/model/type";
import { CharacterInfo } from "@/entities/character/ui";
import { useCharacterSelection } from "@/features/onboarding/model/hooks/useCharacterSelection";
import { useHideBottomNav } from "@/shared/hooks/useHideBottomNav";
import { usePreloadAssets } from "@/shared/hooks/usePreloadAssets";
import { Button } from "@/shared/ui";
import { TopNav } from "@/widgets/TopNav/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, View } from "react-native";
const characterImages = Character.map((char) => char.image);

export default function Onboarding() {
	const { isLoaded } = usePreloadAssets(characterImages);
	const router = useRouter();
	const { from } = useLocalSearchParams();
	const [selectedCharacter, setSelectedCharacter] = useState<CharacterProps>(
		Character[0],
	);
	const { selectCharacter, updateCharacter } =
		useCharacterSelection(selectedCharacter);

	useHideBottomNav();

	const handleSelectCharacter = async () => {
		if (from === "my") {
			try {
				updateCharacter();
			} catch (e) {
				console.log(e);
			}
		} else {
			try {
				selectCharacter();
			} catch (e) {
				console.log(e);
			}
		}
	};

	if (!isLoaded) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	return (
		<View style={{ flex: 1 }}>
			{from === "my" ? (
				<TopNav
					title="캐릭터 수정하기"
					leftIcon
					onLeftPress={() => router.push("/my")}
				/>
			) : (
				<></>
			)}
			<CharacterInfo
				characters={Character}
				setSelectedCharacter={setSelectedCharacter}
			/>
			<View
				style={{
					position: "absolute",
					bottom: 0,
					left: 0,
					right: 0,
					alignItems: "center",
				}}
			>
				<Button
					text={`${selectedCharacter.name}(이)랑 시작하기`}
					onPress={handleSelectCharacter}
				/>
			</View>
		</View>
	);
}
