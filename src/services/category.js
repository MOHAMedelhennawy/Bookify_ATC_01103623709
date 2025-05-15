import { PrismaClient } from "@prisma/client";
import { handlePrismaQuery } from "../utils/handlePrismaQuery.js";

const prisma = new PrismaClient();

export const getAllCategoriesService = () => {
	return handlePrismaQuery(async () => {
		return await prisma.category.findMany();
	});
};
