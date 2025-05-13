import { fetchAllEvents } from "../api/events.js";
import { formatCustomDate } from "../main.js";
import { renderPagination } from "../utils/pagination.js";

let limit = 12;
const eventsContainer = document.querySelector(".event-cards");
const paginationContainer = document.querySelector(".pagination-buttons");

const renderAllEvents = (events) => {
	eventsContainer.innerHTML = "";

	events.forEach((event) => {
		const eventCard = document.createElement("div");
		eventCard.className = "event-card";
		eventCard.dataset.id = event.id;

		eventCard.innerHTML = eventCardHTML(event);

		eventsContainer.appendChild(eventCard);
	});
};

const fetchEvents = async (page = 1) => {
	// Get data
	const data = await fetchAllEvents(page, limit);

	// if (!data?.error) {

	// }

	// Render data
	renderAllEvents(data.events);

	// Render pagination
	renderPagination(paginationContainer, data.count, page, fetchEvents);
};

const eventCardHTML = (event) => {
	const { category, price, title, address, location } = event;

	const date = formatCustomDate(event.date);

	return `
        <div class="event-image">
            <img src="/images/events/al-elmes-ULHxWq8reao-unsplash.jpg" alt="">
            <span class="event-price">$${price}</span>
        </div>
        <div class="event-details">
            <h3 class="event-title">${title}</h3>
            <div class="event-time">
                <span class="material-symbols-outlined">date_range</span>
                <p class="time">${date}</p>
            </div>
            <div class="event-location">
                <span class="material-symbols-outlined">location_on</span>
                <p class="location">${address}, ${location}</p>
            </div>
            <span class="event-category">${category.name}</span>
            <div class="event-buttons">
                <a href="#" class="details-btn">View Details</a>
                <a href="#" class="book-btn">Book Now</a>
            </div>
    `;
};

document.addEventListener("DOMContentLoaded", () => fetchEvents());
