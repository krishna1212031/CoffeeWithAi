import express from "express";
import { recipeController } from "../controllers/coffee.controller.js";

const router = express.Router();

router.post("/recipe", recipeController);

export default router;