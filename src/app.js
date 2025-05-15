import path from "path";
// import multer from "multer";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";
import { PrismaClient } from "@prisma/client";
import logger from "./utils/logger.js";
import eventRoutes from "./routes/eventRoutes.js";
import authRouter from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import AppError from "./utils/AppError.js";
import { checkCurrentUser } from "./middlewares/authMW.js";

const app = express();
const prisma = new PrismaClient();
const morganFormat = ":method :url :status :response-time ms";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, "../views"));

// export const upload = multer({ dest: "../public/images/events" });

// Global Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));
app.set("view engine", "ejs");

// Morgan Logging
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
				logger.info(JSON.stringify(logObject));
				console.log(message.trim());
			},
		},
	}),
);

// Rate Limiter
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100,
	standardHeaders: "draft-8",
	legacyHeaders: false,
});
// app.use(limiter);

app.use((req, res, next) => {
	console.log("Incoming request path:", req.url);
	if (req.url.includes("://")) {
		return res.status(400).json({
			error: "Invalid URL Format",
			code: "INVALID_URL_PATH",
			message: "URL path contains invalid characters",
		});
	}
	next();
});

// Routes
app.get(/(.*)/, checkCurrentUser);
app.use("/", authRouter);
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/categories", categoryRoutes);
app.get("/", (req, res) => {
	res.render("home");
});
app.get("/admin", (req, res) => {
	res.render("admin");
});
// 404 Handler
app.all(/(.*)/, (req, res, next) => {
	next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));
});

// Global error middleware
app.use(globalErrorHandler);

// Optional: Prisma disconnect middleware
app.use(async (req, res, next) => {
	try {
		await prisma.$disconnect();
	} catch (error) {
		logger.error("Prisma disconnect error:", error);
	}
	next();
});

export default app;
