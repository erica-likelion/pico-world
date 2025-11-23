import { axiosInstance } from "@/shared/api/axios";

export const friendAlarmBlock = (connectCode: string) => {
	return axiosInstance
		.post("api/v1/friends/notification/block", {
			connectCode: connectCode,
		})
		.then((response) => {
			console.log(
				"Friend alarm blocked successfully for connectCode:",
				connectCode,
			);
			return response;
		});
};

export const friendAlarmUnBlock = (connectCode: string) => {
	return axiosInstance
		.delete("api/v1/friends/notification/unblock", {
			data: { connectCode },
		})
		.then((response) => {
			console.log(
				"Friend alarm unblocked successfully for connectCode:",
				connectCode,
			);
			return response;
		});
};
