import logger from "../config/logger.js";
import { findUserById } from "../services/auth.js";
import { verifyToken } from "../utils/jwt.js";
import AppError from "../utils/AppError.js";

export const authRequire = async (req, res, next) => {
	const token = req.cookies.auth_token;

	if (!token) {
		throw new AppError(
			"Unauthorized",
			401,
			"You're not logged in. Please login and try again.",
			true,
		);
	}

	try {
		const decoded = await verifyToken(token);
		const user = await findUserById(decoded.id);
		res.locals.user = user; // save to req if needed later
		next();
	} catch (err) {
		logger.error("Auth failed:", err.message);

		throw new AppError(
			"Unauthorized",
			401,
			"You're not logged in. Please login and try again.",
			true,
		);
	}
};

export const checkCurrentUser = async (req, res, next) => {
	const token = req.cookies.auth_token;
	if (!token) {
		res.locals.user = null;
		return next();
	}

	try {
		const decoded = await verifyToken(token);
		const user = await findUserById(decoded.id);

		res.locals.user = user || null;
	} catch (err) {
		logger.error("Auth check failed:", err.message);
		res.locals.user = null;
	}

	next();
};

export const checkUserPrivlages = (req, res, next) => {
	const user = res?.locals?.user;

	if (!user || user.role !== "ADMIN") {
		res.redirect("/");
		throw new AppError(
			"Forbiden",
			403,
			"Only admin have privlages for this operations",
			true,
		);
	}

	next();
};
