import express from "express";
import {
	getAllUserBookingController,
	addNewBookingController,
	deleteBookingController,
} from "../controller/bookginController.js";
import { authRequire } from "../middlewares/authMW.js";

const router = express.Router();

// Routes
router.get("/:userId", getAllUserBookingController);
// router.get("/:id", );
router.post("/", authRequire, addNewBookingController);
router.delete("/", authRequire, deleteBookingController);

export default router;
