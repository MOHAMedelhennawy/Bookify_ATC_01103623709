import { getAllCategoriesService } from "../services/category.js";

// eslint-disable-next-line no-unused-vars, prettier/prettier
let categoriesObject = null;

export const getQueryObject = async (req) => {
	const page = req.query.page ? parseInt(req.query.page) - 1 : 0;
	const limit = parseInt(req.query.limit) || 5;
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
	} else if (categoriesIDs.length === 0) {
		const categoriesName = req.query.category.split(","); // category=Tech,Helth => category = ["Tech", "Health"]

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
	let categoriesObject = {};
	const categories = await getAllCategoriesService();

	categories.map((category) => {
		categoriesObject[category.name] = category.id;
	});

	return categoriesObject;
};
