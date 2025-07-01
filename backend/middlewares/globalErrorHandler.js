const globalErrorHandler = (err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	const status = err.status || "error";
	const message = err.message || "Something went wrong";
	const description = err.description || "Internal Server Error";

	res.status(statusCode).json({
		error: true,
		statusCode,
		status,
		message,
		description,
	});
};

export default globalErrorHandler;
