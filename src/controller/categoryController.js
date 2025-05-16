import { getAllCategoriesService } from "../services/category.js";
import catchAsync from "../utils/catchAsync.js";
import logger from "../config/logger.js";

export const getAllCategoriesController = catchAsync(async (req, res) => {
	const categories = await getAllCategoriesService();

	res.status(200).json({
		message: "Categories fetched successfully",
		categories,
	});

	logger.info("Categories fetched successfully");
});
