import { fetchErrorHandler } from "../utils/fetchErrorHandler.js";
import { apiClient } from "./apiClient.js";

const PORT = 4000;
const BASE_URL = `http://localhost:${PORT}/api`;
const EVENTS_URL = `${BASE_URL}/events`;

export const fetchAllEvents = fetchErrorHandler(async (queryString) => {
	return await apiClient(`${EVENTS_URL}${queryString}`);
});

export const fetchEventByID = fetchErrorHandler(async (id) => {
	return await apiClient(`${EVENTS_URL}/${id}`);
});

export const createEvent = fetchErrorHandler(async (data) => {
	const res = await fetch(EVENTS_URL, {
		method: "POST",
		body: data,
	});

	if (!res.ok) {
		const errorText = await res.text();
		throw new Error(errorText || "Unknown error");
	}

	return await res.json();
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
