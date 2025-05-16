import logger from "../config/logger.js";
import catchAsync from "../utils/catchAsync.js";
import {
	getAllEventsServices,
	getEventByIdServices,
	addNewEventServices,
	updateEventByIdServices,
	deleteEventByIdServices,
} from "../services/events.js";
import { getQueryObject } from "../utils/getQuery.js";

export const getAllEventsController = catchAsync(async (req, res) => {
	// Pagination, filteration, sorting
	const queryObject = await getQueryObject(req);
	const { events, count } = await getAllEventsServices(queryObject);

	res.status(200).json({
		message: "Events fetched successfully",
		page: req.query.page || 1,
		limit: queryObject.take,
		events,
		count,
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
	console.log(req.body);
	console.log(typeof req.body);
	if (!req.file) {
		return res.status(400).json({ message: "Image file is required" });
	}
	req.body.imageUrl = req.file.filename;

	// Create new event
	const newEvent = await addNewEventServices(req.body);

	// Send response
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
