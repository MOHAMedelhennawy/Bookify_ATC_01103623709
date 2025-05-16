import jwt from "jsonwebtoken";
import logger from "../config/logger.js";
import { findUserById } from "../services/auth.js";
import { verifyToken } from "../utils/jwt.js";

export const authRequire = async (req, res, next) => {
	const token = req.cookies.auth_token;

	if (!token) {
		return res.redirect("/"); // Not authenticated
	}

	try {
		const decoded = await verifyToken(token);
		req.locals.user = decoded; // save to req if needed later
		next();
	} catch (err) {
		logger.error("Auth failed:", err.message);
		return res.redirect("/");
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
