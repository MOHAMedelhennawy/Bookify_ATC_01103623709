import dotenv from "dotenv";
import app from "./app.js";
import logger from "./config/logger.js";

// Load environment variables
dotenv.config();

const port = process.env.PORT || 3000;

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
	logger.error("UNCAUGHT EXCEPTION 💥 Shutting down...");
	logger.error(err);
	process.exit(1);
});

// Start server
const server = app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
	logger.error("UNHANDLED REJECTION 💥 Shutting down...");
	logger.error(err);
	server.close(() => {
		process.exit(1);
	});
});
