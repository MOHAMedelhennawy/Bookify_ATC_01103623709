import { formatCustomDate } from "../utils/date.js";

export const eventTabelTempleteHTML = (event) => {
	const { title, venue, price, imageUrl } = event;
	const date = formatCustomDate(event.date);

	return `
        <td><img class="event-image" src="/images/events/${imageUrl}"></td>
        <td>${title}</td>
        <td>${date}</td>
        <td>${venue}</td>
        <td>$${parseFloat(price).toFixed(2)}</td>
        <td class="actions">
            <button class="edit"><span class="material-symbols-outlined">edit</span></button>
            <button class="delete"><span class="material-symbols-outlined">delete</span></button>
        </td>
      `;
};
