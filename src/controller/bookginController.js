import {
	getAllUserBookingServices,
	addNewBookingServices,
	deleteBookingService,
	checkExistBooking,
} from "../services/bookings.js";
import AppError from "../utils/AppError.js";

import catchAsync from "../utils/catchAsync.js";
import logger from "../utils/logger.js";

export const getAllUserBookingController = catchAsync(async (req, res) => {
	const user = res.locals.user;

	if (!user || !user.id) {
		throw new AppError(
			"User ID is missing",
			400,
			"Please provide a valid user ID in the request.",
			true,
		);
	}

	const bookings = await getAllUserBookingServices(user.id);

	res.status(200).json({
		message: "User bookings fetched successfully.",
		bookings,
	});

	logger.info("User bookings fetched successfully.");
});

export const addNewBookingController = catchAsync(async (req, res) => {
	const user = res.locals.user;
	const { eventId } = req.body;

	if (!user || !user.id) {
		throw new AppError(
			"User ID is missing",
			400,
			"You need to be logged in to perform this action. Please log in and try again",
			true,
		);
	}

	if (!eventId) {
		throw new AppError(
			"Event ID is missing",
			400,
			"Please provide a valid event ID in the request.",
			true,
		);
	}

	const bookingAlreadyExists = await checkExistBooking(user.id, eventId);

	if (bookingAlreadyExists) {
		throw new AppError(
			"Event already exists",
			400,
			"You have already booked this event.",
			true,
		);
	}

	const newBooking = await addNewBookingServices(user.id, eventId);

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
