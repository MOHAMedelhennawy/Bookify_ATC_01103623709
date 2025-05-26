export let originalEventData = {};
export const eventTableBody = document.querySelector("#eventTableBody");
export const modal = document.querySelector("#eventModal");
export const addEventBtn = document.querySelector(".addEventBtn");
export const cancelBtn = document.querySelector("#cancelBtn");
export const form = document.querySelector("#eventForm");
export const formTitle = document.querySelector("#formTitle");

export const getInputValue = (selector) => {
	return form.querySelector(selector)?.value;
};

export const setInputValue = (selector, value) => {
	const input = form.querySelector(selector);
	if (input) input.value = value;
	return value;
};

// eslint-disable-next-line prettier/prettier
export const setOriginalEventData = (event, eventDateAndTime, category) => {
	const categoryId = form.querySelector(".category-select").selectedOptions[0]?.dataset.id;

	originalEventData = {
		title: setInputValue("#event-name", event.title),
		venue: setInputValue("#event-venue", event.venue),
		description: setInputValue("#event-description", event.description),
		price: setInputValue("#event-price", event.price.toString()),
		date: setInputValue("#event-date", eventDateAndTime.date),
		time: setInputValue("#event-time", eventDateAndTime.time),
		address: setInputValue("#event-address", event.address),
		location: setInputValue("#event-location", event.location),
		category: setInputValue(".category-select", category.value),
		eventImg: form.querySelector("#event-image").files[0],
		categoryId: category.dataset.id,
	};

	return originalEventData;
};
