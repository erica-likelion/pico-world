import { axiosInstance } from "@/shared/api/axios";

export interface GreetingData {
	message: string;
	characterName: string | null;
	context: string;
	hasRecordedToday: boolean | null;
}

export async function getGreeting(
	context: string = "friend-invite",
): Promise<GreetingData> {
	const response = await axiosInstance.get<GreetingData>(
		`/api/v1/greeting?context=${context}`,
	);
	return response.data;
}
