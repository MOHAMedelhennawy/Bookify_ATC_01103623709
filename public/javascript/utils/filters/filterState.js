const filterState = {
	searchTerm: "",
	selectedCategory: "",
	sortBy: "",
	sortOrder: "asc",
	limit: 12,
};

export const setFilter = (key, value) => {
	filterState[key] = value;
};

export const getFilter = (key) => {
	return filterState[key];
};

export const getAllFilters = () => {
	return { ...filterState };
};
