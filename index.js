import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import logger from "./config/logger.js";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";
import { PrismaClient } from "@prisma/client";

// eslint-disable-next-line no-unused-vars
const config = dotenv.config();
const app = express();
// eslint-disable-next-line no-undef
const port = process.env.PORT;
const prisma = new PrismaClient();
const morganFormat = ":method :url :status :response-time ms";

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));
app.set("view engine", "ejs");

// Morgan middleware
app.use(
	morgan(morganFormat, {
		stream: {
			write: (message) => {
				const logObject = {
					method: message.split(" ")[0],
					url: message.split(" ")[1],
					status: message.split(" ")[2],
					responseTime: message.split(" ")[3],
				};
				// Log to file using winston
				logger.info(JSON.stringify(logObject));

				// Log to console (this will ensure it's printed in the terminal)
				console.log(message.trim());
			},
		},
	}),
);

// limiter configration
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100,
	standardHeaders: "draft-8",
	legacyHeaders: false,
});

// Apply the rate limiting middleware to all requests.
app.use(limiter);

// Middleware to disconnect Prisma after shutdown
app.use(async (req, res, next) => {
	try {
		await prisma.$disconnect();
	} catch (error) {
		console.error("Error disconnecting Prisma:", error);
	}
	next();
});

app.get("/", (req, res) => {
	res.send("Hello World! 2");
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
