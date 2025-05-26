/* eslint-disable prettier/prettier */
import { convertDate } from "../../date.js";
import { showToast } from "../../showToast.js";
import {
	form,
	getInputValue,
	originalEventData,
} from "./eventFormSelectors.js";
import { createEvent, updatedEventById } from "../../../api/events.js";
import { getUpdatedFields, handleEventFormResponse } from "./handleEventForm.js";

// Add event
export const addNewEvent = async (e) => {
	e.preventDefault();
	const categoryId = form.querySelector(".category-select").selectedOptions[0]?.dataset.id;

	try {
		const formData = new FormData();

		const values = {
			title: getInputValue("#event-name"),
			date: convertDate(getInputValue("#event-date"), getInputValue("#event-time")),
			venue: getInputValue("#event-venue"),
			categoryId,
			description: getInputValue("#event-description"),
			price: parseFloat(getInputValue("#event-price")),
			address: getInputValue("#event-address"),
			location: getInputValue("#event-location"),
			eventImg: form.querySelector("#event-image").files[0],
		};

		for (const [key, value] of Object.entries(values)) {
			if (value !== "undefined" || value !== "null")
				formData.append(key, value);
		}

		const data = await createEvent(formData);

		handleEventFormResponse("create", data);
	} catch (err) {
		console.error("Unexpected Error:", err);
		showToast("error", err.message || "Unexpected error occurred");
	}
};

export const updateEvent = async (e, eventId) => {
	e.preventDefault();

	let updatedFields = {};
	const categoryId = form.querySelector(".category-select").selectedOptions[0]?.dataset.id;

	const currentValues = {
		title: getInputValue("#event-name"),
		venue: getInputValue("#event-venue"),
		description: getInputValue("#event-description"),
		price: getInputValue("#event-price"),
		date: getInputValue("#event-date"),
		time: getInputValue("#event-time"),
		address: getInputValue("#event-address"),
		location: getInputValue("#event-location"),
		categoryId
	};

	updatedFields = getUpdatedFields(currentValues, originalEventData);

	if (Object.keys(updatedFields).length === 0) {
		showToast("error", "No changes made.");
		return;
	}

	try {
		const data = await updatedEventById(eventId, updatedFields);
		handleEventFormResponse("update", data);
	} catch (err) {
		showToast("error", "Unexpected error occurred while updating.");
	}
};
