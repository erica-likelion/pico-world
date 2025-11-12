import * as S from "@/shared/style/CharacterBubble.style";
import type { CharacterName } from "@/entities/character/model/characterMessages";
import type { ImageSourcePropType } from "react-native";
import TypeWriter from "react-native-typewriter-effect";

interface CharacterBubbleProps {
	character: CharacterName;
	message: string;
	enableTypewriter?: boolean;
}

const characterImages: Record<CharacterName, ImageSourcePropType> = {
	츠츠: require("@/shared/assets/images/characters/chch.png"),
	루루: require("@/shared/assets/images/characters/lulu.png"),
	동동: require("@/shared/assets/images/characters/dongdong.png"),
	티티: require("@/shared/assets/images/characters/tt.png"),
	파파: require("@/shared/assets/images/characters/papa.png"),
};

/**
 * CharacterBubble - TypeWriter 라이브러리를 사용한 채팅 버블 컴포넌트
 * @param props - CharacterBubble props
 * @param props.character - 캐릭터 이름
 * @param props.message - 전할 메시지
 * @param props.enableTypewriter - 타이핑 효과 활성화 여부
 * @returns JSX.Element
 * @example
 * <CharacterBubble character="츠츠" message="안녕하세요" />
 * <CharacterBubble character="AI" message="타이핑 효과입니다" enableTypewriter={true} />
 */

export const CharacterBubble = ({
	character,
	message,
	enableTypewriter = false,
}: CharacterBubbleProps) => {
	const src = characterImages[character] ?? characterImages.츠츠;

	return (
		<S.Container>
			<S.CharacterWrapper>
				<S.CharacterImage source={src} resizeMode="contain" />
			</S.CharacterWrapper>
			<S.BubbleWrapper>
				<S.Bubble>
					{enableTypewriter ? (
						<TypeWriter content={message} maxDelay={60} minDelay={80} />
					) : (
						message
					)}
				</S.Bubble>
			</S.BubbleWrapper>
		</S.Container>
	);
};
