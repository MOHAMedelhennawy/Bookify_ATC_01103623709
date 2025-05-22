import AppError from "../utils/AppError.js";

export const prepareBodyTypesMiddleware = (req, res, next) => {
	if (req?.body?.price) {
		req.body.price = parseFloat(parseFloat(req.body.price).toFixed(2));
	}

	if (req.method === "POST" && !req?.file) {
		throw new AppError(
			"Event image is missing.",
			400,
			"Event image file is required "
		);
	}
	
	if (req?.file?.filename){
		req.body.imageUrl = req.file.filename;
	}

	next();
};
