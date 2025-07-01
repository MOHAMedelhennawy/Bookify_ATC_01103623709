import bcrypt from "bcrypt";
import logger from "../config/logger.js";
import AppError from "../utils/AppError.js";
import { PrismaClient } from "@prisma/client";
import redisClient from "../config/redisClient.js";
import hashPassword from "../utils/hashPassword.js";
import { handlePrismaQuery } from "../utils/handlePrismaQuery.js";

const prisma = new PrismaClient();

export const signupUser = (name, email, password) => {
	return handlePrismaQuery(async () => {
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

		if (user)
			await redisClient.set(`user:${user.id}`, JSON.stringify(user), {
				EX: 3600,
			});

		logger.info("User created successfully on the database");
		return user;
	});
};

export const loginUser = (email, password) => {
	return handlePrismaQuery(async () => {
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

		// eslint-disable-next-line prettier/prettier
		await redisClient.set(`user:${user.id}`, JSON.stringify(user), { EX: 3600 });

		return user;
	});
};

export const signupOAuthUser = (name, email) => {
	return handlePrismaQuery(async () => {
		logger.info("signupOAuthUser");
		if (!name || !email) {
			throw new AppError(
				"User data is missing",
				400,
				"OAuth user data is incomplete",
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

		const user = await prisma.user.create({
			data: {
				name: cleanName,
				email: cleanEmail,
				password: " ",
			},
		});

		if (user)
			await redisClient.set(`user:${user.id}`, JSON.stringify(user), {
				EX: 3600,
			});

		logger.info("OAuth user created successfully in the database");
		return user;
	});
};

export const findUserById = (id) => {
	return handlePrismaQuery(async () => {
		logger.info(`Searching in user with ID: ${id}`);

		if (!id) {
			throw new AppError(
				"User id is missing!",
				400,
				"Please provide a valid user ID in the request.",
				true,
			);
		}

		const cachedUser = await redisClient.get(`user:${id}`);
		if (cachedUser) return JSON.parse(cachedUser);

		const user = await prisma.user.findUnique({ where: { id } });
		if (user) {
			await redisClient.set(`user:${id}`, JSON.stringify(user), { EX: 3600 });
		}

		logger.info("User exists");
		return user;
	});
};

export const findUserByEmail = (email) => {
	return handlePrismaQuery(async () => {
		logger.info(`Searching in user with Email: ${email}`);

		if (!email) {
			throw new AppError(
				"User email is missing!",
				400,
				"Please provide a valid user email in the request.",
				true,
			);
		}

		const cleanEmail = email.trim().toLowerCase();

		return await prisma.user.findUnique({ where: { email: cleanEmail } });
	});
};

export const removeUserFromCache = async (id) => {
	try {
		await redisClient.del(`user:${id}`);
	} catch (error) {
		throw new AppError("Unexpected error", 500, error.message, true);
	}
};
