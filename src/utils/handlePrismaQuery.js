import { Prisma } from "@prisma/client";
import AppError from "./AppError.js";
import logger from "./logger.js";

export const handlePrismaQuery = async (queryFn) => {
	try {
		return await queryFn();
	} catch (error) {
		logger.error("Prisma Error:", error);

		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			switch (error.code) {
				case "P2002":
					throw new AppError("Duplicate key error.", 409);
				case "P2000":
					throw new AppError("Input value too long.", 400);
				case "P2004":
					throw new AppError("Constraint violation.", 400);
				case "P2025":
					throw new AppError("Record not found.", 404);
				default:
					throw new AppError(`Database error: ${error.message}`, 500);
			}
		}

		if (error instanceof Prisma.PrismaClientInitializationError) {
			throw new AppError("Failed to connect to the database.", 500);
		}

		if (error instanceof Prisma.PrismaClientRustPanicError) {
			throw new AppError("Database engine crashed.", 500);
		}

		throw new AppError(`An unexpected error occurred: ${error.message}.`, 500);
	}
};
