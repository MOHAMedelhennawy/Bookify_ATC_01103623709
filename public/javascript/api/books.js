import { fetchErrorHandler } from "../utils/fetchErrorHandler.js";
import { apiClient } from "./apiClient.js";

const PORT = 4000;
const BASE_URL = `http://localhost:${PORT}/api`;
const EVENTS_URL = `${BASE_URL}/bookings`;

export const addNewBooking = fetchErrorHandler(async (eventId) => {
	return await apiClient(`${EVENTS_URL}`, {
		method: "POST",
		body: JSON.stringify({ eventId }),
	});
});

export const getAllUserBookings = fetchErrorHandler(async () => {
	return await apiClient(`${EVENTS_URL}`);
});
