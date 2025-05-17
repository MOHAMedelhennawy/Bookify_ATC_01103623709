/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import { createEvent, deleteEventById, fetchAllEvents, fetchEventByID, updatedEventById } from "../api/events.js";
import { renderCategoriesSelect } from "../main.js";
import { formatCustomDate, formatDateTime } from "../utils/date.js";
import { convertDate } from "../utils/date.js";
import { renderPagination } from "../utils/pagination.js";
import { showToast } from "../utils/showToast.js";

let limit = 12;
let searchTerm = "";
let selectedCategory = "";
let sortBy = "";
let sortOrder = "asc";
let originalEventData = {};
const eventTableBody = document.querySelector("#eventTableBody");
const paginationContainer = document.querySelector(".pagination");
const modal = document.querySelector("#eventModal");
const addEventBtn = document.querySelector(".addEventBtn");
const cancelBtn = document.querySelector("#cancelBtn");
const form = document.querySelector("#eventForm");
const formTitle = document.querySelector("#formTitle");

const fetchEvents = async (page = 1) => {
	const query = new URLSearchParams({
		page,
		limit,
		search: searchTerm,
		category: selectedCategory,
		sortBy,
		order: sortOrder,
	});

	const data = await fetchAllEvents(`?${query.toString()}`);

	if (data?.error) {
		showToast("error", "Failed to upload events");
		return;
	}

	await renderAllEvents(data.events);
	
	const totalPages = Math.ceil(data.count / limit);
	
	// Render pagination
	renderPagination(paginationContainer, totalPages, page, fetchEvents);
};

const renderAllEvents = (events) => {
	eventTableBody.innerHTML = "";

	events.forEach((event) => {
		const eventRow = document.createElement("tr");

		eventRow.dataset.id = event.id;
		eventRow.innerHTML = eventTabelTempleteHTML(event);

		addEventsButtonsAction(eventRow);
		eventTableBody.appendChild(eventRow);
	});
};

const eventTabelTempleteHTML = (event) => {
	const { title, venue, price, imageUrl } = event;
	const date = formatCustomDate(event.date);

	return `
        <td><img class="event-image" src="/images/events/${imageUrl}"></td>
        <td>${title}</td>
        <td>${date}</td>
        <td>${venue}</td>
        <td>$${parseFloat(price).toFixed(2)}</td>
        <td class="actions">
            <button class="edit"><span class="material-symbols-outlined">edit</span></button>
            <button class="delete"><span class="material-symbols-outlined">delete</span></button>
        </td>
      `;
};

const addEventsButtonsAction = (eventRow) => {
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

// Add event
const addNewEvent = async (e) => {
	e.preventDefault();

	try {

		const formData = new FormData();
	
		formData.append("title", form.querySelector("#event-name").value);
		formData.append("date", convertDate(form.querySelector("#event-date").value, form.querySelector("#event-time").value));
		formData.append("venue", form.querySelector("#event-venue").value);
		formData.append("categoryId", form.querySelector(".category-select").selectedOptions[0]?.dataset.id);
		formData.append("description", form.querySelector("#event-description").value);
		formData.append("price", parseFloat(form.querySelector("#event-price").value));
		formData.append("address", form.querySelector("#event-address").value);
		formData.append("location", form.querySelector("#event-location").value);
	
		const fileInput = form.querySelector("#event-image");
		if (fileInput.files.length > 0) {
			formData.append("eventImg", fileInput.files[0]);
		}
	
		const data = await createEvent(formData);

		if (data?.error) {
			let firstErrorMessage = "Something went worng";

			if(Array.isArray(data?.message?.errors) && data?.message?.errors.length > 0) {
				firstErrorMessage = data.message.errors[0].message;
			} else if (data?.message?.message) {
				firstErrorMessage = data.message.message
			} else if (typeof data?.message === "string") {
				firstErrorMessage = data.message
			}

			showToast("error", `${firstErrorMessage}`);
		} else {
			showToast("success", "Event created successfully");
			form.reset();
			closeModal();
		}
	} catch (err) {
		console.error("Unexpected Error:", err);
		showToast("error", err.message || "Unexpected error occurred");
	}
};

const addEventBtnAction = (e) => {
	openModal();
	form.addEventListener("submit", (e) => addNewEvent(e));
}

// Edit event

const editEventBtnAction = async (e) => {
	const editBtn = e.target.closest(".actions .edit");
	if (!editBtn) return;

	openModal(true);

	const eventId = editBtn.closest("tr").dataset.id;
	const event = await fetchEventByID(eventId);

	if (!event) {
		showToast("error", "Failed to fetch event, Please try again later");
		closeModal();
		return;
	}

	const eventDateAndTime = formatDateTime(event.event.date);

	const getCategoryName = (categoryId) => {
		const select = document.querySelector(".category-select");
		return Array.from(select.options).find(
			(option) => option.dataset.id === categoryId
		);
	};

	// Fill form and store original values
	originalEventData = {
		title: form.querySelector("#event-name").value = event.event.title,
		venue: form.querySelector("#event-venue").value = event.event.venue,
		description: form.querySelector("#event-description").value = event.event.description,
		price: form.querySelector("#event-price").value = event.event.price.toString(),
		date: form.querySelector("#event-date").value = eventDateAndTime.date,
		time: form.querySelector("#event-time").value = eventDateAndTime.time,
		address: form.querySelector("#event-address").value = event.event.address,
		location: form.querySelector("#event-location").value = event.event.location,
		category: form.querySelector(".category-select").value = getCategoryName(event.event.categoryId)?.value || ""
	};

	form.onsubmit = (e) => updateEvent(e, eventId);
};

const updateEvent = async (e, eventId) => {
	e.preventDefault();

	const updatedFields = {};

	const currentValues = {
		title: form.querySelector("#event-name").value,
		venue: form.querySelector("#event-venue").value,
		description: form.querySelector("#event-description").value,
		price: form.querySelector("#event-price").value,
		date: form.querySelector("#event-date").value,
		time: form.querySelector("#event-time").value,
		address: form.querySelector("#event-address").value,
		location: form.querySelector("#event-location").value,
		category: form.querySelector(".category-select").value,
	};

	for (const key in currentValues) {
		if (currentValues[key] !== originalEventData[key]) {
			updatedFields[key] = currentValues[key];
		}
	}

	if (Object.keys(updatedFields).length === 0) {
		showToast("error", "No changes made.");
		return;
	}

	try {
		const data = await updatedEventById(eventId, updatedFields);

		if (data?.error) {
			let firstErrorMessage = "Something went wrong";

			if (Array.isArray(data?.message?.errors) && data?.message?.errors.length > 0) {
				firstErrorMessage = data.message.errors[0].message;
			} else if (data?.message?.message) {
				firstErrorMessage = data.message.message;
			} else if (typeof data?.message === "string") {
				firstErrorMessage = data.message;
			}

			showToast("error", `${firstErrorMessage}`);
		} else {
			showToast("success", "Event updated successfully.");
			form.reset();
			closeModal();
		}
	} catch (err) {
		console.error("Update Error:", err);
		showToast("error", "Unexpected error occurred while updating.");
	}
};

function openModal(isEdit = false) {
	modal.classList.remove("hidden");
	formTitle.textContent = isEdit ? "Edit Event" : "Add Event";
}

function closeModal() {
	modal.classList.add("hidden");
	form.reset();
}

eventTableBody.addEventListener("click", (e) => editEventBtnAction(e));
addEventBtn.addEventListener("click", (e) => addEventBtnAction(e));
cancelBtn.addEventListener("click", closeModal);
document.addEventListener("DOMContentLoaded", () => {
	renderCategoriesSelect();
	fetchEvents();
});
