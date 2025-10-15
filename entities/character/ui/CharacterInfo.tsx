import type { CharacterProps } from "@/entities/character/model/type";
import * as S from "@/entities/character/style/CharacterInfo.styles";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";

interface CharacterInfoProps {
	characters: CharacterProps[];
	setSelectedCharacter?: (character: CharacterProps) => void;
}

export function CharacterInfo({
	characters,
	setSelectedCharacter,
}: CharacterInfoProps) {
	const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
		const x = e.nativeEvent.contentOffset.x;
		const itemWidth = e.nativeEvent.layoutMeasurement.width;

		const index = Math.round(x / itemWidth);

		if (characters[index]) {
			setSelectedCharacter?.(characters[index]);
		}
	};
	return (
		<S.CharacterInfoContainer onScroll={handleScroll}>
			{characters.map((character) => {
				return (
					<S.CharacterWrapper key={character.name}>
						{/* 말풍선 */}
						<S.SpeechBubbleContainer>
							<S.SpeechBubbleText>{character.speech}</S.SpeechBubbleText>
							<S.Polygon />
						</S.SpeechBubbleContainer>

						{/* 이미지 */}
						<S.CharacterImageView>
							<S.CharacterImage />
						</S.CharacterImageView>

						{/* 이름 */}
						<S.CharacterName>{character.name}</S.CharacterName>

						{/* 성격 */}
						<S.PersonalityContainer>
							{character.personality.map((trait) => (
								<S.PersonalityBox key={trait}>
									<S.PersonalityText>{trait}</S.PersonalityText>
								</S.PersonalityBox>
							))}
						</S.PersonalityContainer>
					</S.CharacterWrapper>
				);
			})}
		</S.CharacterInfoContainer>
	);
}
