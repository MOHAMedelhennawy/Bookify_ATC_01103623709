import jwt from "jsonwebtoken";

export const generateAuthToken = (id, maxAge = 12 * 60 * 60) => {
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
