export const signupSchema = {
	type: "object",
	properties: {
		name: {
			type: "string",
			minLength: 2,
			maxLength: 50,
			errorMessage: {
				minLength: "Name must be at least 2 characters long.",
				maxLength: "Name must not exceed 50 characters.",
				type: "Name must be a string.",
			},
		},
		email: {
			type: "string",
			format: "email",
			minLength: 10,
			maxLength: 100,
			errorMessage: {
				format: "Email must be a valid email address.",
				minLength: "Email must be at least 10 characters long.",
				maxLength: "Email must not exceed 100 characters.",
				type: "Email must be a string.",
			},
		},
		password: {
			type: "string",
			minLength: 10,
			maxLength: 50,
			// pattern: "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{10,50}$",
			errorMessage: {
				pattern:
					"Password must contain at least one number and one special character (!@#$%^&*).",
				minLength: "Password must be at least 10 characters long.",
				maxLength: "Password must not exceed 50 characters.",
				type: "Password must be a string.",
			},
		},
	},

	required: ["name", "email", "password"],
	additionalProperties: false,
	errorMessage: {
		required: {
			name: "Name is required.",
			email: "Email is required.",
			password: "Password is required.",
		},
		additionalProperties: "Extra fields are not allowed.",
	},
};

export const loginSchema = {
	type: "object",
	properties: {
		email: {
			type: "string",
			format: "email",
		},
		password: {
			type: "string",
		},
	},

	required: ["email", "password"],
	additionalProperties: false,
};
