export function renderPagination(
	container,
	totalPages,
	currentPage,
	onPageChange,
	options = {},
) {
	// Validate inputs
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

	// Clear existing content
	pageNumbersContainer.innerHTML = "";

	// Configuration with defaults
	const { maxVisibleButtons = 5 } = options;

	// Calculate button range
	let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
	let endPage = startPage + maxVisibleButtons - 1;

	// Adjust if endPage exceeds totalPages
	if (endPage > totalPages) {
		endPage = totalPages;
		startPage = Math.max(1, endPage - maxVisibleButtons + 1);
	}

	// Create page buttons
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

	// Remove old listeners (to prevent duplicate calls)
	prevBtn.replaceWith(prevBtn.cloneNode(true));
	nextBtn.replaceWith(nextBtn.cloneNode(true));

	// Re-select buttons
	const newPrevBtn = container.querySelector(".prev-btn");
	const newNextBtn = container.querySelector(".next-btn");

	newPrevBtn.addEventListener("click", () => {
		if (currentPage > 1) onPageChange(currentPage - 1);
	});

	newNextBtn.addEventListener("click", () => {
		if (currentPage < totalPages) onPageChange(currentPage + 1);
	});
}
