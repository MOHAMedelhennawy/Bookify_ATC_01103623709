import { getAllUserBookings } from "../api/books.js";
import { fetchAllEvents } from "../api/events.js";
import { addNewBookingBtnAction, renderCategoriesSelect } from "../main.js";
import { formatCustomDate } from "../utils/date.js";
import { renderPagination } from "../utils/pagination.js";
import { showToast } from "../utils/showToast.js";

let limit = 12;
const eventDataMap = new Map();
let searchTerm = "";
let selectedCategory = "";
let sortBy = "";
let sortOrder = "asc";
let searchDebounce;
let cachedUserBookings = null;

const eventsContainer = document.querySelector(".event-cards");
const paginationContainer = document.querySelector(".pagination-buttons");
const searchInput = document.querySelector(".search-input input");
const categorySelect = document.querySelector(".category-select");
const sortingButtons = document.querySelectorAll(".sorting-buttons button");

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

const fetchEvents = async (page = 1) => {
	// Get data
	const query = new URLSearchParams({
		page,
		limit,
		search: searchTerm,
		category: selectedCategory,
		sort: sortBy,
	});

	const data = await fetchAllEvents(`?${query.toString()}`);

	if (data?.error) {
		showToast("error", "Failed to upload events");
		return;
	}

	// Render data
	await renderAllEvents(data.events);

	const totalPages = Math.ceil(data.count / limit);

	// Render pagination
	renderPagination(paginationContainer, totalPages, page, fetchEvents);
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
				<a href="/event/${event.id}" class="details-btn">View Details</a>
				<a href="#" class="book-btn">Book Now</a>
			</div>
		</div>
    `;
};

eventsContainer.addEventListener("click", async (e) => {
	if (!e.target.classList.contains("book-btn")) return;

	e.preventDefault();

	const eventCard = e.target.closest(".event-card");
	const eventId = eventCard?.dataset.id;
	const eventData = eventDataMap.get(eventId);

	if (!eventData) {
		showToast("error", "Event data not found");
		return;
	}

	try {
		await addNewBookingBtnAction(e.target, eventData);
	} catch (err) {
		showToast("error", "Failed to book event");
	}
});

searchInput.addEventListener("input", () => {
	clearTimeout(searchDebounce);
	searchDebounce = setTimeout(() => {
		searchTerm = searchInput.value.trim();
		fetchEvents(1);
	}, 400);
});

categorySelect.addEventListener("change", () => {
	selectedCategory = categorySelect.value;
	fetchEvents(1);
});

sortingButtons.forEach((button) => {
	button.addEventListener("click", () => {
		const key = button.querySelector("p")?.textContent?.toLowerCase(); // name, date, price
		switch (key) {
			case "name":
				sortBy = "title";
				break;
			case "date":
				sortBy = "date";
				break;
			case "price":
				sortBy = "price";
				break;
			default:
				sortBy = "";
		}

		// Toggle between asc/desc on repeated clicks
		sortOrder = sortOrder === "asc" ? "desc" : "asc";
		sortBy += `,${sortOrder}`;
		fetchEvents(1);
	});
});

document.addEventListener("DOMContentLoaded", async () => {
	renderCategoriesSelect();
	await fetchEvents();
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
