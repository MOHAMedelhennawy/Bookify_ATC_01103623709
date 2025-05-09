export const eventSchemaPost = {
	type: "object",
	properties: {
		title: {
			type: "string",
			minLength: 2,
			maxLength: 50,
		},
		description: {
			type: "string",
			minLength: 10,
			maxLength: 2000,
		},
		date: {
			type: "string",
			format: "date-time",
		},
		category: {
			type: "string",
		},
		venue: {
			type: "string",
			minLength: 2,
			maxLength: 50,
		},
		price: {
			type: "number",
			priceIsFloat: true,
		},
		imageUrl: {
			type: "string",
			format: "uri",
		},
		user: {
			type: "object",
		},
	},
	required: [
		"title",
		"description",
		"category",
		"date",
		"venue",
		"price",
		"imageUrl",
		"user",
	],
	additionalProperties: false,
};

export const eventSchemaPut = {
	type: "object",
	properties: {
		title: {
			type: "string",
			minLength: 2,
			maxLength: 50,
		},
		description: {
			type: "string",
			minLength: 10,
			maxLength: 2000,
		},
		date: {
			type: "string",
			format: "date-time",
		},
		category: {
			type: "string",
		},
		venue: {
			type: "string",
			minLength: 2,
			maxLength: 50,
		},
		price: {
			type: "number",
			priceIsFloat: true,
		},
		imageUrl: {
			type: "string",
			format: "uri",
		},
		user: {
			type: "object",
		},
	},

	additionalProperties: false,
};
