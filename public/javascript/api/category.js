import { fetchErrorHandler } from "../utils/fetchErrorHandler.js";
import { apiClient } from "./apiClient.js";

const PORT = 4000;
const BASE_URL = `http://localhost:${PORT}/api`;
const EVENTS_URL = `${BASE_URL}/categories`;

export const fetchAllCategories = fetchErrorHandler(async () => {
	return await apiClient(`${EVENTS_URL}`);
});
