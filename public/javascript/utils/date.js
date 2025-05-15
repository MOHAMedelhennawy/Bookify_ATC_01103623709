
export function formatCustomDate(dateString) {
	const date = new Date(dateString.replace(" ", "T")); // Fix parsing for browsers
	const options = {
		month: "long",
		day: "numeric",
		year: "numeric",
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
	};

	return date
		.toLocaleString("en-US", options)
		.replace(/, /, " - ")
		.replace(" at ", " At ");
}

export const convertDate = (datePart, timePart) => {
	if (!datePart) {
		throw new Error("Event date is required");
	}

	if (!timePart) {
		throw new Error("Event time is required");
	}

	let [hours, minutes] = timePart.split(":");
	hours = hours.padStart(2, "0");

	const isoString = `${datePart}T${hours}:${minutes}:33.244Z`;
	return new Date(isoString).toISOString();
};

export function formatDateTime(datetimeStr) {
	const dateObj = new Date(datetimeStr.replace(" ", "T")); // Ensure ISO format

	if (isNaN(dateObj)) {
		throw new Error("Invalid date format");
	}

	const year = dateObj.getFullYear();
	const month = String(dateObj.getMonth() + 1).padStart(2, "0");
	const day = String(dateObj.getDate()).padStart(2, "0");
	const hours = String(dateObj.getHours()).padStart(2, "0");
	const minutes = String(dateObj.getMinutes()).padStart(2, "0");

	const formattedDate = `${year}-${month}-${day}`;    // "YYYY-MM-DD"
	const formattedTime = `${hours}:${minutes}`;        // "HH:mm"

	return { date: formattedDate, time: formattedTime };
};
