import { showToast } from "../showToast.js";
import { addNewBookingBtnAction } from "../../main.js";

export function initBookingsListeners(eventsContainer, eventDataMap) {
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
}
