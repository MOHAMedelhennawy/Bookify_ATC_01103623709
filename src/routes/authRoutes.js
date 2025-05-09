import express from "express";
import { loginPost, signupPost } from "../controller/authController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import {
	loginSchema,
	signupSchema,
} from "../middlewares/schemas/auth.schema.js";

const router = express.Router();

// router.get("/login");
router.post("/login", validateSchema(loginSchema), loginPost);
// router.get("/signup");
router.post("/signup", validateSchema(signupSchema), signupPost);

export default router;
