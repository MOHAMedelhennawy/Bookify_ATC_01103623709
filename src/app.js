import path from "path";
import cors from "cors";
import helmet from "helmet";
import express from "express";
import { fileURLToPath } from "url";
import logger from "./config/logger.js";
import cookieParser from "cookie-parser";
import morganMW from "./config/morgan.js";
import limiter from "./config/limiter.js";
import AppError from "./utils/AppError.js";
import { PrismaClient } from "@prisma/client";
import authRouter from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import { checkCurrentUser, checkUserPrivlages } from "./middlewares/authMW.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import "./config/passport.js";

const app = express();
const prisma = new PrismaClient();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, "../views"));

// Global Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));
app.set("view engine", "ejs");

// Morgan Logging Middleware
app.use(morganMW);

// Rate Limiter Middleware
app.use(limiter);

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
// app.get(/(.*)/, checkCurrentUser);
app.use("/", authRouter);
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/categories", categoryRoutes);
// eslint-disable-next-line prettier/prettier
app.get("/", checkCurrentUser, (req, res) => { res.render("home") });
// eslint-disable-next-line prettier/prettier
app.get("/admin", checkCurrentUser, checkUserPrivlages, (req, res) => { res.render("admin") });
app.get("/event/:id", checkCurrentUser, (req, res, next) => res.render("event"));

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
