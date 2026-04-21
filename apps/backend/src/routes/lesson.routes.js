import express from "express";
import { lessonController } from "../controllers/lesson.controller.js";

const router = express.Router();

router.get("/", lessonController);

export default router;