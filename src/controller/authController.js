import { loginUser, signupUser } from "../services/auth.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import { generateAuthToken } from "../utils/generateToken.js";
import hashPassword from "../utils/hashPassword.js";
import logger from "../utils/logger.js";

// export const signupGet = () => {
//     render();
// };
//
// export const loginGet = () => {
//     render();
// };

export const signupPost = catchAsync(async (req, res) => {
	const { name, email, password } = req.body;

	// Save user on the database
	const user = await signupUser(name, email, password);

	// Create auth token
	const maxAge = 12 * 60 * 60;
	const token = generateAuthToken(user.id, maxAge);

	res.cookie("__Secure-auth_token", token, {
		httpOnly: true,
		maxAge: maxAge * 1000,
	});

	// Send response
	res.status(201).json({
		message: "User signup successfully",
		user,
	});
});

export const loginPost = catchAsync(async (req, res) => {
	const { email, password } = req.body;

	const user = await loginUser(email, password);

	// Create auth token
	const maxAge = 12 * 60 * 60;
	const token = generateAuthToken(user.id, maxAge);

	res.cookie("__Secure-auth_token", token, {
		httpOnly: true,
		maxAge: maxAge * 1000,
	});

	res.status(200).json({
		message: "User logedin successfully.",
		id: user.id,
	});
});
