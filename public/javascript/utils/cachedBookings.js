import { getAllUserBookings } from "../api/books.js";

let cachedUserBookings = null;

export const getUserBookingsCached = async () => {
	if (!cachedUserBookings) {
		cachedUserBookings = await getAllUserBookings();
	}
	return cachedUserBookings;
};
