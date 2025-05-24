import { getAllUserBookings } from "../api/books.js";
import { renderCategoriesSelect } from "../main.js";
import { eventCardHTML } from "../components/eventCard.js";
import { fetchEvents } from "../utils/fetchEvents.js";
import { initFiltersListeners } from "../utils/init/filtersListeners.js";
import { initBookingsListeners } from "../utils/init/bookingListeners.js";

const eventDataMap = new Map();
let cachedUserBookings = null;
const eventsContainer = document.querySelector(".event-cards");

const getUserBookingsCached = async () => {
	if (!cachedUserBookings) {
		cachedUserBookings = await getAllUserBookings();
	}
	return cachedUserBookings;
};

const renderAllEvents = async (events) => {
	eventsContainer.innerHTML = "";
	eventDataMap.clear();
	let bookedEventIds;

	const userBookings = await getUserBookingsCached();
	if (!userBookings.error) {
		bookedEventIds = new Set(userBookings?.bookings.map((b) => b.eventId));
	}

	const fragment = document.createDocumentFragment();

	events.forEach((event) => {
		const eventCard = document.createElement("div");
		eventCard.className = "event-card";
		eventCard.dataset.id = event.id;

		eventCard.innerHTML = eventCardHTML(event);
		const bookingBtn = eventCard.querySelector(".book-btn");

		if (!userBookings.error && bookedEventIds.has(event.id)) {
			bookingBtn.textContent = "Booked";
			bookingBtn.classList.add("booked");
		}

		eventDataMap.set(event.id, event); // cache event data
		fragment.appendChild(eventCard);
	});

	eventsContainer.appendChild(fragment);
};

document.addEventListener("DOMContentLoaded", async () => {
	renderCategoriesSelect();
	await fetchEvents(renderAllEvents);
	await initFiltersListeners(renderAllEvents);
	await initBookingsListeners(eventsContainer, eventDataMap);
});

const scrollDown = (e) => {
	e.preventDefault();

	const eventsSection = document.querySelector(".events-content");
	if (eventsSection) {
		eventsSection.scrollIntoView({ behavior: "smooth" });
	}
};

document.querySelector(".evnts-link").addEventListener("click", scrollDown);
document.querySelector(".content .btn").addEventListener("click", scrollDown);
