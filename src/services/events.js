import { PrismaClient } from "@prisma/client";
import { handlePrismaQuery } from "../utils/handlePrismaQuery.js";
import logger from "../utils/logger.js";
import AppError from "../utils/AppError.js";

const prisma = new PrismaClient();

export const getAllEventsServices = async () => {
	return await handlePrismaQuery(() => prisma.Event.findMany());
};

export const getEventByIdServices = (id) => {
	// eslint-disable-next-line require-await
	return handlePrismaQuery(async () => {
		if (!id) {
			throw new AppError(
				"Event id is missing!",
				400,
				"Please provide a valid event ID in the request.",
				true,
			);
		}

		const event = prisma.Event.findUnique({ where: { id } });

		if (!event) {
			throw new AppError(
				`No event found with ID: ${id}`,
				404,
				"The event you're trying to retrieve does not exist.",
				true,
			);
		}

		return event;
	});
};

export const addNewEventServices = (data) => {
	return handlePrismaQuery(async () => {
		// Get user
		// check user privilege, if is not admin throw error

		if (!data || typeof data !== "object") {
			throw new AppError(
				"Missing event data",
				400,
				"The request is missing required event data. Please ensure all necessary fields are provided.",
				true,
			);
		}

		const newEvent = await prisma.Event.create({
			data: {
				title: data.title,
				description: data.description,
				category: data.category,
				date: data.date,
				venue: data.venue,
				price: data.price,
				imageUrl: data.imageUrl,
				createdById: data.user.id,
			},
		});

		logger.info("Event created successfully in the database");
		return newEvent;
	});
};

export const updateEventByIdServices = (id, data) => {
	return handlePrismaQuery(async () => {
		if (!id) {
			throw new AppError(
				"Event id is missing!",
				400,
				"Please provide a valid event ID in the request.",
				true,
			);
		}

		if (!data || typeof data !== "object") {
			throw new AppError(
				"Missing event data",
				400,
				"The request is missing required event data. Please ensure all necessary fields are provided.",
				true,
			);
		}

		const existingEvent = await prisma.Event.findUnique({ where: { id } });
		if (!existingEvent) {
			throw new AppError(
				`No event found with ID: ${id}`,
				404,
				"The event you're trying to update does not exist.",
				true,
			);
		}

		const updatedEvent = await prisma.Event.update({
			where: { id },
			data,
		});

		return updatedEvent;
	});
};

export const deleteEventByIdServices = (id) => {
	handlePrismaQuery(async () => {
		if (!id || typeof id !== "string" || id.trim() === "") {
			throw new AppError(
				"Event id is missing!",
				400,
				"Please provide a valid event ID in the request.",
				true,
			);
		}

		const event = await prisma.Event.findUnique({ where: { id } });

		if (!event) {
			throw new AppError(
				`No event found with ID: ${id}`,
				404,
				"The event you're trying to update does not exist.",
				true,
			);
		}

		const deletedEvent = await prisma.Event.delete({
			where: { id },
			include: { Bookings: true },
		});

		return deletedEvent;
	});
};
