import { fetchEvents } from "../fetchEvents.js";
import { getFilter, setFilter } from "./filterState.js";

export function filterHandlers(renderAllEvents) {
	function eventName(searchInput) {
		let searchDebounce;

		clearTimeout(searchDebounce);
		searchDebounce = setTimeout(async () => {
			setFilter("searchTerm", searchInput.value.trim());
			await fetchEvents(renderAllEvents, 1);
		}, 400);
	}

	async function eventCategory(categorySelect) {
		setFilter("selectedCategory", categorySelect.value);
		await fetchEvents(renderAllEvents, 1);
	}

	async function sorting(clickedBtn) {
		let sortBy = clickedBtn.querySelector("p").textContent.toLowerCase();

		sortBy = sortBy === "name" ? "title" : sortBy;

		// Toggle between asc/desc on repeated clicks
		let sortOrder = getFilter("sortOrder");
		sortOrder = sortOrder === "asc" ? "desc" : "asc";
		sortBy += `,${sortOrder}`;

		setFilter("sortBy", sortBy);
		setFilter("sortOrder", sortOrder);

		await fetchEvents(renderAllEvents, 1);
	}

	return {
		eventName,
		eventCategory,
		sorting,
	};
}
