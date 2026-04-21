import express from "express";
import { tutorController } from "../controllers/ai.controller.js";

const router = express.Router();

router.post("/tutor", tutorController);

export default router;