export type CharacterName = "츠츠" | "루루" | "동동" | "티티" | "파파";

export const CHARACTER_RECORD_MESSAGES: Record<CharacterName, string> = {
	츠츠: "오늘 어땠는지 들어볼까?",
	루루: "오늘 하루도 수고했어요. 어떤 감정이 스쳤나요?",
	동동: "무슨 일 있었어요? 난 다 들어줄 준비됐어요.",
	티티: "감정도 흐름이 있어. 그냥 느끼면 돼.",
	파파: "흔들릴 때일수록 감정을 정리해두는 게 도움이 되지.",
};

export const DEFAULT_CHARACTER: CharacterName = "츠츠";
