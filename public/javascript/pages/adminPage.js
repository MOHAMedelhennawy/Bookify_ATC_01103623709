import { createEvent, deleteEventById, fetchAllEvents } from "../api/events.js";
import { renderCategoriesSelect } from "../main.js";
import { formatCustomDate } from "../utils/date.js";
import { convertDate } from "../utils/date.js";
import { renderPagination } from "../utils/pagination.js";
import { showToast } from "../utils/showToast.js";

const limit = 12;
const eventTableBody = document.querySelector("#eventTableBody");
const paginationContainer = document.querySelector(".pagination");
const modal = document.querySelector("#eventModal");
const addEventBtn = document.querySelector(".addEventBtn");
const cancelBtn = document.querySelector("#cancelBtn");
const form = document.querySelector("#eventForm");
const formTitle = document.querySelector("#formTitle");

const fetchEvents = async (page = 1) => {
	// Get data
	const data = await fetchAllEvents(page, limit);

	// Render data
	renderAllEvents(data.events);

	// Render pagination
	renderPagination(paginationContainer, data.count, page, fetchEvents);
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
	const { title, venue, price } = event;
	const date = formatCustomDate(event.date);

	return `
        <td><img class="event-image" src="/images/events/al-elmes-ULHxWq8reao-unsplash.jpg"></td>
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

const addNewEvent = async (e) => {
	e.preventDefault();

	const title = form.querySelector("#event-name").value;
	const date = form.querySelector("#event-date").value;
	const time = form.querySelector("#event-time").value;
	const description = form.querySelector("#event-description").value;
	const venue = form.querySelector("#event-venue").value;
	const address = form.querySelector("#event-address").value;
	const location = form.querySelector("#event-location").value;
	const imageUrl = form.querySelector("#event-image").value;
	let price = form.querySelector("#event-price").value;

	const categorySelect = form.querySelector(".category-select");
	const categoryId = categorySelect.selectedOptions[0]?.dataset.id;

	const convertedDateFormat = convertDate(date, time);

	if (date && Number(price)) {
		price = parseFloat(price);
	}

	const data = await createEvent({
		title,
		date: convertedDateFormat,
		venue,
		categoryId,
		description,
		price,
		imageUrl,
		address,
		location,
	});

	console.log(data);
	if (data?.error) {
		const firstErrorMessage = data.message.errors[0].message;
		showToast("error", `${firstErrorMessage}`);
	} else {
		showToast("success", "Event created successfully");
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

addEventBtn.addEventListener("click", () => openModal());
cancelBtn.addEventListener("click", closeModal);
form.addEventListener("submit", (e) => addNewEvent(e));
document.addEventListener("DOMContentLoaded", () => {
	renderCategoriesSelect();
	fetchEvents();
});
