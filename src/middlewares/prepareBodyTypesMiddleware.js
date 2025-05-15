export const prepareBodyTypesMiddleware = (req, res, next) => {
	if (req.body.price) {
		req.body.price = parseFloat(req.body.price).toFixed(2);
	}

	req.body.price = parseFloat(req.body.price);
	next();
};
