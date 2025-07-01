import path from "path";
import multer from "multer";

const __dirname = import.meta.dirname;

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, "../../public/images/events"));
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		const extension = path.extname(file.originalname);
		cb(null, file.fieldname + "-" + uniqueSuffix + extension);
	},
});

const upload = multer({ storage: storage });

export default upload;
