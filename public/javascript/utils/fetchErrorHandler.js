export const fetchErrorHandler = (fn) => {
	return async (...args) => {
		try {
			return await fn(...args);
		} catch (error) {
			console.error("Fetch Error:", error.message);

			let parsedMessage = error.message;

			try {
				if (
					typeof error.message === "string" &&
					error.message.trim().startsWith("{")
				) {
					parsedMessage = JSON.parse(error.message);
				}
			} catch (e) {
				//
			}

			return {
				error: true,
				message: parsedMessage,
			};
		}
	};
};
