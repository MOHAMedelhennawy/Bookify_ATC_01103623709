import express from "express";
import {
	getAllEventsController,
	getEventByIdController,
	addNewEventController,
	updateEventByIdController,
	deleteEventByIdController,
} from "../controller/eventController.js";

const router = express.Router();

// Routes
router.get("/", getAllEventsController);
router.get("/:id", getEventByIdController);
router.post("/", addNewEventController);
router.put("/:id", updateEventByIdController);
router.delete("/:id", deleteEventByIdController);

export default router;
