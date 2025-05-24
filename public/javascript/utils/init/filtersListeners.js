import { filterHandlers } from "../filters/filterHandlers.js";

export function initFiltersListeners(renderAllEvents) {
	// Event listners
	const searchInput = document.querySelector(".search-input input");
	const categorySelect = document.querySelector(".category-select");
	const sortingButtons = document.querySelector(".sorting-buttons");

	const filterHandlersV = filterHandlers(renderAllEvents);

	searchInput.addEventListener(
		"input",
		async () => await filterHandlersV.eventName(searchInput),
	);

	categorySelect.addEventListener(
		"change",
		async () => await filterHandlersV.eventCategory(categorySelect),
	);

	sortingButtons.addEventListener("click", async (e) => {
		const clickedBtn = e.target.closest("button");
		await filterHandlersV.sorting(clickedBtn);
	});
}
