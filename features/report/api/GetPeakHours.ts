import { axiosInstance } from "@/shared/api/axios";

export interface PeakHoursResponse {
	dominant_time: string;
	dominant_emotion: string;
}

export async function getPeakHours() {
	return axiosInstance.get<PeakHoursResponse>(
		"/api/v1/emotion/report/time-pattern",
	);
}
