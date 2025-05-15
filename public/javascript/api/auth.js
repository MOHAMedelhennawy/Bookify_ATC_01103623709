import { apiClient } from "./apiClient.js";
import { fetchErrorHandler } from "../utils/fetchErrorHandler.js";

const PORT = 4000;
const BASE_URL = `http://localhost:${PORT}/api`;
const SIGNUP_URL = `${BASE_URL}/signup`;
const LOGIN_URL = `${BASE_URL}/login`;

export const createNewUser = fetchErrorHandler(async (data) => {
	if (!data) {
		console.error("Data is required");
		return;
	}

	return await apiClient(SIGNUP_URL, {
		method: "POST",
		body: JSON.stringify(data),
		credentials: "include",
	});
});

export const checkUser = fetchErrorHandler(async (data) => {
	if (!data) {
		console.error("Data is required");
		return;
	}

	return await apiClient(LOGIN_URL, {
		method: "POST",
		body: JSON.stringify(data),
		credentials: "include",
	});
});
