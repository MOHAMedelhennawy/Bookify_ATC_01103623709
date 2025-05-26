import { showToast } from "./showToast.js";
import { fetchAllEvents } from "../api/events.js";
import { getAllFilters } from "./filters/filterState.js";

export const fetchEvents = async (renderEvents, page = 1) => {
	// eslint-disable-next-line prettier/prettier
	const { limit, searchTerm, selectedCategory, sortBy } = getAllFilters();

	const query = new URLSearchParams({
		page,
		limit,
		search: searchTerm,
		category: selectedCategory,
		sort: sortBy,
	});

	const data = await fetchAllEvents(`?${query.toString()}`);

	if (data?.error) {
		showToast("error", "Failed to upload events");
		return;
	}

	await renderEvents(data.events);

	const totalPages = Math.ceil(data.count / limit);

	return {
		count: totalPages,
		limit,
	};
};
