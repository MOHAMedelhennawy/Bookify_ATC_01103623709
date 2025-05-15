import { createNewUser } from "../api/auth.js";

document.addEventListener("DOMContentLoaded", () => {
	const form = document.querySelector("form");

	form.addEventListener("submit", async (e) => {
		e.preventDefault();

		// remove old error messages
		form
			.querySelectorAll(".error-message")
			.forEach((el) => (el.textContent = ""));

		const name = document.querySelector(".name-field").value;
		const email = document.querySelector(".email-field").value;
		const password = document.querySelector(".password-field").value;

		const data = await createNewUser({ name, email, password });

		if (data.error) {
			const errorMessages =
				typeof data.message === "object" ? data.message.errors : null;

			if (Array.isArray(errorMessages) && errorMessages.length > 0) {
				errorMessages.forEach((error) => {
					const field = error.instancePath.substring(1);
					const errorElement = form.querySelector(`.${field}-error`);

					if (errorElement) {
						errorElement.textContent = error.message;
					}
				});
			} else if (
				typeof data.message === "object" &&
				data.message.message === "Email already in use"
			) {
				const errorElement = form.querySelector(`.email-error`);
				if (errorElement) {
					errorElement.textContent =
						data.message.description || "Something went wrong.";
				}
			}
		} else {
			// redirect to home page
			window.location.href = "http://localhost:4000/";
		}
	});
});
