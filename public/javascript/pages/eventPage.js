import { fetchEventByID } from "../api/events.js";
import { formatDateTime } from "../utils/date.js";
import { addNewBookingBtnAction } from "../main.js";
import { getAllUserBookings } from "../api/books.js";
import { eventHTMLTemplete } from "../components/eventPage.js";

const renderEventInformation = async () => {
	const id = window.location.pathname.split("/").pop();

	const eventBanner = document.querySelector(".event-banner");
	const event = await fetchEventByID(id);

	if (!event?.error) {
		const bookedEventIds = await getUserBookingsIDs();

		const date = formatDateTime(event.event.date);
		eventBanner.innerHTML = eventHTMLTemplete(event.event, date);

		const bookingBtn = eventBanner.querySelector(".book-btn");
		if (bookedEventIds && bookedEventIds?.has(event.id)) {
			bookingBtn.textContent = "Booked";
			bookingBtn.classList.add("booked");
		}

		bookingBtn.addEventListener("click", (_) =>
			addNewBookingBtnAction(bookingBtn, event.event),
		);
	}
};

const getUserBookingsIDs = async () => {
	const userBookings = await getAllUserBookings();
	if (!userBookings?.error) {
		// eslint-disable-next-line prettier/prettier
    return new Set(userBookings.bookings.map((b) => b.eventId));
	}
};

document.addEventListener("DOMContentLoaded", renderEventInformation);
