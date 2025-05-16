import { PrismaClient } from "@prisma/client";
import redisClient from "../config/redisClient.js";
import { handlePrismaQuery } from "../utils/handlePrismaQuery.js";

const prisma = new PrismaClient();

export const getAllCategoriesService = () => {
	return handlePrismaQuery(async () => {
		const cachedCategories = await redisClient.get("categories");
		if (cachedCategories) return JSON.parse(cachedCategories);

		const categories = await prisma.category.findMany();
		await redisClient.set("categories", JSON.stringify(categories), {
			EX: 3600,
		});

		return categories;
	});
};
