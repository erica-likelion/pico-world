import { axiosInstance } from "@/shared/api/axios";

export const friendAlarmBlock = async (friendId: number) => {
	await axiosInstance.post("api/v1/friends/notification/block", {
		friendId: friendId,
	});
	console.log("알람 차단");
	return;
};

export const friendAlarmUnBlock = async (friendId: number) => {
	await axiosInstance.post("api/v1/friends/notification/unblock", {
		friendId: friendId,
	});
	console.log("알람 차단 해제");
	return;
};
