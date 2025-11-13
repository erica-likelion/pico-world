import { useUserCharacter } from "@/entities/user/model/userQueries";
import * as S from "@/features/record/style/EmotionComplete.styles";
import type { EmotionChip } from "@/shared/types";
import { CharacterBubble } from "@/shared/ui/CharacterBubble";
import { EmotionCard } from "@/shared/ui/EmotionCard";
import { useRouter, type Href } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated } from "react-native";

interface EmotionCompleteProps {
	selectedEmotion: EmotionChip | null;
}

const getCharacterMessage = (characterName: string): string => {
	return `${characterName}${
		characterName === "동동" ? "이가" : "가"
	} 당신의 기록을 읽는 중 ...`;
};

export const EmotionComplete: React.FC<EmotionCompleteProps> = ({
	selectedEmotion,
}) => {
	const userCharacter = useUserCharacter();
	const router = useRouter();
	const fade1 = useRef(new Animated.Value(0)).current;
	const fade2 = useRef(new Animated.Value(0)).current;
	const fade3 = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.sequence([
			Animated.timing(fade1, {
				toValue: 1,
				duration: 1000,
				useNativeDriver: true,
			}),
			Animated.timing(fade2, {
				toValue: 1,
				duration: 600,
				useNativeDriver: true,
			}),
			Animated.timing(fade3, {
				toValue: 1,
				duration: 1500,
				useNativeDriver: true,
			}),
			Animated.delay(1800),
		]).start(() => {
			router.push("/journal" as Href);
		});
	}, [fade1, fade2, fade3, router]);

	return (
		<S.Container>
			<Animated.View style={{ opacity: fade2 }}>
				<S.Title>작성 완료!</S.Title>
			</Animated.View>
			{selectedEmotion?.label && (
				<Animated.View style={{ opacity: fade1, width: "100%" }}>
					<EmotionCard
						mainColor={selectedEmotion.mainColor}
						subColor={selectedEmotion.subColor}
						title={selectedEmotion.label ?? ""}
					/>
				</Animated.View>
			)}
			<Animated.View style={{ opacity: fade3 }}>
				<CharacterBubble
					character={userCharacter}
					message={getCharacterMessage(userCharacter)}
				/>
			</Animated.View>
		</S.Container>
	);
};
