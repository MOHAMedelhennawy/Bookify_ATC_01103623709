import logger from "../utils/logger.js";
import catchAsync from "../utils/catchAsync.js";
import {
	getAllEventsServices,
	getEventByIdServices,
	addNewEventServices,
	updateEventByIdServices,
	deleteEventByIdServices,
} from "../services/events.js";

export const getAllEventsController = catchAsync(async (req, res) => {
	const events = await getAllEventsServices();

	res.status(200).json({
		message: "Events fetched successfully",
		events,
	});

	logger.info("Events fetched successfully");
});

export const getEventByIdController = catchAsync(async (req, res) => {
	const { id } = req.params;
	const event = await getEventByIdServices(id);

	res.status(200).json({
		message: "Event fetched successfully",
		id,
		event,
	});
});

export const addNewEventController = catchAsync(async (req, res) => {
	const newEvent = await addNewEventServices(req.body);

	res.status(201).json({
		message: "Event created successfully",
		newEvent,
	});

	logger.info("Event created successfully");
});

export const updateEventByIdController = catchAsync(async (req, res) => {
	const { id } = req.params;
	const updatedEvent = await updateEventByIdServices(id, req.body);

	res.status(200).json({
		message: "Event updated successfully.",
		id,
		data: updatedEvent,
	});

	logger.info(`Event with id ${id} updated successfully.`);
});

export const deleteEventByIdController = catchAsync(async (req, res) => {
	const { id } = req.params;
	await deleteEventByIdServices(id);

	res.status(202).json({
		message: "Event deleted successfull",
		id,
	});

	logger.info(`Event with id ${id} deleted successfull.`);
});
