import express from "express";
import {
	loginPost,
	signupPost,
	logoutGet,
} from "../controller/authController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import {
	loginSchema,
	signupSchema,
} from "../middlewares/schemas/auth.schema.js";

const router = express.Router();

router.get("/login", (req, res) => {
	res.render("login");
});

router.post("/login", validateSchema(loginSchema), loginPost);

router.get("/signup", (req, res) => {
	res.render("signup");
});

router.post("/api/signup", validateSchema(signupSchema), signupPost);

router.get("/logout", logoutGet);

export default router;
