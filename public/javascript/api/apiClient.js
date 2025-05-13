export const apiClient = async (url, options = {}) => {
	const defaultHeaders = {
		"Content-Type": "application/json",
	};

	const res = await fetch(url, {
		headers: { ...defaultHeaders, ...options.headers },
		...options,
	});

	if (!res.ok) {
		const errorText = await res.text();
		throw new Error(errorText || "Unknown error");
	}

	return await res.json();
};
