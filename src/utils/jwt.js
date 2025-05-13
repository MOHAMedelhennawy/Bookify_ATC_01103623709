import jwt from "jsonwebtoken";

export const verifyToken = (token) =>
	new Promise((resolve, reject) => {
		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if (err) return reject(err);
			resolve(decoded);
		});
	});
