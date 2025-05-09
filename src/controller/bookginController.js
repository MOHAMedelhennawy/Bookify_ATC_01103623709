import {
	getAllUserBookingServices,
	addNewBookingServices,
	deleteBookingService,
} from "../services/bookings.js";

import catchAsync from "../utils/catchAsync.js";
import logger from "../utils/logger.js";

export const getAllUserBookingController = catchAsync(async (req, res) => {
	const bookings = await getAllUserBookingServices(req.params.userId);

	res.status(200).json({
		message: "User bookings fetched successfully.",
		bookings,
	});

	logger.info("User bookings fetched successfully.");
});

export const addNewBookingController = catchAsync(async (req, res) => {
	const { userId, eventId } = req.body;
	// const userId = req.user.id;
	// const eventId = req.params.eventId;

	const newBooking = await addNewBookingServices(userId, eventId);

	res.status(201).json({
		message: "Booking created successfully.",
		newBooking,
	});
});

export const deleteBookingController = catchAsync(async (req, res) => {
	const { userId, eventId } = req.body;

	await deleteBookingService(userId, eventId);

	res.status(202).json({
		message: "Bookgin deleted successfully.",
	});
});
