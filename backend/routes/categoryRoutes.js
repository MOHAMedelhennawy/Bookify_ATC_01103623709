import express from "express";
import { getAllCategoriesController } from "../controller/categoryController.js";

const router = express.Router();

router.get("/", getAllCategoriesController);

export default router;
