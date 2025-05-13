import { fetchErrorHandler } from "../utils/fetchErrorHandler.js";
import { apiClient } from "./apiClient.js";

const PORT = 4000;
const BASE_URL = `http://localhost:${PORT}/api`;
const EVENTS_URL = `${BASE_URL}/events`;

export const fetchAllEvents = fetchErrorHandler(async (page, limit) => {
	return await apiClient(`${EVENTS_URL}?page=${page}&limit=${limit}`);
});

export const fetchEventByID = fetchErrorHandler(async (id) => {
	return await apiClient(`${EVENTS_URL}/${id}`);
});

export const createEvent = fetchErrorHandler(async (data) => {
	return await apiClient(EVENTS_URL, {
		method: "POST",
		body: JSON.stringify(data),
	});
});

export const updatedEventById = fetchErrorHandler(async (id, data) => {
	return await apiClient(`${EVENTS_URL}/${id}`, {
		method: "PUT",
		body: JSON.stringify(data),
	});
});

export const deleteEventById = fetchErrorHandler(async (id) => {
	return await apiClient(`${EVENTS_URL}/${id}`, {
		method: "DELETE",
	});
});
