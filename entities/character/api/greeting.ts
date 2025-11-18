import { axiosInstance } from "@/shared/api/axios";

interface GreetingResponse {
	message: string;
	characterName: string;
	context: string;
	hasRecordedToday?: true | false;
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
