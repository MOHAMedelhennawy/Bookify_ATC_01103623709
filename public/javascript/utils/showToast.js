// public/javascript/utils/showToast.js

export function showToast(type, message) {
	const toast = document.getElementById("alert-toast");
	const msg = document.getElementById("alert-message");

	toast.className = "toast"; // Reset all classes
	toast.classList.add(type); // Add 'success' or 'error'
	msg.textContent = message;
	toast.classList.remove("hidden");

	setTimeout(() => {
		toast.classList.add("hidden");
	}, 4000);
}

export function closeToast() {
	document.getElementById("alert-toast").classList.add("hidden");
}
