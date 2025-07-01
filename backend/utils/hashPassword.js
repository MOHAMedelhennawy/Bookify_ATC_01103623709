import bcrypt from "bcrypt";
import AppError from "./AppError.js";

const hashPassword = async (password) => {
	try {
		if (typeof password !== "string" || !password) {
			throw new AppError(
				"Invalid password input",
				400,
				"Password must be a non-empty string",
			);
		}
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		return hashedPassword;
	} catch (error) {
		throw new AppError("Password hashing failed", 500, error.message);
	}
};

export default hashPassword;
