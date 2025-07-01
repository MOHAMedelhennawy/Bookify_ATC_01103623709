import jwt from "jsonwebtoken";
import logger from "../config/logger.js";

export const generateAuthToken = (id, maxAge = 12 * 60 * 60) => {
	logger.info("Generate Auth Token");
	const token = jwt.sign(
		{
			id,
		},
		// eslint-disable-next-line no-undef
		process.env.JWT_SECRET,
		{ expiresIn: maxAge },
	);
	return token;
};
