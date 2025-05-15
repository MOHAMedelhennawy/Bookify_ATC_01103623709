import express from "express";
import upload from "../config/multer.js";
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
import { prepareBodyTypesMiddleware } from "../middlewares/prepareBodyTypesMiddleware.js";

const router = express.Router();

// Routes
router.get("/", getAllEventsController);
router.get("/:id", getEventByIdController);
router.post(
	"/",
	upload.single("eventImg"),
	prepareBodyTypesMiddleware,
	validateSchema(eventSchemaPost),
	addNewEventController,
);
router.put("/:id", validateSchema(eventSchemaPut), updateEventByIdController);
router.delete("/:id", deleteEventByIdController);

export default router;
