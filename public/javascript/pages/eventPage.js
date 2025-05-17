import { getAllUserBookings } from "../api/books.js";
import { fetchEventByID } from "../api/events.js";
import { addNewBookingBtnAction } from "../main.js";
import { formatDateTime } from "../utils/date.js";

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

const eventHTMLTemplete = (event, date) => {
	return `
    <img src="/images/events/${event.imageUrl}" alt="Audience at Tech Conference" class="event-img" />
    <div class="overlay"></div>
    <div class="event-details-container">
      <h1>${event.title}</h1>
      <div class="event-meta">
        <div class="event-info">
            <p class="info">
                <span class="material-symbols-outlined">date_range</span>
                <span class="text">${date.date}</span>
            </p>
            <p class="info">
                <span class="material-symbols-outlined">location_on</span>
                <span class="text">${event.address}, ${event.location}</span>
            </p>
        </div>
        <div class="event-info">
            <p class="info">
                <span class="material-symbols-outlined">schedule</span>
                <span class="text">${date.time}</span>
            </p>
            <p class="info">
                <span class="material-symbols-outlined">group</span>
                <span class="text">Limited Capacity</span>
            </p>
        </div>
      </div>
      <div class="event-description">
        <h3>About This Event</h3>
        <p>
          ${event.description}
        </p>
      </div>
      <div class="event-pricing">
        <p class="price">$${event.price}</p>
        <button class="book-btn">Book Now</button>
      </div>
    </div>
    `;
};

document.addEventListener("DOMContentLoaded", renderEventInformation);
