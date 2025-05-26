import { convertDate } from "../../date.js";
import { showToast } from "../../showToast.js";
import { closeModal } from "./adminListeners.js";
import { form } from "./eventFormSelectors.js";

export function handleEventFormResponse(action, data) {
	if (data?.error) {
		let firstErrorMessage = "Something went worng";

		if (
			Array.isArray(data?.message?.errors) &&
			data?.message?.errors.length > 0
		) {
			firstErrorMessage = data.message.errors[0].message;
		} else if (data?.message?.message) {
			firstErrorMessage = data.message.message;
		} else if (typeof data?.message === "string") {
			firstErrorMessage = data.message;
		}

		showToast("error", `${firstErrorMessage}`);
	} else {
		showToast("success", `Event ${action}d successfully`);
		form.reset();
		closeModal();
	}
}

export function appendImageIfExist(formData) {
	const fileInput = form.querySelector("#event-image");

	if (fileInput.files.length > 0) {
		formData.append("eventImg", fileInput.files[0]);
	}
}

export function getUpdatedFields(currentValues, originalEventData) {
	const updatedFields = {};

	Object.entries(currentValues).forEach(([key, value]) => {
		if (value !== originalEventData[key]) {
			updatedFields[key] = value;
		}
	});

	if (updatedFields["date"] || updatedFields["time"]) {
		updatedFields.date = convertDate(currentValues.date, currentValues.time);
		delete updatedFields?.time;
	}

	return updatedFields;
}
