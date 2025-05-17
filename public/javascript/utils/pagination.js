export function renderPagination(
	container,
	totalPages,
	currentPage,
	onPageChange,
	options = {},
) {
	if (totalPages <= 0 || currentPage <= 0 || currentPage > totalPages) {
		console.error("Invalid pagination parameters");
		return;
	}

	const nextBtn = container.querySelector(".next-btn");
	const prevBtn = container.querySelector(".prev-btn");
	const pageNumbersContainer = container.querySelector(".page-numbers");

	if (!nextBtn || !prevBtn || !pageNumbersContainer) {
		console.error("Missing pagination structure");
		return;
	}

	pageNumbersContainer.innerHTML = "";

	const { maxVisibleButtons = 5 } = options;

	let half = Math.floor(maxVisibleButtons / 2);
	let startPage = currentPage - half;
	let endPage = currentPage + half;

	// Adjust bounds
	if (startPage < 1) {
		endPage += 1 - startPage;
		startPage = 1;
	}
	if (endPage > totalPages) {
		startPage -= endPage - totalPages;
		endPage = totalPages;
	}
	startPage = Math.max(startPage, 1);

	// Ensure not more than maxVisibleButtons
	let visiblePages = endPage - startPage + 1;
	if (visiblePages > maxVisibleButtons) {
		endPage = startPage + maxVisibleButtons - 1;
	}

	for (let i = startPage; i <= endPage; i++) {
		const button = document.createElement("button");
		button.className =
			i === currentPage ? "page-number current" : "page-number";
		button.textContent = i;
		button.setAttribute("aria-label", `Go to page ${i}`);

		if (i === currentPage) {
			button.setAttribute("aria-current", "page");
			button.disabled = true;
		}

		button.addEventListener("click", () => onPageChange(i));
		pageNumbersContainer.appendChild(button);
	}

	// Update prev/next buttons
	prevBtn.disabled = currentPage === 1;
	nextBtn.disabled = currentPage === totalPages;

	prevBtn.setAttribute("aria-label", "Previous page");
	nextBtn.setAttribute("aria-label", "Next page");

	// Replace buttons to remove old listeners
	const newPrevBtn = prevBtn.cloneNode(true);
	const newNextBtn = nextBtn.cloneNode(true);

	prevBtn.replaceWith(newPrevBtn);
	nextBtn.replaceWith(newNextBtn);

	newPrevBtn.addEventListener("click", () => {
		if (currentPage > 1) onPageChange(currentPage - 1);
	});

	newNextBtn.addEventListener("click", () => {
		if (currentPage < totalPages) onPageChange(currentPage + 1);
	});
}
