import { deleteEventById, fetchEventByID } from "../../../api/events.js";
import { formatDateTime } from "../../date.js";
import { showToast } from "../../showToast.js";
import { addNewEvent, updateEvent } from "./eventFormHandler.js";
import {
	form,
	formTitle,
	modal,
	setOriginalEventData,
} from "./eventFormSelectors.js";

export function openModal(isEdit = false) {
	modal.classList.remove("hidden");
	formTitle.textContent = isEdit ? "Edit Event" : "Add Event";
}

export function closeModal() {
	modal.classList.add("hidden");
	form.reset();
}

export const addEventBtnAction = (e) => {
	openModal();
	form.addEventListener("submit", (e) => addNewEvent(e));
};

// Edit event
export const editEventBtnAction = async (e) => {
	const editBtn = e.target.closest(".actions .edit");
	if (!editBtn) return;

	openModal(true);

	const eventId = editBtn.closest("tr").dataset.id;
	const data = await fetchEventByID(eventId);

	if (!data) {
		showToast("error", "Failed to fetch event, Please try again later");
		closeModal();
		return;
	}

	const eventDateAndTime = formatDateTime(data.event.date);
	const select = document.querySelector(".category-select");
	let category = Array.from(select.options).find(
		(option) => option.dataset.id === data.event.categoryId,
	);

	// Fill form and store original values
	setOriginalEventData(data.event, eventDateAndTime, category.value);
	form.onsubmit = (e) => updateEvent(e, eventId);
};

export const addEventsButtonsAction = (eventRow) => {
	const deleteBtn = eventRow.querySelector(".actions .delete");

	deleteBtn.addEventListener("click", async () => {
		const trElement = deleteBtn.closest("tr");
		const id = trElement.dataset.id;

		if (id) {
			const deleted = await deleteEventById(id);

			if (deleted?.error) {
				showToast("error", deleted.message.description);
			} else {
				trElement.classList.add("fade-out");

				setTimeout(() => {
					trElement.remove();
				}, 400);

				showToast("success", deleted.message);
			}
		}
	});
};
