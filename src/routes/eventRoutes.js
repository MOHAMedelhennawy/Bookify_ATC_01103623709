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
import { authRequire } from "../middlewares/authMW.js";

const router = express.Router();

// Routes
router.get("/", getAllEventsController);
router.get("/:id", getEventByIdController);
router.post(
	"/",
	authRequire,
	validateSchema(eventSchemaPost),
	addNewEventController,
);
router.put(
	"/:id",
	authRequire,
	validateSchema(eventSchemaPut),
	updateEventByIdController,
);
router.delete("/:id", authRequire, deleteEventByIdController);

export default router;
