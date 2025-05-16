import passport from "passport";
import logger from "../config/logger.js";
import catchAsync from "../utils/catchAsync.js";
import { loginUser, signupUser } from "../services/auth.js";
import { generateAuthToken } from "../utils/generateToken.js";

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

	res.cookie("auth_token", token, {
		httpOnly: true,
		maxAge: maxAge * 1000,
		secure: false,
		sameSite: "lax",
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

	res.cookie("auth_token", token, {
		httpOnly: true,
		maxAge: maxAge * 1000,
		secure: false,
		sameSite: "lax",
	});

	res.status(200).json({
		message: "User logedin successfully.",
		id: user.id,
	});
});

export const logoutGet = (req, res) => {
	logger.info("Json token removed successfully");
	res.cookie("auth_token", "");
	res.redirect("/");
};

// *************************
// *                       *
// *    GOOGLE OUTH 2.0    *
// *                       *
// *************************

export const googleOAuthController = passport.authenticate("google", {
	scope: ["profile", "email"], // Define what you need to retrive from the user profile. like profile info, emails or other info
});

export const googleOAthCallbackController = catchAsync((req, res) => {
	/**
	 * After the user sign-in or login, it's redirect to this endpoint that
	 * you define in passport-config.js file. Then go ot passport callback function.
	 * so you add this middleware 'passport.authenticate('google')'. this middleware
	 */

	const { token } = req.user;
	const maxAge = 12 * 60 * 60;
	res.cookie("auth_token", token, { httpOnly: true, maxAge: maxAge * 1000 });
	res.redirect("/");
});
