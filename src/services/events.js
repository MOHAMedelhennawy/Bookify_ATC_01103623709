import { PrismaClient } from "@prisma/client";
import { handlePrismaQuery } from "../utils/handlePrismaQuery.js";
import logger from "../utils/logger.js";
import AppError from "../utils/AppError.js";

const prisma = new PrismaClient();

export const getAllEventsServices = async (queryObject) => {
	return await handlePrismaQuery(async () => {
		const count = await prisma.event.count({
			skip: queryObject.skip,
			take: queryObject.take,
			where: queryObject.where,
			orderBy: queryObject.orderBy,
		});

		const events = await prisma.Event.findMany({
			skip: queryObject.skip,
			take: queryObject.take,
			where: queryObject.where,
			include: {
				category: {
					select: {
						name: true,
					},
				},
			},
			orderBy: queryObject.orderBy,
		});

		return { events, count };
	});
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
		if (!data || typeof data !== "object") {
			throw new AppError(
				"Missing event data",
				400,
				"The request is missing required event data. Please ensure all necessary fields are provided.",
				true,
			);
		}

		const newEvent = await prisma.event.create({
			data: {
				title: data.title,
				description: data.description,
				categoryId: data.categoryId,
				date: data.date,
				venue: data.venue,
				price: data.price,
				imageUrl: data.imageUrl,
				address: data.address,
				location: data.location,
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
	return handlePrismaQuery(async () => {
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
				"The event you're trying to delete does not exist.",
				true,
			);
		}

		const deletedEvent = await prisma.Event.delete({
			where: { id },
		});

		return deletedEvent;
	});
};
