import { addNewBooking } from "./api/books.js";
import { fetchAllCategories } from "./api/category.js";
import { showToast } from "./utils/showToast.js";

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

export const addNewBookingBtnAction = async (bookingBtn, event) => {
	if (!event || !event?.id) {
		showToast("error", "Event id is required");
		return;
	}

	const booking = await addNewBooking(event.id);

	if (booking?.error) {
		showToast("error", booking.message.description);
		return;
	} else {
		bookingBtn.classList.add("booked");
		showToast("success", "Event booked successfully");
	}
};

document.addEventListener("DOMContentLoaded", () => {
	let lastScrollY = window.scrollY;
	const navbar = document.querySelector(".navbar");

	window.addEventListener("scroll", () => {
		const currentScrollY = window.scrollY;

		if (currentScrollY > lastScrollY && currentScrollY > 50) {
			navbar.style.top = "-80px";
		} else {
			navbar.style.top = "0";
		}

		lastScrollY = currentScrollY;
	});
});
