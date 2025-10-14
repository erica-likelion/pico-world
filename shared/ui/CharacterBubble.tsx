import * as S from "@/shared/style/CharacterBubble.style";
import TypeWriter from "react-native-typewriter-effect";

interface CharacterBubbleProps {
	character: string;
	message: string;
	enableTypewriter?: boolean;
}

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
	return (
		<S.Container>
			<S.CharacterWrapper>
				<S.Character>{character}</S.Character>
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
