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
import { checkCurrentUser, checkUserPrivlages } from "../middlewares/authMW.js";

const router = express.Router();

// Routes
router.get("/", getAllEventsController);
router.get("/:id", getEventByIdController);
router.post(
	"/",
	checkCurrentUser,
	checkUserPrivlages,
	upload.single("eventImg"),
	prepareBodyTypesMiddleware,
	validateSchema(eventSchemaPost),
	addNewEventController,
);
router.put(
	"/:id",
	prepareBodyTypesMiddleware,
	validateSchema(eventSchemaPut),
	updateEventByIdController,
);
router.delete("/:id", deleteEventByIdController);

export default router;
