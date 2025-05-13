export const getQueryObject = (req) => {
	const categories = ["Tech", "Music", "Health", "Education", "Sports"];
	const page = req.query.page ? parseInt(req.query.page) - 1 : 0;
	const limit = parseInt(req.query.limit) || 5;
	const search = req.query.search || "";
	let sort = req.query.sort;
	let category = req.query.category || "All";

	category = category === "All" ? categories : req.query.category;
	if (!Array.isArray(category)) {
		category = category.split(",");
	}

	sort = sort ? sort.split(",") : [];
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
			category: {
				is: {
					name: {
						in: category,
					},
				},
			},
		},
		orderBy: sortBy,
	};
};
