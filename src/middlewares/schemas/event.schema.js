export const eventSchemaPost = {
	type: "object",
	properties: {
		title: {
			type: "string",
			minLength: 2,
			maxLength: 50,
			errorMessage: {
				type: "Title must be a string.",
				minLength: "Title must be at least 2 characters long.",
				maxLength: "Title must not exceed 50 characters.",
			},
		},
		date: {
			type: "string",
			errorMessage: {
				type: "Date must be a string.",
			},
		},
		address: {
			type: "string",
			minLength: 2,
			maxLength: 50,
			errorMessage: {
				type: "Address must be a string.",
				minLength: "Address must be at least 2 characters.",
				maxLength: "Address must not exceed 50 characters.",
			},
		},
		location: {
			type: "string",
			minLength: 2,
			maxLength: 50,
			errorMessage: {
				type: "Location must be a string.",
				minLength: "Location must be at least 2 characters.",
				maxLength: "Location must not exceed 50 characters.",
			},
		},
		categoryId: {
			type: "string",
			format: "uuid",
			errorMessage: {
				type: "Category ID must be a string.",
				format: "Category is required",
			},
		},
		description: {
			type: "string",
			minLength: 10,
			maxLength: 2000,
			errorMessage: {
				type: "Description must be a string.",
				minLength: "Description must be at least 10 characters.",
				maxLength: "Description must not exceed 2000 characters.",
			},
		},
		venue: {
			type: "string",
			minLength: 2,
			maxLength: 50,
			errorMessage: {
				type: "Venue must be a string.",
				minLength: "Venue must be at least 2 characters.",
				maxLength: "Venue must not exceed 50 characters.",
			},
		},
		price: {
			type: "number",
			errorMessage: {
				type: "Price must be a number.",
			},
		},
		imageUrl: {
			type: "string",
			errorMessage: {
				type: "Image URL must be a string.",
			},
		},
	},
	required: [
		"title",
		"date",
		"address",
		"location",
		"categoryId",
		"description",
		"venue",
		"price",
		"imageUrl",
	],
	additionalProperties: false,
	errorMessage: {
		required: {
			title: "Title is required.",
			date: "Date is required.",
			address: "Address is required",
			location: "Location is required",
			categoryId: "Category is required.",
			description: "Description is required.",
			venue: "Venue is required.",
			price: "Price is required.",
			imageUrl: "Image is required",
		},
		additionalProperties:
			"You have included an extra field that is not allowed.",
	},
};

export const eventSchemaPut = {
	type: "object",
	properties: {
		title: {
			type: "string",
			minLength: 2,
			maxLength: 50,
			errorMessage: {
				type: "Title must be a string.",
				minLength: "Title must be at least 2 characters.",
				maxLength: "Title must not exceed 50 characters.",
			},
		},
		description: {
			type: "string",
			minLength: 10,
			maxLength: 2000,
			errorMessage: {
				type: "Description must be a string.",
				minLength: "Description must be at least 10 characters.",
				maxLength: "Description must not exceed 2000 characters.",
			},
		},
		date: {
			type: "string",
			format: "date-time",
			errorMessage: {
				type: "Date must be a string.",
				format: "Date must be in a valid date-time format.",
			},
		},
		category: {
			type: "string",
			errorMessage: {
				type: "Category must be a string.",
			},
		},
		venue: {
			type: "string",
			minLength: 2,
			maxLength: 50,
			errorMessage: {
				type: "Venue must be a string.",
				minLength: "Venue must be at least 2 characters.",
				maxLength: "Venue must not exceed 50 characters.",
			},
		},
		price: {
			type: "number",
			priceIsFloat: true,
			errorMessage: {
				type: "Price must be a number.",
			},
		},
		imageUrl: {
			type: "string",
			format: "uri",
			errorMessage: {
				type: "Image URL must be a string.",
				format: "Image URL must be a valid URI.",
			},
		},
		user: {
			type: "object",
			errorMessage: {
				type: "User must be an object.",
			},
		},
	},
	additionalProperties: false,
	errorMessage: {
		additionalProperties:
			"You have included an extra field that is not allowed.",
	},
};
