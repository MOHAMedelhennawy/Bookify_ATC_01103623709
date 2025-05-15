import { checkUser } from "../api/auth.js";
import { showToast } from "/javascript/utils/showToast.js";

document.addEventListener("DOMContentLoaded", () => {
	const form = document.querySelector("form");

	form.addEventListener("submit", async (e) => {
		e.preventDefault();

		const email = form.querySelector(".email-field").value;
		const password = form.querySelector(".password-field").value;

		const user = await checkUser({ email, password });

		if (user?.error) {
			showToast("error", user.message.description);
		} else {
			showToast("success", "Logedin successfully");
			setTimeout(() => {
				window.location.href = "/";
			}, 1000);
		}
	});
});
