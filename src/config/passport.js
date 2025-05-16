import passport from "passport";
import { generateAuthToken } from "../utils/generateToken.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import {
	findUserById,
	findUserByEmail,
	signupOAuthUser,
} from "../services/auth.js";
import AppError from "../utils/AppError.js";

// eslint-disable-next-line no-undef
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

// it's like app.use in the server to use middleware
passport.use(
	new GoogleStrategy(
		{
			// Options for the google strategy
			clientID: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
			callbackURL: "/auth/google/callback", // The path that auto redirect after choose you'r account to use
		},
		async (accessToken, refreshToken, profile, done) => {
			// check if user already eixist in our DB
			const currentUser = await findUserByEmail(profile.emails[0].value);

			if (currentUser) {
				// If User exist
				const token = await generateAuthToken(currentUser.id);
				done(null, { user: currentUser, token }); // After this go to the next stage: serialize
			} else {
				// If user not exist
				try {
					const newUser = await signupOAuthUser(
						profile.displayName,
						profile.emails[0].value,
						"null",
					);

					const token = await generateAuthToken(newUser.id);
					done(null, { user: newUser, token });
				} catch (error) {
					throw new AppError(`Failed to create new user.: ${error.message}`);
				}
			}
		},
	),
);

passport.serializeUser((user, done) => {
	done(null, user.id); // to store id on cookies
});

passport.deserializeUser(async (user, done) => {
	try {
		const checkUser = await findUserById(user.id);

		if (checkUser) {
			done(null, checkUser); // to retrieve user information with every request
		}
	} catch (error) {
		done(null, error);
		throw new AppError(error.message);
	}
});
