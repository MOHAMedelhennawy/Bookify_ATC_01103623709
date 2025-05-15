import express from "express";
import {
	getAllEventsController,
	getEventByIdController,
	addNewEventController,
	updateEventByIdController,
	deleteEventByIdController,
} from "../controller/eventController.js";
import {
	eventSchemaPost,
	eventSchemaPut,
} from "../middlewares/schemas/event.schema.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { authRequire, checkCurrentUser } from "../middlewares/authMW.js";
// import { upload } from "../app.js";

const router = express.Router();

// Routes
router.get("/", getAllEventsController);
router.get("/:id", getEventByIdController);
router.post(
	"/",
	validateSchema(eventSchemaPost),
	// upload.single("file"),
	addNewEventController,
);
router.put("/:id", validateSchema(eventSchemaPut), updateEventByIdController);
router.delete("/:id", deleteEventByIdController);

export default router;
