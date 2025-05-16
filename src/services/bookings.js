import { findUserById } from "./auth.js";
import AppError from "../utils/AppError.js";
import { PrismaClient } from "@prisma/client";
import redisClient from "../config/redisClient.js";
import { handlePrismaQuery } from "../utils/handlePrismaQuery.js";

const prisma = new PrismaClient();
const redisKey = (userId) => `user:${userId}:bookings`;

export const checkExistBooking = (userId, eventId) => {
	return handlePrismaQuery(async () => {
		const booking = await prisma.booking.findUnique({
			where: {
				userId_eventId: {
					userId,
					eventId,
				},
			},
		});

		return booking;
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

		const cachedBookings = await redisClient.get(redisKey(userId));
		if (cachedBookings) return JSON.parse(cachedBookings);

		const bookings = await prisma.Booking.findMany({
			where: { userId },
			select: {
				eventId: true,
			},
		});

		await redisClient.set(redisKey(userId), JSON.stringify(bookings), {
			EX: 3600,
		});

		return bookings;
	});
};

export const addNewBookingServices = (userId, eventId) => {
	return handlePrismaQuery(async () => {
		if (!userId || !eventId) {
			throw new AppError(
				"Missing user or event id",
				400,
				"The request is missing necessary data",
				true,
			);
		}

		const user = await findUserById(userId);
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

		await redisClient.del(redisKey(userId));

		return newBooking;
	});
};

export const deleteBookingService = (userId, eventId) => {
	return handlePrismaQuery(async () => {
		// check if user ID and event ID is passed
		if (!userId || !eventId) {
			throw new AppError(
				"Missing user or event id",
				400,
				"The request is missing necessary data",
				true,
			);
		}

		// Check if user exists
		const user = await findUserById(userId);
		if (!user) {
			throw new AppError(
				`No user found with ID: ${userId}`,
				400,
				"Make sure that user ID is correct",
				true,
			);
		}

		// Check if event exists
		const event = await prisma.Event.findUnique({ where: { id: eventId } });
		if (!event) {
			throw new AppError(
				`No event found with ID: ${eventId}`,
				400,
				"Make sure that event ID is correct",
				true,
			);
		}

		// Delete booking
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

		await redisClient.del(redisKey(userId));

		return true;
	});
};
