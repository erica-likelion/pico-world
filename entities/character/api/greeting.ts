import { axiosInstance } from "@/shared/api/axios";

export interface GreetingResponse {
	message: string;
	characterName: string | null;
	context: string;
	hasRecordedToday?: boolean | null;
}

export const fetchGreeting = async ({
	context,
}: {
	context: string;
}): Promise<GreetingResponse> => {
	const response = await axiosInstance.get<GreetingResponse>(
		`/api/v1/greeting?context=${context}`,
	);
	return response.data;
};
