import { addNewBooking, getAllUserBookings } from "../api/books.js";
import { fetchAllEvents } from "../api/events.js";
import { renderCategoriesSelect } from "../main.js";
import { formatCustomDate } from "../utils/date.js";
import { renderPagination } from "../utils/pagination.js";
import { showToast } from "../utils/showToast.js";

let limit = 12;
let cachedUserBookings = null;

const eventsContainer = document.querySelector(".event-cards");
const paginationContainer = document.querySelector(".pagination-buttons");

const getUserBookingsCached = async () => {
	if (!cachedUserBookings) {
		cachedUserBookings = await getAllUserBookings();
	}
	return cachedUserBookings;
};

const addNewBookingBtnAction = async (bookingBtn, event) => {
	if (!event || !event?.id) {
		showToast("error", "Event id is required");
		return;
	}

	const booking = await addNewBooking(event.id);

	if (booking?.error) {
		showToast("error", booking.message.description);
		return;
	} else {
		bookingBtn.classList.add("booked");
		showToast("success", "Event booking successfully");
	}
};

const renderAllEvents = async (events) => {
	eventsContainer.innerHTML = "";

	// To prevent getting data again each time if it already exists
	let bookedEventIds = null;
	const userBookings = await getUserBookingsCached();

	if (!userBookings?.error) {
		bookedEventIds = new Set(userBookings.bookings.map((b) => b.eventId));
	}
	const fragment = document.createDocumentFragment();

	events.forEach((event) => {
		const eventCard = document.createElement("div");
		eventCard.className = "event-card";
		eventCard.dataset.id = event.id;

		eventCard.innerHTML = eventCardHTML(event);

		const bookingBtn = eventCard.querySelector(".book-btn");
		if (bookedEventIds && bookedEventIds?.has(event.id)) {
			bookingBtn.classList.add("booked");
		}

		bookingBtn.addEventListener("click", () =>
			addNewBookingBtnAction(bookingBtn, event),
		);

		fragment.appendChild(eventCard);
	});

	eventsContainer.appendChild(fragment);
};

const fetchEvents = async (page = 1) => {
	// Get data
	const data = await fetchAllEvents(page, limit);

	if (data?.error) {
		showToast("error", "Failed to upload events");
		return;
	}

	// Render data
	await renderAllEvents(data.events);

	// Render pagination
	renderPagination(paginationContainer, data.count, page, fetchEvents);
};

const eventCardHTML = (event) => {
	const { category, price, title, address, location, imageUrl } = event;
	const date = formatCustomDate(event.date);

	// Escape dynamic content to prevent injection
	const escape = (str) =>
		document.createElement("div").appendChild(document.createTextNode(str))
			.parentNode.innerHTML;

	return `
        <div class="event-image">
            <img src="/images/events/${escape(imageUrl)}" alt="">
            <span class="event-price">$${escape(price)}</span>
        </div>
        <div class="event-details">
            <h3 class="event-title">${escape(title)}</h3>
            <div class="event-time">
                <span class="material-symbols-outlined">date_range</span>
                <p class="time">${escape(date)}</p>
            </div>
            <div class="event-location">
                <span class="material-symbols-outlined">location_on</span>
                <p class="location">${escape(address)}, ${escape(location)}</p>
            </div>
            <span class="event-category">${escape(category.name)}</span>
            <div class="event-buttons">
                <a href="#" class="details-btn">View Details</a>
                <a href="#" class="book-btn">Book Now</a>
            </div>
        </div>
    `;
};

eventsContainer.addEventListener("click", async (e) => {
	if (e.target.classList.contains("book-btn")) {
		const eventCard = e.target.closest(".event-card");
		const eventId = eventCard?.dataset.id;

		// Find the event object (optional optimization)
		const allEventCards = Array.from(
			eventsContainer.querySelectorAll(".event-card"),
		);

		const eventData = allEventCards.find(
			(card) => card.dataset.id === eventId,
		)?.__eventData;

		if (eventData) {
			await addNewBookingBtnAction(e.target, eventData);
		} else {
			showToast("error", "Event data not found");
		}
	}
});

document.addEventListener("DOMContentLoaded", async () => {
	renderCategoriesSelect();
	await fetchEvents();
});
