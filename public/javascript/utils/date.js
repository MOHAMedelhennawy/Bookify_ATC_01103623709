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
	let [hours, minutes] = timePart.split(":");
	hours = hours.padStart(2, "0");

	const isoString = `${datePart}T${hours}:${minutes}:33.244Z`;
	return new Date(isoString);
};