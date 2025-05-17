import express from "express";
import passport from "passport";
import {
	loginPost,
	signupPost,
	logoutGet,
	googleOAuthController,
	googleOAthCallbackController,
} from "../controller/authController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import {
	loginSchema,
	signupSchema,
} from "../middlewares/schemas/auth.schema.js";
import { checkCurrentUser } from "../middlewares/authMW.js";

const router = express.Router();

router.get("/login", (req, res) => {
	res.render("login");
});

router.post("/api/login", validateSchema(loginSchema), loginPost);

router.get("/signup", (req, res) => {
	res.render("signup");
});

router.post("/api/signup", validateSchema(signupSchema), signupPost);

router.get("/logout", checkCurrentUser, logoutGet);

// Google OAuth
router.get("/auth/google", googleOAuthController);

router.get(
	"/auth/google/callback",
	passport.authenticate("google", { session: false }),
	googleOAthCallbackController,
);

export default router;
