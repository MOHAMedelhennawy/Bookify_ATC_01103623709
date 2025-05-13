import { apiClient } from "./apiClient.js";
import { fetchErrorHandler } from "../utils/fetchErrorHandler.js";

const PORT = 4000;
const BASE_URL = `http://localhost:${PORT}/api`;
const SIGNUP_URL = `${BASE_URL}/signup`;

export const createNewUser = fetchErrorHandler(async (data) => {
	return await apiClient(SIGNUP_URL, {
		method: "POST",
		body: JSON.stringify(data),
		credentials: "include",
	});
});
