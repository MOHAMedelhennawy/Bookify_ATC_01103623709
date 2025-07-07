import { getAllCategoriesService } from "../services/category.js";
import redisClient from "../config/redisClient.js";

// eslint-disable-next-line no-unused-vars, prettier/prettier
let categoriesObject = null;

export const getQueryObject = async (req) => {
	const page = req.query.page ? parseInt(req.query.page) - 1 : 0;
	const limit = parseInt(req.query.limit) || 27;
	const search = req.query.search || "";
	let sort = req.query.sort;
	let category = req.query.category || "All";

	if (!categoriesObject) {
		categoriesObject = await getCategoryMap();
	}

	// eslint-disable-next-line prettier/prettier
	let categoriesIDs = [];

	if (!category || category === "All") {
		categoriesIDs = Object.values(categoriesObject);
	} else {
		// Handle single category or comma-separated categories
		const categoriesName = category.split(","); // category=Tech,Health => category = ["Tech", "Health"]

		categoriesIDs = categoriesName
			.map((name) => categoriesObject[name])
			.filter(Boolean); // remove undefined values
	}

	sort = sort ? sort.split(",") : []; // sort=price,desc => sort = ["price", "desc"]

	let sortBy = {};
	if (sort[0]) {
		sortBy[sort[0]] = sort[1] || "asc";
	}

	return {
		skip: page * limit,
		take: limit,
		where: {
			title: {
				contains: search,
				mode: "insensitive",
			},
			categoryId: {
				in: categoriesIDs,
			},
		},
		orderBy: sortBy,
	};
};

const getCategoryMap = async () => {
	const cachedCategories = await redisClient.get("categories");
	if (cachedCategories) {
		return JSON.parse(cachedCategories);
	} else {
		let categoriesObject = {};
		const categories = await getAllCategoriesService();

		categories.forEach((category) => {
			categoriesObject[category.name] = category.id;
		});
		await redisClient.set("categories", JSON.stringify(categoriesObject), {
			EX: 3600, // 1 hour
		});
		return categoriesObject;
	}
};
