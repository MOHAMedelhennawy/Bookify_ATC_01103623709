import { PrismaClient } from "@prisma/client";
import { handlePrismaQuery } from "../utils/handlePrismaQuery.js";
import AppError from "../utils/AppError.js";
import logger from "../utils/logger.js";

const prisma = new PrismaClient();

export const checkExistBooking = (userId, eventId) => {
	return handlePrismaQuery(async () => {
		return await prisma.booking.findUnique({
			where: {
				userId_eventId: {
					userId,
					eventId,
				},
			},
		});
	});
};

export const getAllUserBookingServices = (userId) => {
	return handlePrismaQuery(async () => {
		if (!userId) {
			throw new AppError(
				"Missing user id",
				400,
				"The request is missing user id",
				true,
			);
		}

		const user = await prisma.User.findUnique({ where: { id: userId } });
		logger.info("User exist");

		if (!user) {
			throw new AppError(
				`No user found with ID: ${userId}`,
				400,
				"Make sure that user ID is correct",
				true,
			);
		}

		const bookings = await prisma.Booking.findMany({ where: { userId } });

		return bookings;
	});
};

export const addNewBookingServices = (userId, eventId) => {
	return handlePrismaQuery(async () => {
		if (!userId) {
			throw new AppError(
				"Missing user id",
				400,
				"The request is missing user id",
				true,
			);
		}

		if (!eventId) {
			throw new AppError(
				"Missing event id",
				400,
				"The request is missing event id",
				true,
			);
		}

		const user = await prisma.User.findUnique({ where: { id: userId } });

		if (!user) {
			throw new AppError(
				`No user found with ID: ${userId}`,
				400,
				"Make sure that user ID is correct",
				true,
			);
		}

		const event = await prisma.Event.findUnique({ where: { id: eventId } });

		if (!event) {
			throw new AppError(
				`No event found with ID: ${eventId}`,
				400,
				"Make sure that event ID is correct",
				true,
			);
		}

		const newBooking = await prisma.Booking.create({
			data: {
				userId,
				eventId,
			},
		});

		return newBooking;
	});
};

export const deleteBookingService = (userId, eventId) => {
	return handlePrismaQuery(async () => {
		if (!userId) {
			throw new AppError(
				"Missing user id",
				400,
				"The request is missing user id",
				true,
			);
		}

		if (!eventId) {
			throw new AppError(
				"Missing event id",
				400,
				"The request is missing event id",
				true,
			);
		}

		const user = await prisma.User.findUnique({ where: { id: userId } });

		if (!user) {
			throw new AppError(
				`No user found with ID: ${userId}`,
				400,
				"Make sure that user ID is correct",
				true,
			);
		}

		const event = await prisma.Event.findUnique({ where: { id: eventId } });

		if (!event) {
			throw new AppError(
				`No event found with ID: ${eventId}`,
				400,
				"Make sure that event ID is correct",
				true,
			);
		}

		const deletedBooking = await prisma.Booking.deleteMany({
			where: {
				userId,
				eventId,
			},
		});

		if (deletedBooking.count === 0) {
			throw new AppError(
				`No booking found for user ID ${userId} and event ID ${eventId}`,
				404,
				"Booking does not exist or was already deleted",
				true,
			);
		}

		return true;
	});
};
