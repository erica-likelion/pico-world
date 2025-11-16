export interface EmotionChip {
	label?: string;
	mainColor: string;
	subColor: string;
	textColor?: string;
	count?: number;
}

export interface EmotionRecord {
	record_id: number;
	record: string;
	emoji_emotion: string;
	emotion_name: string;
	main_color: string;
	sub_color: string;
	text_color: string;
	is_shared: boolean;
	ai_feedback_count: number;
	created_at: string;
}
