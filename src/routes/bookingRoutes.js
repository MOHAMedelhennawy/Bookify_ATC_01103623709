import express from "express";
import {
	getAllUserBookingController,
	addNewBookingController,
	deleteBookingController,
} from "../controller/bookginController.js";

const router = express.Router();

// Routes
router.get("/:userId", getAllUserBookingController);
// router.get("/:id", );
router.post("/", addNewBookingController);
router.delete("/", deleteBookingController);

export default router;
