import { PORT } from "./src/config/env.js";
import connectDB from "./src/config/db.js";
import app from "./src/app.js";

const skipDb =
  process.env.SKIP_DB === "true" || process.env.SKIP_DB === "1";

const start = async () => {
  if (process.env.NODE_ENV === "production" && skipDb) {
    console.error("SKIP_DB cannot be enabled in production.");
    process.exit(1);
  }
  if (skipDb) {
    console.warn(
      "SKIP_DB is set: starting without MongoDB (Atlas IP / URI issues will not block the server)."
    );
  } else {
    await connectDB();
  }
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
