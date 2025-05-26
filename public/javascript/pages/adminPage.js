/* eslint-disable prettier/prettier */
import { renderCategoriesSelect } from "../main.js";
import { fetchEvents } from "../utils/fetchEvents.js"
import { eventTabelTempleteHTML } from "../components/eventTable.js";
import { addEventBtn, cancelBtn, eventTableBody } from "../utils/init/admin/eventFormSelectors.js";
import {
	addEventBtnAction,
	addEventsButtonsAction,
	closeModal,
	editEventBtnAction,
} from "../utils/init/admin/adminListeners.js";
import { renderPagination } from "../utils/pagination.js";

const renderEventsInAdmin = (events) => {
	eventTableBody.innerHTML = "";

	events.forEach((event) => {
		const eventRow = document.createElement("tr");

		eventRow.dataset.id = event.id;
		eventRow.innerHTML = eventTabelTempleteHTML(event);

		addEventsButtonsAction(eventRow);
		eventTableBody.appendChild(eventRow);
	});
};

const loadAdminEvents = async (page = 1) => {
	const paginationContainer = document.querySelector(".pagination");
	const data = await fetchEvents(renderEventsInAdmin, page);

	if (!data) return;

	renderPagination(paginationContainer, data.count, page, loadAdminEvents);
}

eventTableBody.addEventListener("click", (e) => editEventBtnAction(e));
addEventBtn.addEventListener("click", (e) => addEventBtnAction(e));
cancelBtn.addEventListener("click", closeModal);
document.addEventListener("DOMContentLoaded", async () => {
	renderCategoriesSelect();
	await loadAdminEvents()
});
