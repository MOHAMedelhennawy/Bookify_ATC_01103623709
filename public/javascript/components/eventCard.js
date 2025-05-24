import { formatCustomDate } from "../utils/date.js";

export const eventCardHTML = (event) => {
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
