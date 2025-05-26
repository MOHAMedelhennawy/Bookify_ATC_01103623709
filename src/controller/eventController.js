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
import AppError from "../utils/AppError.js";

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

	if (!id) {
		throw new AppError(
			"Event id is missing!",
			400,
			"Please provide a valid event ID in the request.",
			true,
		);
	}

	const event = await getEventByIdServices(id);

	res.status(200).json({
		message: "Event fetched successfully",
		id,
		event,
	});
});

export const addNewEventController = catchAsync(async (req, res) => {
	const data = req.body;

	if (!data || typeof data !== "object") {
		throw new AppError(
			"Missing event data",
			400,
			"The request is missing required event data. Please ensure all necessary fields are provided.",
			true,
		);
	}

	// Create new event
	const newEvent = await addNewEventServices(data);

	// Send response
	res.status(201).json({
		message: "Event created successfully",
		newEvent,
	});

	logger.info("Event created successfully");
});

export const updateEventByIdController = catchAsync(async (req, res) => {
	const { id } = req.params;
	const data = req.body;

	if (!id) {
		throw new AppError(
			"Event id is missing!",
			400,
			"Please provide a valid event ID in the request.",
			true,
		);
	}

	console.log(data);
	if (!data || typeof data !== "object") {
		throw new AppError(
			"Missing event data",
			400,
			"The request is missing required event data. Please ensure all necessary fields are provided.",
			true,
		);
	}

	const updatedEvent = await updateEventByIdServices(id, data);

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
