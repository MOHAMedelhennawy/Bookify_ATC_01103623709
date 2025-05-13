import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";
import { findUser } from "../services/auth.js";
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
		const user = await findUser(decoded.id);
		res.locals.user = user;
	} catch (err) {
		logger.error("Auth check failed:", err.message);
		res.locals.user = null;
	}

	next();
};
