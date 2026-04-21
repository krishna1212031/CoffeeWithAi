import express from "express";
import cors from "cors";

import aiRoutes from "./routes/ai.routes.js";
import coffeeRoutes from "./routes/coffee.routes.js";
import lessonRoutes from "./routes/lesson.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/ai", aiRoutes);
app.use("/api/coffee", coffeeRoutes);
app.use("/api/lessons", lessonRoutes);

export default app;