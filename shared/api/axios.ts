import type { ApiResponse } from "@/shared/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, {
	type AxiosError,
	type AxiosRequestConfig,
	type AxiosResponse,
} from "axios";
import { router } from "expo-router";

export const instance = axios.create({
	baseURL: process.env.EXPO_PUBLIC_API_URL,
	timeout: 1000 * 60 * 5,
});

// Request 인터셉터: 토큰을 헤더에 자동으로 추가
instance.interceptors.request.use(
	async (config) => {
		const token = await AsyncStorage.getItem("accessToken");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

instance.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error: AxiosError) => {
		const originalRequest = error.config;

		if (error.response?.status === 401 && originalRequest) {
			const refreshToken = await AsyncStorage.getItem("refreshToken");

			if (refreshToken) {
				try {
					const response = await axios.post<{ accessToken: string }>(
						"/api/v1/auth/refresh",
						{ refreshToken },
						{
							baseURL:
								process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000/api",
						},
					);

					const newAccessToken = response.data.accessToken;
					await AsyncStorage.setItem("accessToken", newAccessToken);

					originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
					return instance(originalRequest);
				} catch (_refreshError) {
					await AsyncStorage.multiRemove(["accessToken", "refreshToken"]);
					router.replace("/login");
				}
			}
		}

		return Promise.reject(error);
	},
);

export const axiosInstance = {
	async get<T = unknown>(
		url: string,
		config?: AxiosRequestConfig,
	): Promise<ApiResponse<T>> {
		const response: AxiosResponse<ApiResponse<T>> = await instance.get(
			url,
			config,
		);
		return response.data;
	},

	async post<T = unknown>(
		url: string,
		data?: unknown,
		config?: AxiosRequestConfig,
	): Promise<ApiResponse<T>> {
		const response: AxiosResponse<ApiResponse<T>> = await instance.post(
			url,
			data,
			config,
		);
		return response.data;
	},

	async put<T = unknown>(
		url: string,
		data?: unknown,
		config?: AxiosRequestConfig,
	): Promise<ApiResponse<T>> {
		const response: AxiosResponse<ApiResponse<T>> = await instance.put(
			url,
			data,
			config,
		);
		return response.data;
	},

	async patch<T = unknown>(
		url: string,
		data?: unknown,
		config?: AxiosRequestConfig,
	): Promise<ApiResponse<T>> {
		const response: AxiosResponse<ApiResponse<T>> = await instance.patch(
			url,
			data,
			config,
		);
		return response.data;
	},

	async delete<T = unknown>(
		url: string,
		config?: AxiosRequestConfig,
	): Promise<ApiResponse<T>> {
		const response: AxiosResponse<ApiResponse<T>> = await instance.delete(
			url,
			config,
		);
		return response.data;
	},
};
