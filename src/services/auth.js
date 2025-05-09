import { PrismaClient } from "@prisma/client";
import { handlePrismaQuery } from "../utils/handlePrismaQuery.js";
import AppError from "../utils/AppError.js";
import logger from "../utils/logger.js";
import bcrypt from "bcrypt";
import hashPassword from "../utils/hashPassword.js";

const prisma = new PrismaClient();

export const signupUser = (name, email, password) => {
	return handlePrismaQuery(async () => {
		if (!name || !email || !password) {
			throw new AppError(
				"User data is missing",
				400,
				"Make sure that all required data is valid",
				true,
			);
		}

		const cleanName = name.trim();
		const cleanEmail = email.trim().toLowerCase();

		const existingUser = await prisma.user.findUnique({
			where: { email: cleanEmail },
		});

		if (existingUser) {
			throw new AppError(
				"Email already in use",
				409,
				"This email is already registered. Try logging in instead.",
				true,
			);
		}

		// hash password
		const hashedPassword = await hashPassword(password);

		if (typeof hashedPassword !== "string" || !hashedPassword) {
			throw new AppError(
				"Invalid password input",
				400,
				"Password must be a non-empty string",
			);
		}

		const user = await prisma.user.create({
			data: {
				name: cleanName,
				email: cleanEmail,
				password: hashedPassword,
			},
		});

		logger.info("User created successfully on the database");
		return user;
	});
};

export const loginUser = (email, password) => {
	return handlePrismaQuery(async () => {
		if (!email || !password) {
			throw new AppError(
				"Missing credentials",
				400,
				"Email and password are required",
				true,
			);
		}

		const user = await prisma.user.findFirst({
			where: { email: email.trim().toLowerCase() },
		});

		if (!user || !(await bcrypt.compare(password, user.password))) {
			throw new AppError(
				"Invalid credentials",
				401,
				"Make sure that your email and password are correct",
				true,
			);
		}

		return user;
	});
};
