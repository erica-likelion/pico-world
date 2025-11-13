import { axiosInstance } from "@/shared/api/axios";

export interface ComparisonSection {
	representative_emotion: string;
	main_color: string;
	sub_color: string;
}

export interface ComparisonResponse {
	thisMonth: ComparisonSection;
	lastMonth: ComparisonSection;
}

export async function getComparison() {
	return axiosInstance.get<ComparisonResponse>(
		"/api/v1/emotion/report/comparison",
	);
}
