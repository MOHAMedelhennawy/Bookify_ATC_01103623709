import { fetchAllCategories } from "./api/category.js";

export const renderCategoriesSelect = async () => {
	const categorySelect = document.querySelector(".category-select");
	const data = await fetchAllCategories();

	categorySelect.innerHTML = `<option value="">All Categories</option>`;

	data.categories.forEach((category) => {
		const selectOptionElement = document.createElement("option");
		selectOptionElement.value = category.name;
		selectOptionElement.textContent = category.name;
		selectOptionElement.dataset.id = category.id;

		categorySelect.appendChild(selectOptionElement);
	});
};
